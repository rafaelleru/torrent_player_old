//author: rafaelleru
const electron = require('electron')
const shortcut = require('electron-localshortcut');
var ipc = require('electron').ipcMain;
var isPaused = true;
const fs = require('fs');

// Module to control application life.
const app = electron.app
    // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

//Para establecer teclas que funcionen en la app. PE: play/pause con espacio.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: `${__dirname}/icon.ico`
    })

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/../index.html`)



    // Open the DevTools.
    //jmainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    //Registramos los eventos justo al cargar la aplicacion

    shortcut.register('Space', function(){
	mainWindow.send('PlayPause', isPaused);
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow, function(){
    const ret = globalShortcut.register('Space', () => {
	console.log('CommandOrControl+X is pressed');
    })
})

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const Downloader = require("./downloader.js");
const notifier = require('node-notifier');
const os = require('os');

var downloaderInstance = new Downloader();
var currentPlayingTorrent;
var currentPlayingFile = 0;
var random = false;
//Mover esto a otro archivo.
ipc.on('addTorrent', (event, data) => {

    data.forEach( function(file){
	downloaderInstance.addTorrent(file, function(){
	    event.sender.send('updatePlayList', [ downloaderInstance.getLastFiles(), downloaderInstance.getNumberOfTorrents(), downloaderInstance.getProgress() ]);
	})
    });
});

ipc.on('addMagnet', (event, data) => {
    downloaderInstance.addTorrent(data, function(){
	event.sender.send('updatePlayList', [ downloaderInstance.getLastFiles(), downloaderInstance.getNumberOfTorrents(), downloaderInstance.getProgress() ]);
    })
});

ipc.on('getPlayData', (event, data) => {
    var torr = data[1];
    var file = data[0];

    var nFiles = downloaderInstance.getTorrent(torr).files.length;
    var nTorr = downloaderInstance.getNTorrents();

    console.log(data[1]);

    //cada vez que se hace click en una cancion se reproduc
    isPaused = false;
    if(nFiles >= data[0] && !(downloaderInstance.getTorrentFiles(data[1])[data[0]].name.indexOf('mp3') == -1)){
	//Si el siguiente archivo pertenece al mismo torrent simplemente reproducirlo
	console.log('file number: ' + data[0].toString());
	if(currentPlayingTorrent != data[1]){
	    if(currentPlayingTorrent != undefined)
		downloaderInstance.closeTorrentServer();

	    currentPlayingTorrent = data[1];
	    downloaderInstance.initTorrentServer(data[1]);
	}

	// Object
	notifier.notify({
	    'title': downloaderInstance.getTorrentFiles(data[1])[data[0]].name,
	    'message': 'torrentPlayer'
	});
	event.sender.send('toPlay', [data[0], data[1], downloaderInstance.getTorrentFiles(data[1])[data[0]].name]);
    } else {
	if(nTorr >= data[1] + 1){
	    console.log('Si existe el siguiente torrent empezamos a reproducirlo.');
	    currentPlayingTorrent = data[1]+1;
	    downloaderInstance.closeTorrentServer();
	    downloaderInstance.initTorrentServer(currentPlayingTorrent);

	    notifier.notify({
		'title': downloaderInstance.getTorrentFiles(data[1])[data[0]].name,
		'message': 'torrentPlayer'
	    });

	    event.sender.send('toPlay', [0, currentPlayingTorrent, downloaderInstance.getTorrentFiles(data[1]+1)[0].name]);
	} else {
	    //En otro caso comenzams a reproducir el primer torrent que el usuario añadio.
	    curretPlayingTorrent = 0;
	    downloaderInstance.closeTorrentServer();
	    downloaderInstance.initTorrentServer(0);

	    notifier.notify({
		'title': downloaderInstance.getTorrentFiles(data[1])[data[0]].name,
		'message': 'torrentPlayer'
	    });
	    event.sender.send('toPlay', [0, 0, downloaderInstance.getTorrentFiles(0)[0].name]);
	}

    }
})

ipc.on('nextRandom', (event, data) => {

    do{
	console.log("Random mode");
	var randNumMin = 0;
	var randNumMax = downloaderInstance.getNTorrents() - 1;
	var randTorr = (Math.floor(Math.random() * randNumMax))
	console.log(randTorr);
	var randNumMinSong = 0;
	var randNumMaxSong = downloaderInstance.getTorrentFiles(randTorr).length;
	var randSong = (Math.floor(Math.random() * randNumMaxSong))
    }while(downloaderInstance.getTorrentFiles(data[1])[data[0]].name.indexOf('mp3') == -1);
    
    console.log(randSong);
    currentPlayingTorrent = randTorr;
    currentPlayingFile = randSong;
    event.sender.send('toPlay', [randSong, randTorr, downloaderInstance.getTorrentFiles(randTorr)[randSong].name]);
})
// TODO: Barra de progreso de descarga


ipc.on('playEnded', (event, data) => {
    //Aqui compruebo si es la ultima cancion para saltar al siguiente torrent
    // y si es el ultimo torrent vuelvo al primero

    currentPlayingFile = data+1;
    console.log('salto a la siguiente cancion' + currentPlayingFile.toString());
    console.log('reproduzco la siguiente cancion');
})

ipc.on('SaveData', (event, data) => {
    var downloaderPath = "/tmp/webtorrent";
    var savePath = os.homedir()+"/torrentPlayer"

    fs.readdir(downloaderPath, (err, files) => {
	files.forEach(function(file){
	    console.log("save: " + file + "to: " + savePath+ '/'+file);
	    fs.copy(downloaderPath+'/'+file, savePath+ '/'+file);
	})
    })
})
	      

ipc.on('updateProgress', (event, data) => {
    //almacenamos en un array un par de hash + progreso
})

ipc.on('addSong', (event, data) => {
    //event.sender.send('magnet', [downloaderInstance.getTorrentMagnet(data[0]),data[1]]);
    fs.appendFile("/home/rafa/test.txt", downloaderInstance.getTorrentMagnet(data[0]) + " " + data[1] + "\n", 'utf8', function(err) {
	if(err) {
            return console.log("Error saving song: " +err);
	}

	console.log("The file was saved!");
    });
});

ipc.on("loadPlaylist", (event, data) => {
    fs.readFile('/home/rafa/test.txt', 'utf8', (err, data) => {
	console.log(typeof(data));
	links = data.split('\n');
	for(var i=0; i < links.length; ++i){
	    console.log("*************************")
	    console.log(links[i]);
	}

	//array que contiene los archivos que conforman la lista de reproduccion
	songs_of_playlist = []; 
	links.forEach( function(parm){
	    tupla = parm.split(" ");

	    if(downloaderInstance.torrentExist(tupla[0])){
		songs_of_playlist.add([downloaderInstance.indexOfMagnet(tupla[0]),
				       tupla[1]])
	    }else{
		downloaderInstance.addMagnet(tupla[0]);
		//el nuevo magnet va al final 
		songs_of_playlist.add([downloaderInstance.getNTorrents() - 1,
				       tupla[1]])}
	})
   });
});

ipc.on('randomMode', (event, data) => {
    random = !random;
})

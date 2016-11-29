//author: rafaelleru
const electron = require('electron')
const shortcut = require('electron-localshortcut');
var ipc = require('electron').ipcMain;


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

var downloaderInstance = new Downloader();
var currentPlayingTorrent;
var currentPlayingFile = 0;

//Mover esto a otro archivo.
ipc.on('addTorrent', function(event, data){

    data.forEach( function(file){
	downloaderInstance.addTorrent(file, function(){
	    event.sender.send('updatePlayList', [ downloaderInstance.getLastFiles(), downloaderInstance.getNumberOfTorrents(), downloaderInstance.getProgress() ]);
	})
    });
});

ipc.on('getPlayData', function(event, data){
    var torr = data[1];
    var file = data[0];

    var nFiles = downloaderInstance.getTorrent(torr).files.length;
    var nTorr = downloaderInstance.getNTorrents();

    nFiles = nFiles;
    nTorr = nTorr;
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

	event.sender.send('toPlay', [data[0], data[1]]);
    } else {
	if(nTorr >= data[1] + 1){
	    console.log('Si existe el siguiente torrent empezamos a reproducirlo.');
	    currentPlayingTorrent = data[1];
	    downloaderInstance.closeTorrentServer();
	    downloaderInstance.initTorrentServer(data[1] + 1);

	    event.sender.send('toPlay', [0, data[1] + 1]);
	} else {
	    //En otro caso comenzams a reproducir el primer torrent que el usuario añadio.
	    curretPlayingTorrent = 0;
	    downloaderInstance.closeTorrentServer();
	    downloaderInstance.initTorrentServer(0);

	    event.sender.send('toPlay', [0, 0]);
	}
    }
})

// TODO: Barra de progreso de descarga


ipc.on('playEnded', (event, data) => {
    //Aqui compruebo si es la ultima cancion para saltar al siguiente torrent
    // y si es el ultimo torrent vuelvo al primero

    currentPlayingFile = data+1;
    console.log('salto a la siguiente cancion' + currentPlayingFile.toString());

    console.log('reproduzco la siguiente cancion');


})

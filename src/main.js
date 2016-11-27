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
    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    //Registramos los eventos justo al cargar la aplicacion

    shortcut.register('Space', function(){
	mainWindow.send('PlayPause', []);
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
var currentPlayingTorrent ;
var currentPlayingFile = 0;

//Mover esto a otro archivo.
ipc.on('addTorrent', function(event, data){

    data.forEach( function(file){
	downloaderInstance.addTorrent(file, function(){
	    event.sender.send('updatePlayList', [ downloaderInstance.getLastFiles(), downloaderInstance.getNumberOfTorrents(), downloaderInstance.getProgress() ]);
	})
    });
});

ipc.on('getPlayData', function(event, data) {
    var torrent = data[1];
    var file = data[0];

    if(file <= downloaderInstance.getTorrentFiles(torrent).length){
	var i = file;
	while(downloaderInstance.getTorrentFiles(torrent)[i].name.indexOf('mp3') == -1 &&
	     file <= downloaderInstance.getTorrentFiles(torrent).length){
	    file++;
	}
    }

    if(file >= downloaderInstance.getTorrentFiles(torrent).length){
	torrent++;
	file = 0;
	while(downloaderInstance.getTorrentFiles(torrent)[file].name.indexOf('mp3') == -1 &&
	     file <= downloaderInstance.getTorrentFiles(torrent).length){
	    file++;
	}
    }

    if(torrent > downloaderInstance.getNTorrents()){
	file = 0;
	torrent = 0;
    }

    if(torrent != currentPlayingTorrent){
	currentPlayingTorrent = torrent;
	if(currentPlayingTorrent != undefined)
	    downloaderInstance.closeTorrentServer();

	downloaderInstance.initTorrentServer(currentPlayingTorrent);
    }

    console.log('toplay ' + file.toString() + '(' + downloaderInstance.getTorrentFiles(torrent)[file].name + ')' + ' from ' + torrent.toString());
    event.sender.send('toPlay', [file, torrent]);
})

// TODO: Barra de progreso de descarga


ipc.on('playEnded', (event, data) => {
    //Aqui compruebo si es la ultima cancion para saltar al siguiente torrent
    // y si es el ultimo torrent vuelvo al primero

    currentPlayingFile = data+1;
    console.log('salto a la siguiente cancion' + currentPlayingFile.toString());
   
    console.log('reproduzco la siguiente cancion');

    
})

// TODO: Eliminar cosas inecesarias
const ipc = require('electron').ipcRenderer;
var webtorrent = require('webtorrent');
var Updater = require('./mainWindowUpdater.js');
var updater = new Updater();





ipc.on('updatePlayList', (event, data) => {
    updater.reloadList(data[0], data[1]);
});

ipc.on('toPlay', (event, data) => {

    var buf = [];
    var length = parseInt(data[1]);
    var stream_data = new Buffer(parseInt(data[1]));

    
    console.log(data.toString());
    
    var audio_tag = document.getElementById('audio');
    audio_tag.src = 'http://localhost:9999/' + data.toString();
})



ipc.on('updateProgress', (event, data) => { 
    progressBar = document.getElementById('progress-bar');
    progressBar.style.width = data+'%';
    console.log(data);
    audio = document.getElementById('audio');
    audio.style.display = 'block';
})

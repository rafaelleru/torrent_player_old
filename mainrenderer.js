const ipc = require('electron').ipcRenderer;
var webtorrent = require('webtorrent');
var Updater = require('./mainWindowUpdater.js');
var updater = new Updater();

ipc.on('updatePlayList', (event, data) => {
    updater.reloadList(data[0], data[1]);

    progressBar = document.getElementById('progress-bar');
    progressBar.style.width = data[2][0]+"%";
    console.log(data[2][0]);
    audio = document.getElementById('audio');
    audio.style.display = 'block';
});

ipc.on('toPlay', (event, data) => {
    body = document.getElementById('body');
    audio = document.getElementById('audio');
    console.log(data[0]);
    audio.src = '/tmp/webtorrent/' + data[0] + '/' + data[1];
    //body.appendChild(audio);
    audio.load();
    audio.play();
})

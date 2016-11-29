
const ipc = require('electron').ipcRenderer;
var webtorrent = require('webtorrent');
var Updater = require('./src/mainWindowUpdater.js');
var updater = new Updater();
var audio_tag = document.getElementById('audio');
var currentPlay;
var currentTorrent = 0;
var play = false;

ipc.on('updatePlayList', (event, data) => {
    updater.reloadList(data[0], data[1]);
});

ipc.on('toPlay', (event, data) => {

    currentTorrent = data[1];

    //console.log('current Torrent in play: ' + currentTorrent.toString());
    audio_tag.src = 'http://localhost:9999/' + data[0].toString();
    audio_tag.title=data[0].toString();
    play = true;
    audio_tag.play();


    audio_tag.onended = function(){
	console.log('play end, to play ' + data[0].toString() + 'from torrent number: ' + data[1].toString());
	ipc.send('getPlayData', [data[0]+1, currentTorrent]);
    }

})



ipc.on('updateProgress', (event, data) => {
    progressBar = document.getElementById('progress-bar');
    progressBar.style.width = data+'%';
    console.log(data);
    audio = document.getElementById('audio');
    audio.style.display = 'block';
})

ipc.on('PlayPause', (event, data) => {
    var audio = document.getElementById('audio');

    if(!play){
	play = true;
	audio.play();
    } else {
	play = false;
	audio.pause();
    }
})

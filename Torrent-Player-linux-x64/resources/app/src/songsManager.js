const ipc = require('electron').ipcRenderer;
var webtorrent = require('webtorrent');
var Updater = require('./src/mainWindowUpdater.js');
var updater = new Updater();
var audio_tag = document.getElementById('audio');
var currentPlay;
var currentTorrent = 0;
var play = false;
var random = false;
var randomPlayButton = document.getElementById('random_play');

randomPlayButton.onclick = function() {
    random = !random;
    console.log("random mode");
}

ipc.on('updatePlayList', (event, data) => {
    updater.reloadList(data[0], data[1]);
});

ipc.on('toPlay', (event, data) => {

    currentTorrent = data[1];

    //console.log('current Torrent in play: ' + currentTorrent.toString());
    audio_tag.src = 'http://localhost:9999/' + data[0].toString();
    audio_tag.title = data[2].toString();

    audio_tag._onEnd = function() {


        console.log('play end, to play ' + data[0].toString() + 'from torrent number: ' + data[1].toString());
        if (!random) {
            ipc.send('getPlayData', [data[0] + 1, currentTorrent]);
        } else {
            console.log('siguiente en modo aleatorio');
            ipc.send('nextRandom', []);
        }
    }

})



ipc.on('updateProgress', (event, data) => {
    progressBar = document.getElementById('progress-bar');
    progressBar.style.width = data + '%';
    console.log(data);
    var audio = document.getElementById('audio');
    audio.style.display = 'block';
})

ipc.on('PlayPause', (event, data) => {
    if (!play) {
        play = true;
        audio_tag.playPause();
    } else {
        play = false;
        audio_tag.playPause();
    }
})

const ipc = require('electron').ipcRenderer;
var webtorrent = require('webtorrent');
var Updater = require('./mainWindowUpdater.js');
var updater = new Updater();
var render = require('render-media')
var Readable = require('stream').Readable;
var stream_data = new Readable();

ipc.on('updatePlayList', (event, data) => {
    updater.reloadList(data[0], data[1]);
});

ipc.on('addData', (event, data) => {
    stream_data.push(data, 'utf8');
})

ipc.on('toPlay', (event, data) => {
    console.log('toPlay: ' + data[0]);
    var file = {
	name: data[0],
	createReadStream: function(){
	    return stream_data;
	}
    }
    
    render.append(file, 'body', function(err, elem){
	if(err)
	    return console.log('error appending file');

	return console.log(elem);
    });
})



ipc.on('updateProgress', (event, data) => { 
    progressBar = document.getElementById('progress-bar');
    progressBar.style.width = data+"%";
    console.log(data);
    audio = document.getElementById('audio');
    audio.style.display = 'block';
})

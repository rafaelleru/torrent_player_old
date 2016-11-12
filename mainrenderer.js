// TODO: Eliminar cosas inecesarias
const ipc = require('electron').ipcRenderer;
var webtorrent = require('webtorrent');
var Updater = require('./mainWindowUpdater.js');
var updater = new Updater();
var render = require('render-media')
var from = require('from2');
var Readable = require('stream').Readable;
var stream_data;

ipc.on('updatePlayList', (event, data) => {
    updater.reloadList(data[0], data[1]);
});

ipc.on('toPlay', (event, data) => {

    var buf = [];
    stream_data = new Buffer(parseInt(data[1]));

    

    var file = {
	name: data[0],
	createReadStream: function(opts){
	    console.log(stream_data.length);
	    return from([ stream_data.slice(0, (stream_data.length - 1)) ]);
	}
    }

    ipc.on('addData', (event, data) => {
	console.log('added data to stream: ');
	buf.push(data);

	stream_data= Buffer.concat(buf); //TODO: El rendimiento de esto es mediocre no lo siguiente.
    })

    //console.log(file.createReadStream);
    render.render(file, 'audio', function(err, elem){
	if(err){ return console.log('error appending') }
    })
})



ipc.on('updateProgress', (event, data) => { 
    progressBar = document.getElementById('progress-bar');
    progressBar.style.width = data+'%';
    console.log(data);
    audio = document.getElementById('audio');
    audio.style.display = 'block';
})

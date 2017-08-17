var audio_tag = document.getElementById('audio')

ipcRenderer.on('can-play', (event, args) => {
  audio_tag.src = 'http://localhost:9999/' + args.toString();
})

var open_file_explorer = function() {
  ipcRenderer.send('open-folder', []);
}

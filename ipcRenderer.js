var audio_tag = document.getElementById('audio')

ipcRenderer.on('can-play', (event, args) => {
  audio_tag.src = 'http://localhost:9999/' + args[0].toString();
  audio_tag.title = args[1];
})

var open_file_explorer = function() {
  ipcRenderer.send('open-folder', []);
}

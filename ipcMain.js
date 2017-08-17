const {ipcMain} = require('electron')
const WebTorrent = require('webtorrent')
const client = new WebTorrent()
var server

ipcMain.on('add-torrent', (event, arg) => {
  client.add(arg, function(torrent) {
    var files = []
    torrent.files.forEach(function(f) {
      files.push({
        title: f.name,
        torrent: torrent.infoHash,
        index: torrent.files.indexOf(f)
      })
    })
    event.sender.send('update-song', files)
  })
})

ipcMain.on('play', (event, args) => {
  if (server != client.get(args[0]).createServer()) {
    if(server != null){
      server.close();
    }
    server = client.get(args[0]).createServer();
    server.listen(9999);
  }
  event.sender.send('can-play', args[1]);
})

ipcMain.on('open-file-explorer', (event, args) => {
  
})

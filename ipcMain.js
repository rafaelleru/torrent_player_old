const {ipcMain} = require('electron')
const WebTorrent = require('webtorrent')
const client = new WebTorrent()
const mp3Duration = require('mp3-duration')
const async = require('async')

var server;

ipcMain.on('add-torrent', (event, arg) => {
  client.add(arg, function(torrent) {
    var files = []
    async.each(torrent.files, function(f, callback) {
      mp3Duration('/tmp/webtorrent/' + torrent.infoHash + '/' + f.path, function(err, duration) {
        if (err) return console.log(err.message);
        files.push({
          title: f.name,
          torrent: torrent.infoHash,
          index: torrent.files.indexOf(f),
          duration: duration
        })
        callback();
      })
   }, function(err) {
      console.log('last callback');
      if (err) console.log(err.message)
      event.sender.send('update-song', files);
    })
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
  event.sender.send('can-play', [args[1], args[2]]);
})

ipcMain.on('open-file-explorer', (event, args) => {

})

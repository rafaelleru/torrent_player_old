const WebTorrent = require('webtorrent')
const client = new WebTorrent()

//magnet:?xt=urn:btih:2f9505e50a48838c7f769c707ed9e29cee2f03ba&dn=%5B2012%5D+Unisonic+-+Unisonic&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337

songs =  [
]

Vue.component('Song', {
  template: '\
    <li>\
      <h3> {{ title }} </h3>\
      <h5> {{ torrent }} </h5>\
    </li>\
  ',
  props: ['title', 'torrent']
})

var example1 = new Vue({
  el: '#example-1',
  data: {
    magnet: '',
    songs: songs
  },
  methods: {
    addMagnet: function() {
      client.add(this.magnet, function(torrent) {
          console.log(torrent.infoHash)
          torrent.files.forEach(function(f) {
            songs.push({
              title: f.name,
              torrent: torrent.infoHash
            })
          })
        })
    }
  }
})

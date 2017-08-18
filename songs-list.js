const WebTorrent = require('webtorrent')
const client = new WebTorrent()
const {ipcRenderer} = require('electron')
require('./ipcRenderer.js')

//magnet:?xt=urn:btih:2f9505e50a48838c7f769c707ed9e29cee2f03ba&dn=%5B2012%5D+Unisonic+-+Unisonic&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337
songs = [
  {
    title: '01 - Cigarrito',
    torrent: 'sadlkjfañlksjfdñlksajdfñlkajsdf',
    index: 1,
    duration: '3:15'
  },
  {
    title: '02 - Tras la barra',
    torrent: 'sadlkjfañlksjfdñlksajdfñlkajsdf',
    index: 1,
    duration: '3:15'
  },
  {
    title: '03 - Alucinante',
    torrent: 'sadlkjfañlksjfdñlksajdfñlkajsdf',
    index: 1,
    duration: '3:15'
  },
  {
    title: '03 - Si la tocas otra vez',
    torrent: 'sadlkjfañlksjfdñlksajdfñlkajsdf',
    index: 1,
    duration: '3:15'
  },
  {
    title: '03 - Un abecedario sin letras',
    torrent: 'sadlkjfañlksjfdñlksajdfñlkajsdf',
    index: 1,
    duration: '3:15'
  },

]
Vue.component('Song', {
  template: '\
      <div class="song">\
        <div class="play-button">\
          <i class="material-icons" v-on:click="alert">play_circle_outline</i>\
        </div>\
        <div class="song-container">\
          <a v-on:click="alert" class="song-title primary-text-color"\
            style="float: left;"> {{ title }}</a>\
          <a style="display: inline-block; float: right"> {{ duration }} </a>\
          <p style="font-size: small" class="secondary-text-color"> {{ torrent }} </p>\
        </div>\
      </div>\
  ',
  props: ['title', 'torrent', 'index', 'duration'],
  methods: {
    alert: function() {
      ipcRenderer.send("play", [this.torrent, this.index, this.title]);
    }
  }
})

var magnetInput = new Vue({
  el: '#magnet-input',
  data: {
    magnet: '',
  },
  methods: {
    addMagnet: function() {
      ipcRenderer.send('add-torrent', this.magnet)
      ipcRenderer.on('update-song', (event, arg) => {
          arg.forEach(function(f) {
            songs.push(f)
          })
      })
    }
  }
})

var example1 = new Vue({
  el: '#example-1',
  data: {
    magnet: '',
    songs: songs
  },
  methods: {
    addMagnet: function() {
      ipcRenderer.send('add-torrent', this.magnet)
      ipcRenderer.on('update-song', (event, arg) => {
          arg.forEach(function(f) {
            songs.push(f)
          })
      })
    },

    log: function(event) {
      console.log("play ")
    }
  }
})

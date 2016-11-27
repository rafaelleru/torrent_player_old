var applicationConfigPath = require('application-config-path')
var path = require('path')

var APP_NAME = 'Torrent-Player'
var APP_TEAM = 'Torrent-Player team'
var APP_VERSION = require('./package.json').version

module.exports = {
  APP_COPYRIGHT: 'Copyright © 2016 ' + APP_TEAM,
  APP_FILE_ICON: path.join(__dirname, 'static', 'Torrent-PlayerFile'),
  APP_ICON: path.join(__dirname, 'static', 'Torrent-Player'),
  APP_NAME: APP_NAME,
  APP_TEAM: APP_TEAM,
  APP_VERSION: APP_VERSION,
  APP_WINDOW_TITLE: APP_NAME + ' (BETA)',

  CONFIG_PATH: applicationConfigPath(APP_NAME),
  CONFIG_POSTER_PATH: path.join(applicationConfigPath(APP_NAME), 'Posters'),
  CONFIG_TORRENT_PATH: path.join(applicationConfigPath(APP_NAME), 'Torrents'),

  GITHUB_URL: 'https://github.com/rafaelleru/torrent_player.git',
  GITHUB_URL_RAW: 'https://raw.githubusercontent.com/rafaelleru/torrent_player/master',

  IS_PRODUCTION: isProduction(),

  ROOT_PATH: __dirname,
  STATIC_PATH: path.join(__dirname, 'static'),


  WINDOW_MIN_HEIGHT: 38 + (120 * 2), // header height + 2 torrents
  WINDOW_MIN_WIDTH: 425
}

function isProduction () {
  if (!process.versions.electron) {
    return false
  }
  if (process.platform === 'darwin') {
    return !/\/Electron\.app\/Contents\/MacOS\/Electron$/.test(process.execPath)
  }
  if (process.platform === 'win32') {
    return !/\\electron\.exe$/.test(process.execPath)
  }
  if (process.platform === 'linux') {
    return !/\/electron$/.test(process.execPath)
  }
}

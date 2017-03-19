function PlayList() {
    this.counter = 0;
    this.songs = [];
};

/**
 * Añade un par NumeroArchivo:NumeroTorrent
 */

PlayList.prototype.addSong = function (pair){
    this.songs.push(pair);
}

/**
 * Devuelve la siguiente cancion a reproducir.
 */

PlayList.prototype.getNextSong = function (){
    counter++;
    return this.songs[counter-1];
}

/**
 * Mezcla el vector de canciones para el modo aleatorio
 */
PlayList.prototype.suffle = function (){
    this.songs.suffle();
}

/**
 * devuelve la cancion numero n
 */
PlayList.prototype.getSong = function (n){
    counter = n;
    return this.counter;
}

module export PlayList;

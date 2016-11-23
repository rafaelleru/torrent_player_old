function Player(){
    this.file;
    this.queue = [];
}

Player.prototype.play(file){
    this.file = file;
}

Player.prototype.addToQueue(file){
    this.queue.push(file);
}

module.exports = Player;

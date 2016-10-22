const  
fixtures = require('webtorrent-fixtures'),
should= require("should"),
downloader = require("../downloader.js");

describe( "Crea un objeto y añade torrent", function() {
  var dl = new downloader();
  it( "Debería ser no nulo" , function( done ) {
    dl.should.have.property("client");
    done();
  });

  it( "Añade sin problemas un torrent", function( done ) {
    dl.addTorrent( fixtures.leaves.magnetURI);
    should.equal( dl._torrentsArray.length, 1);
    done()
  })
});


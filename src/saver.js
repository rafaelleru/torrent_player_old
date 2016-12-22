//para guardar los archivos descargados para que esten disponibles sin
//conexion, para no interferir con el proceso de torrent y que ademas,
//se colabore activamente con el emjambre se almacenaran tambien los
//torrents de manera que al cargar la musica disponible sin conexion
//se compartira esta por medio de torrent. (Esto segundo no se como lo
//voy a hacer), ademas hay que permitir desactivar esto, aunque por
//defecto vendra instalado



/*ipc.on("LoadSyncedData", (event, data) => {
    //recibir el directorio en el que el usiario almacena la musica sin conexion
    //comprobar cada subdirectorio que haya en el, y todos los .torrent.
    //enviar los torrent al cliente y decirle que ya esta ahi almacenado.
})*/

var sync_button = document.getElementById('syncButton');

syncButton.onclick = function(){
    ipc1.send("SaveData", []);
}

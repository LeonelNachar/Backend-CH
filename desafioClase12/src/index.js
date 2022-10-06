const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorMemoria = require('../contenedores/ContenedorMemoria.js');
const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js');

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer);

const productosApi = new ContenedorMemoria()
const mensajesApi = new ContenedorArchivo('mensajes.json')


io.on('connection', async socket => {
    socket.emit('productos', productosApi.listAll());

    socket.on('update', producto => {
        productosApi.save(producto)
        io.sockets.emit('productos', productosApi.listAll());
    })

    socket.emit('mensajes', await mensajesApi.listAll());

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.save(mensaje)
        io.sockets.emit('mensajes', await mensajesApi.listAll());
    })
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server up and running on port ${connectedServer.address().port}`)
})
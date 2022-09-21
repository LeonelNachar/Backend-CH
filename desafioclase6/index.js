const { response } = require('express');
const express = require('express');
const Contenedor = require('./main')
let container = new Contenedor('./productos.json')

const PORT = process.env.PORT || 8080;

function randomProduct (rProd){
    return rProd[Math.floor(Math.random() * rProd.length)]
}

const app = express();

app.get('/', (req, res) => {
    res.send('Esta es la página de inicio')
})

app.get('/productos', (req, res) => {
    container.getAll().then(prod => res.send(prod))
    
})

app.get('/productoRandom', (req, res) =>{
    container.randomProduct().then(random => res.send(random))
})

app.get('*', (req,res) => {
    const responseStatus = 404;
    res.status(responseStatus).send(`<h1 style="color: red;">La pagina no existe (${responseStatus})</h1>`)

})

const connectedServer = app.listen(PORT, () => {
    console.log(`Server is UP and running on port ${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log(error.message)
});
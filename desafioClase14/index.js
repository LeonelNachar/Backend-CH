const express = require('express')
const apiRoute = require('./routers/app.routes')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use('/api', apiRoute);

const connectedServer = app.listen(PORT, () => {
    console.log(`Server up and running on port ${connectedServer.address().port}`)
})

app.get('*', (req,res) =>{
    const responseStatus = 404;
    res.status(responseStatus).send({error: -2, descripcion:`ruta ${req.url} metodo ${req.method} no implementada`})
})
/*`<h1 style="color:blue;">La página que busca no existe (${responseStatus})</h1>`*/
connectedServer.on('error', (error) => {
    console.log(error.message)
})
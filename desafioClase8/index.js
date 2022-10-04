const express = require('express');
const apiRoutes = require('./routers/app.routers');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


app.use('/api', apiRoutes);

app.get('*', (req,res) =>{
    const responseStatus = 404;
    res.status(responseStatus).send(`<h1 style="color:blue;">La página que busca no existe (${responseStatus})</h1>`)
})

const connectedServer = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log(error.message)
})
const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

const routes = require('./routes.js');


app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('main');
});

app.use('/productos', routes);


app.listen(PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`);
});

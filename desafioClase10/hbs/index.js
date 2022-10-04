const express = require('express');
const { engine: handlebars } = require('express-handlebars');
const PORT = process.env.PORT || 8080;

const app = express();

const routes = require('./routes.js');

app.engine('hbs', handlebars({
		layoutsDir: __dirname + '/views/layouts',
		partialsDir: __dirname + '/views/partials',
		defaultLayout: 'index',
		extname: 'hbs',
	})
);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('main', { title: 'Formulario' });
});

app.use('/productos', routes);


app.listen(PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`);
});

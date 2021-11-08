const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/faqs', (req, res) => {
	res.render('faqs');
});

app.use((req, res, next) => {
	res.sendFile(path.join(__dirname, './views/404.html'));
});

app.listen(app.get('port'), () => {
	console.log(`listen on http://localhost:${app.get('port')}`);
});

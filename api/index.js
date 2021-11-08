const express = require('express');
const app = express();

const operation = require('./routes/operation');

// puerto
app.set('port', process.env.PORT || 3001);

// leer json
app.use(express.json());

// routes
app.use('/api/operation', operation);

// server
app.listen(app.get('port'), () => {
	console.log(`listen on http://localhost:${app.get('port')}`);
});

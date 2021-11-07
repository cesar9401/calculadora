const express = require('express');
const app = express();

const math = require('./routes/math');

/* puerto */
app.set('port', process.env.PORT || 3002);

/* para entender json */
app.use(express.json());

/* route */
app.use('/math/operation', math);

/* server */
app.listen(app.get('port'), () => {
	console.log(`listen on http://localhost:${app.get('port')}`);
});

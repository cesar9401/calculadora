const { Router } = require('express');
const router = new Router();

const data = {
	name: 'Cesar',
	location: 'Worker'
}

router.get('/', (req, res) => {
	res.status(200);
	res.json(data);
});

module.exports = router;
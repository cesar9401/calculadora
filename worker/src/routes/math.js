const { Router } = require('express');
const parser = require('../utils/grammar');
const router = new Router();

router.get('/', (req, res) => {
	const { ans, operation } = req.query;
	// console.log(ans, operation);
	try {
		parser.last(ans);
		const result = parser.parse(operation);
		const data_parser = { ok: true, ans: result };
		res.status(200).json(data_parser);
	} catch(error) {
		const data = { ok: false, ans: error };
		res.status(200).json(data);
	}
});

module.exports = router;

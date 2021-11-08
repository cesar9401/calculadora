const { Router } = require('express');
const axios = require('axios');
const router = new Router();
const workerhost = process.env.WORKER_HOST;
const workerport = process.env.WORKER_PORT;
const worker = `http://${workerhost}:${workerport}/math/operation`;

router.post('/', (req, res) => {
    const { ans, operation } = req.body;
	const params = { ans: ans, operation: operation };

	axios.get(worker, { port: Number.parseInt(workerport), params })
		.then(response => {
			// console.log(`from api: ${response.data}`);
			res.status(200).json(response.data);
		})
		.catch(error => {
			res.status(200).json(data);
		});
});

router.post("/suma", (req, res) => {
	const { op1, op2 } = req.body;
	const result = Number(op1) + Number(op2);
	res.status(200).json({ resultado: result });
});

module.exports = router;

const { Router } = require('express');
const axios = require('axios');
const router = new Router();

const { signToken, checkToken } = require('../auth/token');
const { setOperation, getHistory } = require('../utils/history');

const workerhost = process.env.WORKER_HOST;
const workerport = process.env.WORKER_PORT;
const worker = `http://${workerhost}:${workerport}/math/operation`;

router.post('/', checkToken, async (req, res) => {
    const { ans, operation } = req.body;
	const params = { ans: ans, operation: operation };

	try {
		const resultado = await axios.get(worker, { port: Number.parseInt(workerport), params });
		const save = await setOperation(operation, resultado.data.ans);
		res.status(200).json(resultado.data);
	} catch (error) {
		console.error(error);
		res.status(200).json({ ok: false, ans: "Error de conexion con worker" });
	}
});

router.get("/", checkToken, async (req, res) => {
	try{
		const hist = await getHistory();
		res.status(200).json(hist);
	} catch(error) {
		res.status(200).json({ ok: false });
	}
});

module.exports = router;

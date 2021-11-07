const { Router } = require('express');
const axios = require('axios');

const router = new Router();
const parser = require('../utils/grammar');

const workerhost = process.env.WORKER_HOST;
const workerport = process.env.WORKER_PORT;

const worker = `http://${workerhost}:${workerport}/math/operation`;

// const worker = 'http://localhost/math/operation';
const api = 'https://rickandmortyapi.com/api/'
// axios.get('https://rickandmortyapi.com/api/')
// 	.then(data => console.log(data.data))
// 	.catch(console.log);

router.get('/', (req, res) => {
	const data = {
		name: "Cesar",
		location: "api"
	};

	axios.get(worker, { port: Number.parseInt(workerport) })
		.then(datos => {
			const tmp = datos.data;
			// res.status(201).json({name: `${tmp.name}, location: ${tmp.location}`});

			// res.status(200);
			// res.json(datos.data);
			res.status(201).json(tmp);
		})
		.catch(error => {
			res.status(200);
			res.json(data);
		});

	// axios.get(api)
	// 	.then(response => {
	// 		res.status(201).json(response.data);
	// 	})
	// 	.catch(error => {
	// 		res.status(500).json(data);
	// 	});


	// res.status(200);
	// res.json(data);
});

router.post('/', (req, res) => {
	console.log('here');
    const { ans, operation } = req.body;
    res.set('Content-Type', 'application/json');
	res.status(200);

	try {
		parser.last(ans);
		const result = parser.parse(operation);
		const data = {
			ok: true,
			ans: result
		}
		res.json(data);
	}catch (error) {
		const data = {
			ok: false,
			ans: error
		}
		res.json(data);
	}
});

module.exports = router;

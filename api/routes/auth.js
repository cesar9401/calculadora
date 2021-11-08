const { Router } = require('express');
const router = new Router();
const crypto = require('crypto');
const { signToken, checkToken } = require('../auth/token');
const { exist, setUser, getUser } = require('../utils/user');

router.post('/signup', async (req, res) => {
	const { email, password } = req.body;

	try {
		const isUser = await exist(email);
		if(isUser !== 0) {
			res.status(409).json({ success: 0 });
		} else {
			crypto.randomBytes(16, (err, salt) => {
				const newSalt = salt.toString('base64');
				crypto.pbkdf2(password, newSalt, 1000, 64, 'sha1', async (err1, key) => {
					const encripted = key.toString('base64');
					try {
						const user = await setUser(email, encripted, newSalt);
						res.status(201).json({ success: 1 });
					} catch (error1) {
						res.status(503).json({ success: -1 });
					}
				});
			});
		}
	} catch (error) {
        res.status(503).json({ success: -1 });
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await getUser(email);
		if(!user) {
			res.json({ res: "credenciales incorrectas" });
		} else {
			crypto.pbkdf2(password, user.salt, 1000, 64, 'sha1', (err, key) => {
				const encripted = key.toString('base64');
				if(user.password === encripted) {
					const tkn = signToken(email);
					res.status(201).json({ token: tkn });
				} else {
					res.status(201).json({ res: "credenciales incorrectas" });
				}
			});
		}
	} catch (error) {
		res.status(503).send("inaccesible");
	}
});

module.exports = router;

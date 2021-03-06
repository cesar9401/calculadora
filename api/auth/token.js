const webtoken = require('jsonwebtoken');
const tokensecret = process.env.TOKEN_SECRET;
const { exist, setUser, getUser } = require('../utils/user');

const signToken = id => {
	return webtoken.sign({ id }, tokensecret, { expiresIn: 120 });
};

const checkToken = async (req, res, next) => {
	const token = req.headers.authorization;
	if(!token) {
		return res.status(511).json({ success: 0 })
		// return res.sendStatus(511);
	}

	webtoken.verify(token, tokensecret, async (error, decoded) => {
		if(decoded) {
			try {
				const { id } = decoded;
				const isUser = await exist(id);
				if(isUser !== 0) {
					req.user = id;
					next();
				} else {
					res.status(401).json({ success: 0 });
				}
			} catch (error) {
				console.error(error);
				res.status(511).json({ success: 0 });
			}
		} else {
			res.status(403).json({ success: 0 });
		}
	});
}

module.exports = { signToken, checkToken };

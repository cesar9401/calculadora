const redis = require('redis');
const host = process.env.REDIS_HOST;
const port = process.env.REDIS_PORT;

const redisClient = redis.createClient({ host: host, port: port, retry_strategy: () => 1000 });

const setOperation = (operation, data) => {
	return new Promise((resolve, reject) => {
		resolve(redisClient.hset('operations', `"${operation}"`, data));
	});
};

const getHistory = () => {
	return new Promise((resolve, reject) => {
		redisClient.HGETALL('operations', (error, exist) => {
			if(error) {
				reject(0);
			} else {
				resolve(exist);
			}
		});
	});
}

module.exports = {
	setOperation,
	getHistory
};

const { host, port } = require('./redis-config');
const redis = require('redis');

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
			}
			resolve(exist);
		});
	});
}

module.exports = {
	setOperation,
	getHistory
};

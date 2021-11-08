const redis = require('redis');
const { host, port } = require('./redis-config');

const redisClient = redis.createClient({ host: host, port: port, retry_strategy: () => 1000 })

const exist = email => {
	return new Promise((resolve, reject) => {
		redisClient.exists(email, (error, exist) => {
			if(error) {
				reject(0);
			}
			resolve(exist);
		});
	});
};

const setUser = (email, password, salt) => {
	return new Promise((resolve, reject) => {
		resolve(redisClient.hset(email, 'password', password, 'salt', salt));
	});
};

const getUser = email => {
	return new Promise((resolve, reject) => {
		redisClient.hgetall(email, (error, exist) => {
			if(error) {
				reject(0);
			}
			resolve(exist);
		});
	});
};

module.exports = { exist, setUser, getUser };

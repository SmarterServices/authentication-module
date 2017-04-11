    var redis = require("redis");
    var redisWrapper = function(config) {
    	this.client = redis.createClient(config.url);
    	this.prefix = config.prefix;
    	this.expire = config.expire;
    }
	/**
	 * remove This function is used to remove a key value store of a token in redis essencially ending a users session
	 * @param  {string} token The full token for the users session
	 * @return new Promise() 
	 */
	redisWrapper.prototype.remove = function(token) {
		//key is the very last part of token after last '.'
		var key = `${this.prefix}.${token.split('.')[token.split('.').length -1]}`
		return new Promise((resolve,reject) => {
			this.client.del(key,(err,res) => {
				return (err||res===0) ? reject('could not remove token') : resolve(res)
			})
		})
	},
	/**
	 * findOne This function is used to retrieve the iam for a token from redis
	 * @param  {string} token The full token for the users session
	 * @return new Promise() 
	 */
	redisWrapper.prototype.findOne = function(token) {
		//key is the very last part of token after last '.'
		var key = `${this.prefix}.${token.split('.')[token.split('.').length -1]}`
		return new Promise((resolve,reject) => {
			this.client.get(key,(err,res) => {
				return (err) ? reject(err) : resolve(JSON.parse(res));
			})				
		})
	},
	/**
	 * update This function is used to update the expire time on a token essencially refreshing the token
	 * @param  {string} token The full token for the users session
	 * @return new Promise() 
	 */
	redisWrapper.prototype.update = function(token) {
		//key is the very last part of token after last '.'
		var key = `${this.prefix}.${token.split('.')[token.split('.').length -1]}`
		return new Promise((resolve,reject) => {
			this.client.expire(key,this.expire,(err,res) => {
				return (err||res===0) ? reject('token does not exist') : resolve(res);
			})	
		})
	},
	/**
	 * insert This function is used to create a new session and get a new token for a user
	 * @param  {object} Obj the object containing everything about this session.
	 * @param  {object} Obj.token the token used for this session.
	 * @param  {object} Obj.createdAt the time the token was created.
	 * @param  {object} Obj.iam the iam information.
	 * @return new Promise() 
	 */
	redisWrapper.prototype.insert = function(Obj) {
		//key is the very last part of token after last '.'
		var key = `${this.prefix}.${Obj.token.split('.')[Obj.token.split('.').length -1]}`
		//remove token from the object that will be the value in redis to the key
		delete token in Obj;
		var payload = JSON.stringify(Obj);
		return new Promise((resolve,reject) => {
			//set key value in redis
			this.client.set(key,payload,(err,res) => {
				if(err) {
					return reject(err);
				}
			//set expire time in redis
				this.client.expire(key,this.expire,(e,r) => {
				return (e) ? reject(e) : resolve(r);	
				})
			})
		})
	}

module.exports = redisWrapper; 
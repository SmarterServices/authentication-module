var Token = require('./helper/token');
var redis = require('./helper/redisWrapper');
var iam = require('open-iam');
var async = require('async');
var uuid = require('uuid');
var auth = function(config) {
  this.token = new Token(config.secret);
  this.redis = new redis({
    url: config.url,
    prefix: config.prefix,
    expire: config.expire
  });
};
/**
 * logout this function will log a user out, ie delete their token
 * @param  {String} tok users token
 * @return {Promise} resolve or reject
 */
auth.prototype.logout = function(tok) {
  return new Promise((resolve, reject) => {
    this.redis
      .remove(tok)
      .then(res => resolve({ tokenDeleted: true }))
      .catch(
        e =>
          reject({ err: 'Error deleting token or it already has been deleted' })
      );
  });
};
/**
 * permissions will return the iam doc for a token
 * @param  {String} tok users token
 * @return {Promise} resolve or reject
 */
auth.prototype.permissions = function(tok) {
  return new Promise((resolve, reject) => {
    this.redis
      .findOne(tok)
      .then(res => {
        if (!res) {
          return reject({ err: 'No document for that token' });
        }
        return res.iam;
      })
      .then(res => resolve({ iam: res }))
      .catch(e => reject({ err: 'Error getting permissions for a token' }));
  });
};
/**
 * check will check that a users token in valid
 * @param  {String} tok users token
 * @return {Promise} resolve or reject
 */
auth.prototype.check = function(tok) {
  return new Promise((resolve, reject) => {
    this.redis
      .update(tok)
      .then(res => {
        if (!res) {
          return reject('Token validation fail');
        }
        return this.token.decode(tok);
      })
      .then(res => resolve({ validated: true, token: res }))
      .catch(e => reject({ err: e }));
  });
};
/**
 * register
 * @param  {Object} opts object used to create token
 * @return {Promise} resolve({token:toekn,iam:iam}) or reject()
 */
auth.prototype.register = function(opts, expireTime) {
  return new Promise((resolve, reject) => {
    opts.payload.id = uuid.v1();
    opts.payload.create_time = +new Date();
    var returnToken = this.token.encode(opts.payload);
    var Obj = { token: returnToken, createAt: new Date() };
    var returnIam;
    if (opts.iam) {
      returnIam = iam.processIamData(opts.iam);
      Obj.iam = returnIam;
    } else {
      return reject({ err: 'IAM was not provided in payload' });
    }
    this.redis
      .insert(Obj, expireTime)
      .then(res => resolve({ token: returnToken, iam: returnIam }))
      .catch(e => reject({ err: 'failed to store the token' }));
  });
};
module.exports = auth;

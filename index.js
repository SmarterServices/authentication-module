var token = require('./helper/token');
var redis = require('./helper/redisWrapper');
var iam = require('open-iam');
var async = require('async');
var uuid = require('uuid');
var auth = function(config) {
  this.redis = new redis({
    url: config.url,
    prefix: config.prefix,
    expire: config.expire
  });
};
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
auth.prototype.check = function(tok) {
  return new Promise((resolve, reject) => {
    this.redis
      .update(tok)
      .then(res => {
        if (!res) {
          return reject('Token validation fail');
        }
        return token.decode(tok);
      })
      .then(res => resolve({ validated: true, token: res }))
      .catch(e => reject({ err: e }));
  });
};
auth.prototype.register = function(opts) {
  return new Promise((resolve, reject) => {
    opts.payload.id = uuid.v1();
    opts.payload.create_time = +new Date();
    var returnToken = token.encode(opts.payload);
    var Obj = { token: returnToken, createAt: new Date() };
    var returnIam;
    if (opts.iam) {
      returnIam = iam.processIamData(opts.iam);
      Obj.iam = returnIam;
    } else {
      return reject({ err: 'IAM was not provided in payload' });
    }
    this.redis
      .insert(Obj)
      .then(res => resolve({ token: returnToken, iam: returnIam }))
      .catch(e => reject({ err: 'failed to store the token' }));
  });
};
module.exports = auth;

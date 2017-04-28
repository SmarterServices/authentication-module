var jwt = require('jwt-simple');
/**
 * @class token
 */
var tokens = function(secret) {
  if (!secret) {
    throw Error('Need to pass secret key in constructor');
  }
  this.secret = secret;
};

/**
     * This function is used to encode a token
     *
     *
     * @method encode
     * @param {Object} payload payload that will be encoded in the token
     * @return {String} token
     */
tokens.prototype.encode = function(payload) {
  return jwt.encode(payload, this.secret);
}, /**
     * This function is used to decode a token
     *
     *
     * @method encode
     * @param {String} token that will be decoded
     * @return {String} decodedtoken
     */
tokens.prototype.decode = function(token) {
  return jwt.decode(token, this.secret);
};
module.exports = tokens;

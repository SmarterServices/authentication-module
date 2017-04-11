var jwt = require('jwt-simple');
var secret = 'Smarter1';
/**
 * @class token
 */
var tokens = {
  /**
     * This function is used to encode a token
     *
     *
     * @method encode
     * @param {Object} payload payload that will be encoded in the token
     * @return {String} token
     */
  encode: function(payload) {
    return jwt.encode(payload, secret);
  },
  /**
     * This function is used to decode a token
     *
     *
     * @method encode
     * @param {String} token that will be decoded
     * @return {String} decodedtoken
     */
  decode: function(token) {
    return jwt.decode(token, secret);
  }
};
module.exports = tokens;

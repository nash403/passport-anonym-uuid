/**
 * Module dependencies.
 */
let passport = require('passport-strategy')
  , util = require('util')
  , genuuid = require('node-uuid');


/**
 * Creates an instance of `Strategy`.
 *
 * The anonymous authentication strategy passes authentication without verifying
 * credentials and if no verify function is supplied sets `req.user` to an object
 * of the form:
 * 
 * {uuid: "anonymous_710b962e-041c-11e1-9234-0123456789ab"}
 *
 * Applications can supply a `verify` callback which accepts `req` and `uuid`
 * as parameters, and then calls the `done` callback supplying a
 * `user`, which should be set to `false` if you decided not to unauthorize
 * the anonymous user.
 * If an exception occurred, `err` should be set.

 * Examples:
 *
 *     passport.use(new AnonymIdStrategy());
 *
 * @constructor
 * @api public
 */
function Strategy(verify) {
  if (typeof verify === 'object') {
    options = verify;
    verify = null;
  }
  passport.Strategy.call(this);
  this.name = 'anonymId';
  this._verify = verify || null;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Pass authentication without verifying credentials.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req) {

  let uuid = "anonymous_" + genuuid.v4();
  let self = this;
  function verified(err, user, info) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(info); }
    self.success(user, info);
  }
  if (this._verify) {
    try {
      this._verify(req, uuid, verified);
    } catch (ex) {
      return self.error(ex);
    }
  } else verified(null, {uuid})
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;

/* global describe, it, expect, before */
/* jshint expr: true */

var chai = require('chai')
  , Strategy = require('../lib/strategy');


describe('Strategy', function() {
    
  var strategy = new Strategy();
    
  it('should be named anonymId', function() {
    expect(strategy.name).to.equal('anonymId');
  });
  
  describe('handling a request', function() {
    var user;
    
    before(function(done) {
      chai.passport(strategy)
        .success(function(u, i) {
          user = u;
          done(null,u);
        })
        .authenticate();
    });
    
    it('should call success', function() {
      expect(user).to.be.an.object;
    });
    
    it('should supply req.user with uuid field', function() {
      expect(user).to.have.property('uuid');
    });
  });
  
});

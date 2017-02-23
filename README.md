# passport-anonym-uuid

[Passport](http://passportjs.org/) strategy for anonymous authentication with a unique uuid for the anonymous user.

This module lets you provide anonymous authentication in your Node.js
applications.  By plugging into Passport, anonymous authentication can be easily
and unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-anonym-uuid

## Usage

#### Configure Strategy

The anonymous authentication strategy passes authentication for a request,
with `req.user` supplied with `{uuid: "anonymous_<uuid>"}`.

    passport.use(new AnonymIdStrategy());

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'anonymId'` strategy, to
pass authentication of a request.  This is typically used alongside a strategy
that verifies credentials, as a fallback for routes that prefer authentication
but can also respond to unauthenticated requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.post('/hello', 
      passport.authenticate(['basic', 'anonymId'], { session: false }),
      function(req, res) {
        if (!req.user.uuid) {
          res.json({ name: req.user.username });
        } else {
          res.json({ name: req.user.uuid });
        }
      });

## Examples

For a complete, working example, refer to the [login example](https://github.com/nash403/passport-anonym-uuid/tree/master/examples/basic).

## Tests

    $ npm install
    $ npm test

## Credits
This package is almost a copy of [passport-anonymous](https://github.com/jaredhanson/passport-anonymous) made by [Jared Hanson](http://github.com/jaredhanson).

  - [Honoré Nintunze](https://github.com/nash403)
  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2017 Honoré Nintunze
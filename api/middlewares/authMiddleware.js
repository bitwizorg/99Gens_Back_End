const { UserModel } = require('../models');

const { JwtService } = require('../services');

module.exports = {
  jwt: (req, res, next) => {
    let token;
    if (req.headers && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];
        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
        } else {
          return next('INVALID_GRANT');
        }
      } else {
        return next('INVALID_GRANT');
      }
    } else {
      return next(401);
    }

    return JwtService.verify(token)
      .then((tokenPayload) => {
        if (tokenPayload && tokenPayload.auth) {
          return UserModel.findOne(
            { _id: tokenPayload.auth },
            { _id: 1, role: 1, username: 1 },
          ).lean();
        }
        return next(new Error('INVALID_GRANT'));
      })
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
  uniqueEmail: (req, res, next) => UserModel.findOne({ email: req.body.email }, { _id: 1 })
    .then((user) => {
      if (user) {
        return next('ERR_EMAIL_ALREADY_REGISTER');
      }
      return next();
    })
    .catch(err => next(err)),
  uniqueUsername: (req, res, next) => {
    if (req.method === 'POST') {
      return UserModel.findOne({ username: req.body.username }, { _id: 1 })
        .then((user) => {
          if (user) {
            return next(new Error('Username already exist'));
          }
          return next();
        })
        .catch(err => next(err));
    } if (req.method === 'PUT') {
      return UserModel.findOne({ _id: req.params.userId }, { username: 1 })
        .then((user) => {
          if (user) {
            return UserModel.findOne(
              { _id: { $ne: req.params.userId }, username: req.body.username },
              { _id: 1 },
            );
          }
          return next(new Error('No username'));
        })
        .then((user) => {
          if (user) {
            return next(new Error('Username already exist'));
          }
          return next();
        })
        .catch(err => next(err));
    }
    if (req.method === 'GET') {
      return UserModel.findOne({ username: req.params.username })
        .then((user) => {
          if (user) {
            req.user = user;
            return next();
          }
          return next(new Error('No user exist'));
        })
        .catch(err => next(err));
    }
    return next();
  },
  availableEmail: (req, res, next) => UserModel.findOne({ email: req.body.email }, { _id: 1 })
    .then((user) => {
      if (user) {
        return next();
      }
      return next('ERR_EMAIL_NOT_REGISTER');
    })
    .catch(err => next(err)),
};

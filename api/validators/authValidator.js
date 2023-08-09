const Joi = require('joi');
const { UserModel } = require('../models');

const usernameSchema = Joi.object().keys({
  username: Joi.string()
    .regex(/^[a-z1-9]+$/)
    .min(6)
    .max(20)
    .required(),
});

const registerSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .required(),
});

const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .required(),
});
const passwordSchema = Joi.object().keys({
  password: Joi.string()
    .min(6)
    .max(30)
    .required(),
});
const resetPasswordSchema = Joi.object().keys({
  password: Joi.string()
    .min(6)
    .max(30)
    .required(),
  username: Joi.string()
    .regex(/^[a-z1-9]+$/)
    .min(6)
    .max(20)
    .required(),
  hash: Joi.string(),
});
const forgotSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
});
const otpSchema = Joi.object().keys({
  otp: Joi.number()
    .min(6)
    .required(),
  hashToken: Joi.string(),
});
const updateSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .optional(),
  username: Joi.string()
    .regex(/^[a-z1-9]+$/)
    .alphanum()
    .min(6)
    .max(20)
    .optional(),
  firstname: Joi.string()
    .max(20)
    .allow('')
    .optional(),
  lastname: Joi.string()
    .max(20)
    .allow('')
    .optional(),
  country: Joi.string()
    .allow('')
    .optional(),
  bio: Joi.string()
    .allow('')
    .optional(),
});
const refreshTokenSchema = Joi.object().keys({
  accessToken: Joi.string()
    .required(),
  refreshToken: Joi.string()
    .required(),
});

module.exports = {
  usernameValidator(req, res, next) {
    Joi.validate(req.body, usernameSchema, (err) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  },
  registerValidator(req, res, next) {
    Joi.validate(req.body, registerSchema, (err) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  },
  loginValidator(req, res, next) {
    Joi.validate(req.body, loginSchema, (err) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  },
  passwordValidator(req, res, next) {
    Joi.validate(req.body, passwordSchema, (err) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  },
  forgotValidator(req, res, next) {
    Joi.validate(req.body, forgotSchema, (err) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  },
  otpValidator(req, res, next) {
    Joi.validate(req.body, otpSchema, (err) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  },
  updateValidator(req, res, next) {
    Joi.validate(req.body, updateSchema, (err) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  },
  uniqueEmailValidator(req, res, next) {
    UserModel.findOne({ email: req.body.email }, { _id: 1 }, (err, resData) => {
      if (resData) {
        return next('EMAIL_ALREADY_REGISTER');
      }
      return next();
    });
  },
  resetPasswordValidator(req, res, next) {
    Joi.validate(req.body, resetPasswordSchema, (err) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  },
  refreshTokenvalidator(req, res, next) {
    Joi.validate(req.body, refreshTokenSchema, (err) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  },
};

const {
  registerValidator,
  loginValidator,
  passwordValidator,
  forgotValidator,
  otpValidator,
  uniqueEmailValidator,
  addValidator,
  updateValidator,
  usernameValidator,
  resetPasswordValidator,
  refreshTokenvalidator,
} = require('../validators/authValidator');

const validators = {
  usernameValidator,
  registerValidator,
  loginValidator,
  passwordValidator,
  forgotValidator,
  otpValidator,
  uniqueEmailValidator,
  addValidator,
  updateValidator,
  resetPasswordValidator,
  refreshTokenvalidator,
};

module.exports = validators;

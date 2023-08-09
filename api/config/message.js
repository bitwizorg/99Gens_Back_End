const MESSAGES = {
  SERVER_ERR: 'Server error occured',
  AUTH: {
    LOGIN: 'You have successfully LoggedIn.',
    REGISTER: 'You have successfully registered.',
    REGISTER_OTP:
      'An OTP has been sent to your Email, please enter the OTP to verify your account.',
    REGISTER_VERIFY: 'Account successfully verified, Please login now',
    RECOVER_OTP:
      'An OTP has been send to your Email, please enter the OTP to reset your password.',
    DUPLICATE_OTP:
      'An new OTP has been sent to your Email, please enter the OTP.',
    REGISTER_TOKEN:
      'An TOKEN has been send to your Email, please verify your email.',
    INVALID_OTP: 'You have enetered wrong OTP',
    ACCOUNT_CREATION:
      'Your account have been successfully verified, Please login. !!',
    ACCOUNT_INVALID: 'No account is registered with this Email',
    ACCOUNT_RECOVER:
      'You have successfully authenticated your account, please reset your password',
    DUPLICATE_TOKEN: 'This token has been used before !!',
    ACCOUNT_ACTIVATION: 'You have successfully activated your account !!',
    PASSWORD_UPDATE: 'Password updated Successfully. Please login now',
    DUPLICATE_EMAIL: 'This email is not available, try another one',
    DUPLICATE_ACCOUNT: 'An account already exist with the provided email',
    EMAIL_AVAILAIBLE: 'This email is available',
    DUPLICATE_MOBILE:
      'This mobile number has been already registered, try another one',
    MOBILE_AVAILABLE: 'This mobile is available',
    PROFILE_UPDATE: 'Profile has been updated',
  },
  CODE: {
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    ACCOUNT_FAIL_WITH_NO_EMAIL: 'ACCOUNT_FAIL_WITH_NO_EMAIL',
    WRONG_OTP: 'WRONG_OTP',
    NO_USER: 'NO_USER',
    EMAIL_NOT_REGISTER: 'EMAIL_NOT_REGISTER',
  },
};

module.exports = MESSAGES;

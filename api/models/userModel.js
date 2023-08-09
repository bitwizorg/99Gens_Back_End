const mongoose = require('mongoose');
const Token = require('./tokenModel');
const { Schema } = mongoose;

const bcrypt = require('bcrypt-nodejs');

const SALT_WORK_FACTOR = 10;

const modelSchema = new Schema(
  {
    role: {
      type: String,
      enum: ['USER'],
      default: 'USER',
    },
    firstname: {
      type: String,
      default: "John"
    },
    lastname: {
      type: String,
      default: "Doe"
    },
    username: { type: String },
    location: {
      type: String,
      default: "San Francisco"
    },
    zipcode: {
      type: String,
      default: "BH5 DE1"
    },
    headline: { type: String },
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      default: null,
    },
    hashToken: {
      type: String,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    password: {
      type: String,
    },
    country: {
      type: String,
    },
    bio: {
      type: String,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    isDeleted: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
  },
  { timestamps: {} },
);

/* eslint func-names: 0 */
modelSchema.pre('save', function (next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  return bcrypt.genSalt(SALT_WORK_FACTOR, (err1, salt) => {
    if (err1) return next(err1);

    // hash the password using our new salt
    return bcrypt.hash(user.password, salt, null, (err2, hash) => {
      if (err2) return next(err2);

      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    });
  });
});

modelSchema.pre('beforeUpdate', (values, next) => bcrypt.genSalt(10, (err, salt) => {
  if (err) return next(err);
  if (values.password) {
    // code
    return bcrypt.hash(values.password, salt, (err1, hash) => {
      const valuesObj = values;
      if (err1) return next(err1);
      valuesObj.password = hash;
      return next();
    });
  }
  return next();
}));

modelSchema.methods.comparePassword = (password, user, cb) => {
  bcrypt.compare(password, user.password, (err, match) => {
    if (err) return cb(err);
    if (match) {
      return cb(null, true);
    }
    return cb(null, false);
  });
};

modelSchema.methods.generateVerificationToken = function () {
  let payload = {
    haskToken: hashToken,
    token: crypto.randomBytes(20).toString('hex')
  };

  return new Token(payload);
};

modelSchema.set('toObject', { virtuals: true });
modelSchema.set('toJSON', { virtuals: true });

const modelObj = mongoose.model('User', modelSchema);
module.exports = modelObj;

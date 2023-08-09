/* eslint-disable func-names */
/* eslint-disable no-undef */
// require('../server');
const chalk = require('chalk');
const request = require('supertest-as-promised');

const { log } = console;
const chai = require('chai');
const { UserModel } = require('../api/models');
const app = require('../server');


const { expect } = chai;

/**
  Some variables to be populated during test
 */
const invalidRegisterObject1 = {
  username: '',
  email: '',
  password: '',
};
const invalidRegisterObject2 = {
  username: 'yyuyuyuiyu',
  email: '',
  password: '',
};
const invalidRegisterObject3 = {
  username: 'yyuyuyuiyu',
  email: 'agsgsfagsfgasf',
  password: '565656565',
};
const invalidRegisterObject3Role = {
  // username: 'yyuyuyuiyu',
  email: 'agsgsfagsfgasf@mailinator.com',
  password: '565656565',
};
const invalidRegisterObject4 = {
  username: 'yyuyuyuiyu  ',
  email: 'agsgsfagsfgasf@yopmail.com',
  password: '565656565',
};
const invalidRegisterObject5 = {
  username: 'yyuyuyuiyu',
  email: 'agsgsfagsfgasf@yopmail.com',
  password: '12',
};
const invalidRegisterObject6 = {
  username: 'yyuyuyuiyu',
  email: 'agsgsfagsfgasf@yopmail.com',
  password: '00000000',
};
const validRegisterObject5 = {
  username: 'yyuyuyuiyu',
  email: 'hello_tecyaura@yopmail.com',
  password: '1287878787',
  role: 'CUSTOMER',
};
const validLoginObject1 = {
  email: validRegisterObject5.email,
  password: validRegisterObject5.password,
  role: validRegisterObject5.role,
};

describe('Auth API Integration Tests', function () {
  this.timeout(20000);

  describe('#Unautorised requests', () => {
    let userIdAgainstToValidate;
    let newPassword;
    let token;
    before(() => {
      log(chalk.green('STARTING AUTH CONTROLLER TESTS-------------------'));
    });
    after(() => {
      UserModel.remove({
        email: validRegisterObject5.email,
      })
        .then((response) => {
          console.log(
            chalk.red('ENDING AUTH CONTROLLER TESTS-------------------'),
          );
        })
        .catch((err) => {
          console.log(
            `${validRegisterObject5.email} unable to delete`,
          );
        });
    });

    it('should not register the user, if all fields are blank.', (done) => {
      request(app)
        .post('/api/v1/auth/register')
        .send(invalidRegisterObject1)
        .expect(400)
        .then((res) => {
          expect(res.body.code).to.be.equal('VALIDATION_FAILED');
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors).to.have.lengthOf(1);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should not register the user, if any of the fields are blank.', (done) => {
      request(app)
        .post('/api/v1/auth/register')
        .send(invalidRegisterObject2)
        .expect(400)
        .then((res) => {
          expect(res.body.code).to.be.equal('VALIDATION_FAILED');
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors).to.have.lengthOf(1);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should not register the user, if email is invalid', (done) => {
      request(app)
        .post('/api/v1/auth/register')
        .send(invalidRegisterObject3)
        .expect(400)
        .then((res) => {
          expect(res.body.code).to.be.equal('VALIDATION_FAILED');
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0].field).to.include.members([
            'email',
          ]);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it.skip('should not register the user, if role is invalid', (done) => {
      request(app)
        .post('/api/v1/auth/register')
        .send(invalidRegisterObject3Role)
        .expect(400)
        .then((res) => {
          expect(res.body.code).to.be.equal('VALIDATION_FAILED');
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0].field).to.include.members([
            'role',
          ]);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it.skip('should not register the user, if username is invalid', (done) => {
      request(app)
        .post('/api/v1/auth/register')
        .send(invalidRegisterObject4)
        .expect(400)
        .then((res) => {
          expect(res.body.code).to.be.equal('VALIDATION_FAILED');
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0].field).to.include.members([
            'username',
          ]);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should not register the user, if password is invalid (not have minlength)', (done) => {
      request(app)
        .post('/api/v1/auth/register')
        .send(invalidRegisterObject5)
        .expect(400)
        .then((res) => {
          expect(res.body.code).to.be.equal('VALIDATION_FAILED');
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0].field).to.include.members([
            'password',
          ]);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should register the user, if all fields are valid', (done) => {
      request(app)
        .post('/api/v1/auth/register')
        .send(validRegisterObject5)
        .expect(201)
        .then((res) => {
          expect(res.body.message).to.be.equal(
            'Account created, Please verify your email now.',
          );
          return res;
        })
        .then(user => UserModel.update(
          {
            email: validRegisterObject5.email,
          },
          {
            status: true,
            verification_email: true,
            otp: '',
          },
          {
            upsert: false,
          },
        ))
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should not login, if email & password are not valid', (done) => {
      const invalidLoginObject1 = {
        email: 'hello@yopmail.com',
        password: '6565656565',
      };
      request(app)
        .post('/api/v1/auth/login')
        .send(invalidLoginObject1)
        .expect(400)
        .then((res) => {
          expect(res.body.code).to.be.equal(
            'INVALID_CREDENTIALS',
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should login, if email & password are valid', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send(validLoginObject1)
        .expect(200)
        .then((res) => {
          expect(res.body.message).to.be.equal(
            'User successfully login',
          );
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data.email).to.be.equal(
            validLoginObject1.email,
          );
          expect(res.body.data).to.have.property(
            'verification_email',
          );
          expect(res.body.data.verification_email).to.be.equal(
            true,
          );
          expect(res.body.data).to.have.property('otp');
          expect(res.body.data.otp).to.be.equal('');
          expect(res.body.data).to.have.property('password');
          expect(res.body.data.password).to.be.equal('');
          expect(res.body.data).to.have.property('_id');
          expect(res.body.data).to.have.property('avatar');
          expect(res.body.data).to.have.property('username');
          expect(res.body.data).to.have.property('status');
          expect(res.body.data.status).to.be.equal(true);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should not register the user, if email Exists', (done) => {
      request(app)
        .post('/api/v1/auth/register')
        .send(invalidRegisterObject6)
        .expect(400)
        .then((res) => {
          expect(res.body.code).to.be.equal(
            'EMAIL_ALREADY_REGISTER',
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('When forgot password: should not send an email verification email, if email invalid', (done) => {
      const invalidForgetOBj1 = {
        email: '8thgjjhjgjhgh',
      };
      request(app)
        .post('/api/v1/auth/recover')
        .send(invalidForgetOBj1)
        .expect(400)
        .then((res) => {
          expect(res.body.code).to.be.equal('VALIDATION_FAILED');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('When forgot password: should not send an email verification email, if email does not exist in sytsem', (done) => {
      const invalidForgetOBj2 = {
        email: 'hello123@yopmail.com',
      };
      request(app)
        .post('/api/v1/auth/users/recover')
        .send(invalidForgetOBj2)
        .expect(400)
        .then((res) => {
          expect(res.body.code).to.be.equal(
            'EMAIL_NOT_REGISTER',
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('When forgot password: should send an email verification email, if email does exist in sytsem', (done) => {
      const validForgetOBj1 = {
        email: validRegisterObject5.email,
      };
      request(app)
        .post('/api/v1/auth/users/recover')
        .send(validForgetOBj1)
        .expect(201)
        .then((res) => {
          expect(res.body.message).to.be.equal(
            'Verification email has been sent, Please verify your email now.',
          );
          expect(res.body.data).to.be.an('string');
          userIdAgainstToValidate = res.body.data;
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('When forgot password: should not verified email, if otp is invalid', (done) => {
      const invalidForgetOBj4 = {
        otp: '7',
      };
      request(app)
        .post(
          `/api/v1/auth/users/${
            userIdAgainstToValidate
          }/`
                              + 'recover/verify',
        )
        .send(invalidForgetOBj4)
        .expect(400)
        .then((res) => {
          expect(res.body.code).to.be.equal('WRONG_OTP');
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0].message).to.be.equal(
            'You have enetered wrong OTP.',
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('When forgot password: should not reset password, if password is invalid', (done) => {
      const invalidForgetOBj3 = {
        password: '7',
      };
      request(app)
        .post(
          `/api/v1/auth/users/${
            userIdAgainstToValidate
          }/`
                              + 'reset',
        )
        .send(invalidForgetOBj3)
        .expect(400)
        .then((res) => {
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0].field).to.include.members([
            'password',
          ]);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('When forgot password: should reset password, if otp was valid', (done) => {
      const validForgetOBj2 = {
        password: '11111111',
      };
      request(app)
        .post(
          `/api/v1/auth/users/${
            userIdAgainstToValidate
          }/`
                              + 'reset',
        )
        .send(validForgetOBj2)
        .expect(200)
        .then((res) => {
          expect(res.body.message).to.be.equal(
            'Password updated Successfully, Please login',
          );
          newPassword = validForgetOBj2.password;
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should not login with previous credentials after forget password. (Change Password)', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send(validLoginObject1)
        .expect(400)
        .then((res) => {
          expect(res.body.code).to.be.equal(
            'INVALID_CREDENTIALS',
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should login with new password credentials after forget password. (Change Password)', (done) => {
      const validLoginObject1 = {
        email: validRegisterObject5.email,
        password: newPassword,
      };
      request(app)
        .post('/api/v1/auth/login')
        .send(validLoginObject1)
        .expect(200)
        .then((res) => {
          expect(res.body.message).to.be.equal(
            'User successfully login',
          );
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data.email).to.be.equal(
            validLoginObject1.email,
          );
          expect(res.body.data).to.have.property(
            'verification_email',
          );
          expect(res.body.data.verification_email).to.be.equal(
            true,
          );
          expect(res.body.data).to.have.property('otp');
          // expect(res.body.data.otp).to.be.equal('');
          expect(res.body.data).to.have.property('password');
          expect(res.body.data.password).to.be.equal('');
          expect(res.body.data).to.have.property('_id');
          expect(res.body.data).to.have.property('avatar');
          expect(res.body.data).to.have.property('username');
          expect(res.body.data).to.have.property('status');
          expect(res.body.data.status).to.be.equal(true);
          token = res.body.token;
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should not get profile info with invalid token', (done) => {
      const validLoginObject1 = {
        email: validRegisterObject5.email,
        password: newPassword,
      };
      request(app)
        .get('/api/v1/auth/user')
        .set('Authorization', 'Bearer ' + 'aaaaaa34664536453a')
        .expect(401)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('resStatus');
          expect(res.body.resStatus).to.be.equal('error');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should get profile info with token', (done) => {
      const validLoginObject1 = {
        email: validRegisterObject5.email,
        password: newPassword,
      };
      request(app)
        .get('/api/v1/auth/user')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data.email).to.be.equal(
            validLoginObject1.email,
          );
          expect(res.body.data).to.have.property('_id');
          expect(res.body.data).to.have.property('avatar');
          expect(res.body.data).to.have.property('username');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should able to update password with token', (done) => {
      const validObj = {
        firstname: 'hello',
        lastname: 'user',
        bio: 'Lorem ipsum tipusl sdgsh  lorem uipsum',
        headline: 'Software Engineer',
        tags: [],
        country: 'India',
      };
      request(app)
        .post(
          `/api/v1/auth/users/${
            userIdAgainstToValidate
          }/update`,
        )
        .set('Authorization', `Bearer ${token}`)
        .send(validObj)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.equal(
            'Profile has been updated',
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});

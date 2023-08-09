const { UserModel } = require('../../models');

class UserSeed {
  constructor() {
    this.UserModel = UserModel;
  }

  async emptySeed() {
    try {
      return await this.UserModel.remove({ email: 'test@mailinator.com' });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async initSeed() {
    await this.emptySeed();
    /* eslint no-console: 0 */
    console.log('CLEARING_SEED_USER_DATA_DONE');
    const data = [
      {
        status: true,
        email: 'test@mailinator.com',
        password: 'test12345678',
        role: 'USER',
        firstname: 'test',
        lastname: 'user',
      },
    ];

    return this.UserModel.create(data)
      .then(() => {
        console.log('SEEDING_USER_DATA_DONE');
      })
      .catch((err) => {
        console.log(err);
        console.log('ERROR_SEEDING_USER_DATA');
      });
  }
}

module.exports = new UserSeed();

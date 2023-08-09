const UserModel = require('./userModel');
const CarouselModel = require('./carouselModel');

const UserModelMethods = new UserModel();
const CarouselModelMethods = new CarouselModel();

const models = {
  UserModelMethods,
  UserModel,
  CarouselModel,
  CarouselModelMethods,
};

module.exports = models;

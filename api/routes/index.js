module.exports = () => {
  const router = require('express').Router();
  router.use('/auth', require('./authRoute')());
  router.use('/carousels', require('./carouselRoute')());

  return router;
};

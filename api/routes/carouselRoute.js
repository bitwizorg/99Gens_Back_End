module.exports = () => {
    const router = require('express').Router();
    const {
    } = require('../validators/');
  
    const { CarouselController } = require('../controllers');
  
    const {
        save,
        get_savedCarousel,
        generateUniqueID
    } = CarouselController;
  
    /** **************************SUMANIX API*********************8 */
  
    /** Register */
    router.post(
      '/save',
      save.bind(CarouselController),
    );

    router.post(
      '/get_saved',
      get_savedCarousel.bind(CarouselController),
    );

    router.post(
      '/generateUniqueID',
      generateUniqueID.bind(CarouselController),
    );
  
    return router;
  };
  
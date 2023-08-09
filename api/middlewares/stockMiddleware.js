const { NSEStockModel } = require('../models');

module.exports = {
  uniqueStock: (req, res, next) => NSEStockModel.findOne(
    { SYMBOL: req.body.SYMBOL, TIMESTAMP: req.body.TIMESTAMP },
    { _id: 1 },
  )
    .then((stockWithDate) => {
      if (!stockWithDate) {
        return next('STOCK_ALREADY_EXIST_WITH_DATE');
      }
      return next();
    })
    .catch(() => next(400)),
};

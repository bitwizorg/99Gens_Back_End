const {
  jwt,
  uniqueEmail,
  uniqueUsername,
  availableEmail,
} = require('../middlewares/authMiddleware');

const middlewares = {
  authMiddleware: jwt,
  availableEmail,
  uniqueEmail,
  uniqueUsername,
};

module.exports = middlewares;

require('dotenv').config();

const {
  PORT, NODE_ENV, MONGODB_URI, MONGODB_TEST_URI,
} = process.env;

module.exports = {
  MONGODB_TEST_URI,
  MONGODB_URI,
  PORT,
  NODE_ENV,
};

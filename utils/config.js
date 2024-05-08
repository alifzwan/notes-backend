// Description
// This module contains the configuration for the application. It is used to store the configuration for the application, such as the port number and the MongoDB URI.
require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}
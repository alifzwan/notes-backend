// Description
// This module contains the logger configuration for the application. It is used to log information and errors to the console.

const info = (...params) => {
    console.log(...params)
  }
  
  const error = (...params) => {
    console.error(...params)
  }
  
  module.exports = {
    info, error
  }
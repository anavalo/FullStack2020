const info = (...params) => {
  if (process.env.NODE_ENV !== 'bbb') {
    console.log(...params)
  }
}
  
  const error = (...params) => {
    console.error(...params)
  }
  
  module.exports = {
    info, error
  }
/**
 * Checks if the value exists
 * @param {Any} value
 * @returns {Boolean}
 */
const isNull = value => {
  return value === null || value === undefined
}

/**
 * Checks if a value is a string with a minimum length
 * @param {Any} value
 * @param {Object} options
 * @param {Integer} options.minLength
 * @param {Boolean} options.trim
 * @returns {Boolean}
 */
const isString = (value, options = {}) => {
  const { minLength = 1, trim = true } = options
  let is = false
  if (typeof value === 'string') {
    if (trim) {
      value = value.trim()
    }
    is = value.length >= minLength
  }
  return is
}

const isEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return re.test(String(email).toLowerCase())
}

module.exports = {
  isString,
  isEmail,
  isNull
}

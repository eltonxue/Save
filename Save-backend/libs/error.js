const errorCodes = {
  MISSING_FULL_NAME: {
    code: 100,
    message: 'Missing full name field'
  },
  MISSING_EMAIL: {
    code: 101,
    message: 'Missing email field'
  },
  MISSING_PASSWORD: {
    code: 102,
    message: 'Missing password field'
  },
  MISSING_CONFIRM_PASSWORD: {
    code: 103,
    message: 'Missing password field'
  },
  INVALID_EMAIL: {
    code: 104,
    message: 'Invalid email'
  },
  PASSWORDS_DO_NOT_MATCH: {
    code: 105,
    message: 'Passwords do not match'
  },
  INVALID_PASSWORD: {
    code: 106,
    message: 'Must be at least 6 characters'
  },
  EMAIL_ALREADY_EXISTS: {
    code: 107,
    message: 'Email already exists'
  },
  JWT_MISSING_HEADER: {
    code: 200,
    message: 'Missing authorization header'
  },
  JWT_INVALID_HEADER: {
    code: 201,
    message: 'Invalid authorization header'
  },
  JWT_INVALID: {
    code: 202,
    message: 'Invalid JWT token'
  },
  JWT_UNAUTHORIZED: {
    code: 203,
    message: 'Token does not belong to a user'
  },
  USER_NOT_FOUND: {
    code: 301,
    message: 'User was not found'
  }
}

module.exports = {
  errorCodes
}

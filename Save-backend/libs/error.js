const errorCodes = {
  MISSING_FIRST_NAME: {
    code: 100,
    message: 'Missing first name field'
  },
  MISSING_LAST_NAME: {
    code: 100,
    message: 'Missing last name field'
  },
  MISSING_EMAIL: {
    code: 100,
    message: 'Missing email field'
  },
  MISSING_PASSWORD: {
    code: 100,
    message: 'Missing password field'
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
};

module.exports = {
  errorCodes
};

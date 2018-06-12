const jwt = require('jsonwebtoken')
const HTTPStatus = require('http-status')

const { errorCodes } = require('../libs/error')

const models = require('../models')
const User = models.users

exports.generateToken = (obj, options = null) => {
  const secret = process.env.JWT_SECRET
  const issuer = process.env.JWT_ISSUER
  const audience = process.env.JWT_AUDIENCE

  const jwtOptions = {
    issuer: issuer,
    audience: audience
  }

  const token = jwt.sign(obj, secret, jwtOptions)
  console.log(token)
  return token
}

/**
 * Authenication for JWTs within a cookie or Authorization header
 */
exports.authenticate = (req, res, next) => {
  const secret = process.env.JWT_SECRET
  const issuer = process.env.JWT_ISSUER
  const audience = process.env.JWT_AUDIENCE

  const jwtOptions = {
    issuer,
    audience
  }

  let mechanism = null
  let token = null
  const authHeader = req.get('Authorization')

  if (req.cookies.jwt) {
    token = req.cookies.jwt
  } else {
    if (!authHeader) {
      res.status(HTTPStatus.BAD_REQUEST).json({
        error: errorCodes.JWT_MISSING_HEADER
      })
      return
    }

    ;[mechanism, token] = authHeader.split(' ')
    if (mechanism !== 'JWT') {
      res.status(HTTPStatus.UNAUTHORIZED).json({
        error: errorCodes.JWT_INVALID_HEADER
      })
      return
    }
  }

  jwt.verify(token, secret, jwtOptions, (err, payload) => {
    if (err) {
      res
        .status(HTTPStatus.UNAUTHORIZED)
        .json({ error: errorCodes.JWT_INVALID })
      return
    }

    User.findOne({
      where: {
        id: payload.id
      }
    })
      .then(user => {
        if (!user) {
          res.status(HTTPStatus.UNAUTHORIZED).json({
            error: errorCodes.JWT_UNAUTHORIZED
          })
          return
        }
        req.user = user
        next()
      })
      .catch(err2 => {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
          error: {
            code: 0,
            message: err2.message
          }
        })
      })
  })
}

// NOTE this mock authenticate will be used for routes that haven't been connected to frontend yet
// this is so Postman can still be used QA new routes
exports.authenticateMock = (req, res, next) => {
  const user = {
    id: 1,
    fullName: 'Bob Jones',
    email: 'a@a.com',
    userType: 'lawyer',
    phoneNumber: '555-555-5555'
  }
  req.user = user
  next()
}

/**
 * Used for logging the user in when they already have a session.
 * If the session is invalid, it will be deleted. If there is no user
 * found to be associated with the session, it is deleted.
 */
exports.hasValidSession = (req, res, next) => {
  const secret = process.env.JWT_SECRET
  const issuer = process.env.JWT_ISSUER
  const audience = process.env.JWT_AUDIENCE
  const cookieName = process.env.JWT_COOKIE_NAME

  if (req.cookies.jwt) {
    const token = req.cookies.jwt
    const jwtOptions = {
      issuer,
      audience
    }

    jwt.verify(token, secret, jwtOptions, (err, payload) => {
      if (err) {
        // Invalid jwt
        res.clearCookie(cookieName)
        res
          .status(HTTPStatus.UNAUTHORIZED)
          .json({ error: errorCodes.JWT_INVALID })
        return
      }

      User.findOne({
        where: { id: payload.id }
      })
        .then(user => {
          if (!user) {
            res.clearCookie(cookieName)
            res
              .status(HTTPStatus.UNAUTHORIZED)
              .json({ error: errorCodes.JWT_UNAUTHORIZED })
            return
          }
          res.status(HTTPStatus.OK).json({ location: '/' })
        })
        .catch(err2 => {
          res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            error: {
              code: 0,
              message: err2.message
            }
          })
        })
    })
    return
  }
  next()
}

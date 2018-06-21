var express = require('express')
var router = express.Router()

const models = require('../models')
const { User } = models

const HTTPStatus = require('http-status')
const { errorCodes } = require('../libs/error')
const jwt = require('../libs/jwt')
const validate = require('../libs/validate')

const cookieName = process.env.JWT_COOKIE_NAME
const maxAge = process.env.JWT_EXPIRES_IN

const emailREGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.post('/login', function(req, res, next) {
  const { email, password, remember } = req.body
  const host = req.get('host')

  if (!validate.isString(email))
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ error: errorCodes.MISSING_EMAIL })
  else if (!validate.isEmail(req.body.email)) {
    res.status(HTTPStatus.BAD_REQUEST).json({ error: errorCodes.INVALID_EMAIL })
  } else if (!validate.isString(password))
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ error: errorCodes.MISSING_PASSWORD })

  User.findOne({ where: { email: email.trim().toLowerCase() } })
    .then(user => {
      if (!user)
        return res
          .status(HTTPStatus.UNAUTHORIZED)
          .json({ error: errorCodes.USER_INVALID_CREDENTIALS })
      else if (!user.comparePassword(password))
        return res
          .status(HTTPStatus.UNAUTHORIZED)
          .json({ error: errorCodes.USER_INVALID_CREDENTIALS })
      else {
        const userObj = user.toJSON()
        const jwtObj = user.toJWTPayload()
        const token = jwt.generateToken(jwtObj)

        userObj.jwt = token

        res.status(HTTPStatus.OK).json({ data: userObj })
      }
    })
    .catch(err => res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(err))
})

router.post('/', function(req, res, next) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!req.body.fullName) {
    res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ error: errorCodes.MISSING_FULL_NAME })
  } else if (!req.body.email) {
    res.status(HTTPStatus.BAD_REQUEST).json({ error: errorCodes.MISSING_EMAIL })
  } else if (!req.body.password) {
    res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ error: errorCodes.MISSING_PASSWORD })
  } else if (!validate.isEmail(req.body.email)) {
    res.status(HTTPStatus.BAD_REQUEST).json({ error: errorCodes.INVALID_EMAIL })
  } else if (!req.body.confirmPassword) {
    res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ error: errorCodes.MISSING_CONFIRM_PASSWORD })
  } else if (req.body.password !== req.body.confirmPassword) {
    res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ error: errorCodes.PASSWORDS_DO_NOT_MATCH })
  } else if (req.body.password.length < 6) {
    res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ error: errorCodes.INVALID_PASSWORD })
  } else {
    User.findOne({ where: { email: req.body.email.toLowerCase() } })
      .then(user => {
        if (!user) {
          User.create({
            fullName: req.body.fullName,
            email: req.body.email.toLowerCase(),
            password: req.body.password
          })
            .then(user => {
              const userObj = user.toJSON()
              const jwtObj = user.toJWTPayload()
              const token = jwt.generateToken(jwtObj)

              userObj.jwt = token

              res.status(HTTPStatus.OK).json({ data: userObj })
            })
            .catch(err => res.status(HTTPStatus.BAD_REQUEST).json(err))
        } else {
          res
            .status(HTTPStatus.BAD_REQUEST)
            .json({ error: errorCodes.EMAIL_ALREADY_EXISTS })
        }
      })
      .catch(err => res.status(HTTPStatus.BAD_REQUEST).json(err))
  }
})

module.exports = router

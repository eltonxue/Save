var express = require('express');
var router = express.Router();

const models = require('../models');
const { User } = models;

const HTTPStatus = require('http-status');
const { errorCodes } = require('../libs/error');
const jwt = require('../libs/jwt');
const validate = require('../libs/validate');

const cookieName = process.env.JWT_COOKIE_NAME;
const maxAge = process.env.JWT_EXPIRES_IN;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  const { email, password, remember } = req.body;
  const host = req.get('host');

  if (!validate.isString(email))
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ error: errorCodes.MISSING_EMAIL });
  if (!validate.isString(password))
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ error: errorCodes.MISSING_PASSWORD });

  User.findOne({ where: { email: email.trim().toLowerCase() } })
    .then(user => {
      if (!user)
        return res
          .status(HTTPStatus.NOT_FOUND)
          .json({ error: errorCodes.USER_NOT_FOUND });

      // if (!user.comparePassword(password))
      //   return res
      //     .status(HTTPStatus.UNAUTHORIZED)
      //     .json({ error: errorCodes.USER_INVALID_CREDENTIALS });

      const userObj = user.toJSON();
      const jwtObj = user.toJWTPayload();
      const token = jwt.generateToken(jwtObj);

      userObj.jwt = token;

      res.cookie(cookieName, token, { maxAge });

      res.status(HTTPStatus.OK).json({ data: userObj });
    })
    .catch(err => res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(err));
});

router.post('/register', function(req, res, next) {
  if (!req.body.firstName) {
    res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ error: errorCodes.MISSING_FIRST_NAME });
  } else if (!req.body.lastName) {
    res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ error: errorCodes.MISSING_LAST_NAME });
  } else if (!req.body.email) {
    res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ error: errorCodes.MISSING_EMAIL });
  } else if (!req.body.password) {
    res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ error: errorCodes.MISSING_PASSWORD });
  } else {
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        const userObj = user.toJSON();
        const jwtObj = user.toJWTPayload();
        const token = jwt.generateToken(jwtObj);

        userObj.jwt = token;

        res.status(HTTPStatus.OK).json({ data: userObj });
      })
      .catch(err => res.status(HTTPStatus.BAD_REQUEST).json(err));
  }
});

module.exports = router;

const passwordUtils = require('../libs/password')

module.exports = (sequelize, Sequelize) => {
  var User = sequelize.define(
    'User',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fullName: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      password: {
        type: Sequelize.STRING(72),

        set(val) {
          this.setDataValue('password', passwordUtils.hashPassword(val))
        }
      }
    },
    {}
  )
  User.associate = function(models) {
    // associations can be defined here
  }

  User.prototype.comparePassword = function(password) {
    const that = this
    return passwordUtils.comparePassword(password.trim(), that.password)
  }

  User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get())
    delete values.password
    return values
  }

  User.prototype.toJWTPayload = function() {
    const user = this.get()
    return {
      id: user.id,
      email: user.email
    }
  }
  return User
}

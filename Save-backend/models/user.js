'use strict'
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User',
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  )
  User.associate = function(models) {
    // associations can be defined here
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

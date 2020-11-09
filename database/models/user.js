'use strict';
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Event, { foreignKey: 'user_id', as: 'event' });
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Informe seu nome'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Informe seu e-mail'
        },
        isEmail: {
          msg: 'Informe um e-mail válido'
        }
      }
    },
    encryptedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Informe sua senha'
        },
        len: {
          args: [5, 10],
          msg: 'A senha deve conter entre 5 e 10 caracteres'
        }
      }
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM(['admin', 'manager'])
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        console.log('salt = ' + salt);
        console.log('user.encryptedPassword = ' + user.encryptedPassword);
        user.encryptedPassword = bcrypt.hashSync(user.encryptedPassword, salt);
      }
    }
  });
  return User;
};

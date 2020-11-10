'use strict';
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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
      set(value) {
        if (value) {
          const salt = bcrypt.genSaltSync();
          const passwordHash = bcrypt.hashSync(value, salt);
          this.setDataValue('encryptedPassword', passwordHash);
        }
      },
      // allowNull: false,
      // validate: {
      //   notNull: {
      //     msg: 'Informe sua senha'
      //   },
      //   len: {
      //     args: [5, 10],
      //     msg: 'A senha deve conter entre 5 e 10 caracteres'
      //   }
      // }
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM('admin', 'manager')
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

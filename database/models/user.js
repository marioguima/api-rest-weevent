'use strict';
const bcrypt = require('bcrypt');

// const timezone = 'American/Sao_Paulo';
// const moment = require('moment').tz.setDefault(timezone);
const moment = require('moment');



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
    // createdDate: {
    //   type: DataTypes.VIRTUAL,
    //   // get: function () {
    //   //   const data = this.getDataValue('createdAt')
    //   //   // return moment.utc(data).format('L LTS')
    //   //   return moment.utc(data).format('L LTS')
    //   //   // return moment.utc(this.getDataValue('createdAt')).format('YYYY-MM-DD')
    //   // }
    // },
    // CreateTime: {
    //   type: DataTypes.TIME,
    //   get: function () {
    //     let time = this.getDataValue('createdAt')

    //     if (moment(time, moment.ISO_8601, true).isValid()) {
    //       return moment(this.getDataValue('createdAt')).format('HH:mm:ss')
    //     } else {
    //       return time
    //     }
    //   }
    // }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

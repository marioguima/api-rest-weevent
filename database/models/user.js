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
    password: {
      type: DataTypes.VIRTUAL
    },
    encryptedPassword: {
      type: DataTypes.STRING,
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
      type: DataTypes.ENUM(['admin', 'manager'])
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeUpdate: (user) => {
        console.log('user');
        console.log(user);
        if (user.password) {
          const salt = bcrypt.genSaltSync();
          user.encryptedPassword = bcrypt.hashSync(user.password, salt);
          // user.encryptedPassword = await bcrypt.hash(user.password, 8);
        }
      },
      // beforeSave: (userParms) => {
      //   const salt = bcrypt.genSaltSync();
      //   userParms.encryptedPassword = bcrypt.hashSync(userParms.password, salt);
      // },
      // beforeCreate: (user) => {
      //   const salt = bcrypt.genSaltSync();
      //   user.encryptedPassword = bcrypt.hashSync(user.encryptedPassword, salt);
      // },
      // beforeUpdate: (user) => {
      //   if (user.encryptedPassword != undefined && user.encryptedPassword != "") {
      //     const salt = bcrypt.genSaltSync();
      //     user.encryptedPassword = bcrypt.hashSync(user.encryptedPassword, salt);
      //   }
      // }
    }
  });
  return User;
};

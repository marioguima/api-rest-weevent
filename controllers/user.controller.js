const db = require('../database/models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: "24h",
    });
}
module.exports = {
    async login(req, res) {
        try {
            // const { email, password, islogged } = req.body;
            const { email, password } = req.body;

            const user = await db.User.findOne({
                where: {
                    email
                }
            });

            if (!user) {
                return res.status(400).send({
                    status: 0,
                    message: 'Incorrect email or password'
                })
            }

            if (!bcrypt.compareSync(password, user.encryptedPassword)) {
                return res.status(400).send({
                    status: 0,
                    message: 'Incorrect email or password'
                })
            }

            // const user_id = user.id;

            // await db.User.update({
            //     islogged
            // }, {
            //     where: {
            //         id: user_id
            //     }
            // })

            // user.encryptedPassword = undefined;

            const token = generateToken({ id: user.id });

            // remover as colunas que não devem ser enviadas na resposta
            delete user.dataValues.password;
            delete user.dataValues.role;
            delete user.dataValues.encryptedPassword;

            return res.status(200).send({
                status: 1,
                message: 'Login successfully',
                user: user,
                token: token
            });

        } catch (err) {
            return res.status(400).json({
                status: 0,
                error: err
            });
        }
    },

    async index(req, res) {
        try {

            const users = await db.User.findAll({
                attributes: ['id', 'name', 'email']
            });

            if (users == "" || users == null) {
                return res.status(404).send({
                    status: 0,
                    message: "No users found"
                });
            }

            return res.status(200).send({
                status: 1,
                message: 'List of users',
                users: users
            });

        } catch (err) {
            return res.status(400).json({
                status: 0,
                error: err
            });
        }
    },

    async store(req, res) {

        try {

            const userParams = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: 'manager'
            };

            await db.User.create(
                userParams
            ).then(function (user) {
                // remover as colunas que não devem ser enviadas na resposta
                delete user.dataValues.password;
                delete user.dataValues.role;
                delete user.dataValues.updatedAt;
                delete user.dataValues.encryptedPassword;

                const token = generateToken({ id: user.id });
                return res.status(201).send({
                    status: 1,
                    message: 'User successfully added',
                    user: user,
                    token: token
                });
            });

            // // const user = await db.User.create({ name, email, encryptedPassword });

            // const user = await db.User.create(userParams);

            // const token = generateToken({ id: user.id });

            // // user.password = undefined;
            // // user.encryptedPassword = undefined;
            // // user.role = undefined;

            // return res.status(201).send({
            //     status: 1,
            //     message: 'User successfully added',
            //     user: user,
            //     token: token
            // });

        } catch (err) {
            return res.status(400).json({
                status: 0,
                error: err
            });
        }

    },

    async update(req, res, next) {

        try {

            const userParams = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            };
            const { user_id } = req.params;

            await db.User.update(userParams, {
                where: {
                    id: user_id
                }
            }).then((linesUpdated) => {
                if (linesUpdated > 0) {
                    return db.User.findOne({ where: { id: user_id } })
                } else {
                    throw ('User not find');
                }
            }).then(function (user) {
                // remover as colunas que não devem ser enviadas na resposta
                // delete user.dataValues.password;
                // delete user.dataValues.role;
                // delete user.dataValues.encryptedPassword;

                res.status(200).send({
                    status: 1,
                    message: 'User updated successfully',
                    user: user
                })
                // }).catch(next);
            }).catch((err) => {
                return res.status(400).json({
                    status: 0,
                    message: err
                });
            });

        } catch (err) {
            return res.status(400).json({
                status: 0,
                error: err
            });
        }

    },

    async delete(req, res) {

        try {

            const { user_id } = req.params;

            await db.User.destroy({
                where: {
                    id: user_id
                }
            });

            return res.status(200).send({
                status: 1,
                message: 'User successfully deleted'
            });

        } catch (err) {
            return res.status(400).json({
                status: 0,
                error: err
            });
        }

    },

    // Retorna um usuário
    // async show(req, res) {
    //     const { email, password, islogged } = req.body;

    //     const user = await db.User.findOne({
    //         where: {
    //             email
    //         }
    //     });

    //     return res.status(200).send({
    //         status: 1,
    //         message: 'usuário logado com sucesso!',
    //         user
    //     });
    // },
}
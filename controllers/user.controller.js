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

        user.encryptedPassword = undefined;

        const token = generateToken({ id: user.id });

        return res.status(200).send({
            status: 1,
            message: 'Login successfully',
            user: user,
            token: token
        });
    },

    async index(req, res) {

        const users = await db.User.findAll();

        if (users == "" || users == null) {
            return res.status(404).send({
                message: "No users found"
            });
        }

        return res.status(200).send({
            message: 'List of users',
            users: users
        });

    },

    async store(req, res) {

        const userParams = {
            name: req.body.name,
            email: req.body.email,
            encryptedPassword: req.body.password,
            role: 'manager'
        };

        // const user = await db.User.create({ name, email, encryptedPassword });
        const user = await db.User.create(userParams);


        const token = generateToken({ id: user.id });

        return res.status(201).send({
            status: 1,
            message: 'User successfully registered',
            user: user,
            token: token
        });

    },

    async update(req, res) {

        const { user_id, name, email, password } = req.body;
        // const { user_id } = req.params;

        await db.User.update({
            name,
            email,
            password
        }, {
            where: {
                id: user_id
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'User updated successfully'
        });

    },

    async delete(req, res) {

        const { user_id } = req.body;

        await db.User.destroy({
            where: {
                id: user_id
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'User successfully deleted'
        });

    },

    // async list(req, res) {
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
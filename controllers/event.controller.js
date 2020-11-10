const db = require('../database/models/index');

module.exports = {
    async index(req, res) {
        try {
            const { user_id } = req.params;

            const user = await db.User.findByPk(user_id, {
                include: { association: 'event' }
            });

            if (!user) {
                return res.status(400).send({
                    status: 0,
                    message: "Eventos não encontrado!"
                });
            }

            return res.status(200).send(user.event);

        } catch (err) {
            return res.status(400).json({ error: err });
        }

    },

    async store(req, res) {
        try {

            const { user_id } = req.params;
            const { title, shortDescription, longDescription, image } = req.body;

            const user = await db.User.findByPk(user_id);

            if (!user) {
                return res.status(400).send({
                    status: 0,
                    message: "Usuário não encontrado!"
                });
            }

            const event = await db.Event.create({
                title,
                shortDescription,
                longDescription,
                image
            });

            return res.status(200).json({
                status: 1,
                message: 'Evento cadastrado com sucesso',
                event
            });

        } catch (err) {
            return res.status(400).json({ error: err });
        }

    },

    async update(req, res) {

        try {

            const { name, email, password } = req.body;
            const { user_id } = req.params;

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
                message: 'usuário atualizado com sucesso'
            });

        } catch (err) {
            return res.status(400).json({ error: err });
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
                message: 'usuário excluído com sucesso'
            });

        } catch (err) {
            return res.status(400).json({ error: err });
        }

    }
}
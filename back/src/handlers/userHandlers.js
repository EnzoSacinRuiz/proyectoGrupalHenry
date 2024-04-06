const { User, Activity, Indumentary, Fitness } = require('../db.js');

const getUsers = async (req, res) => {
    const { username, ID, email } = req.query;
    if (username) {
        try {
            const coincidence = await User.findOne({
                where: { username },
                include: [
                    {
                        model: Activity,
                        as: 'Activities',
                        attributes: ["id", "name", "objective"],
                        through: { attributes: [] }
                    },
                    {
                        model: Indumentary,
                        as: 'Indumentaries',
                        attributes: ["id", "name", "type"],
                        through: { attributes: [] }
                    },
                    {
                        model: Fitness,
                        as: 'Fitnesses',
                        attributes: ["id", "name"],
                        through: { attributes: [] }
                    }
                ]
            });
            coincidence
                ? res.status(200).json(coincidence)
                : res.status(404).json({ NotFound: `Username ${username} not found` });
        }
        catch (error) {
            res.status(500).json({ error_getByName: error.message });
        }
    }
    else {
        if (ID) {
            try {
                const userById = await User.findByPk(ID,
                    {
                        include: [
                            {
                                model: Activity,
                                as: 'Activities',
                                attributes: ["id", "name", "objective"],
                                through: { attributes: [] }
                            },
                            {
                                model: Indumentary,
                                as: 'Indumentaries',
                                attributes: ["id", "name", "type"],
                                through: { attributes: [] }
                            },
                            {
                                model: Fitness,
                                as: 'Fitnesses',
                                attributes: ["id", "name"],
                                through: { attributes: [] }
                            }
                        ]
                    });
                res.status(200).json(userById);
            }
            catch (error) {
                res.status(500).json({ error_getById: error.message })
            }
        }
        else {
            if (email) {
                const coincidence = await User.findOne({
                    where: {email},
                    include: [
                        {
                            model: Activity,
                            as: 'Activities',
                            attributes: ["id", "name", "objective"],
                            through: { attributes: [] }
                        },
                        {
                            model: Indumentary,
                            as: 'Indumentaries',
                            attributes: ["id", "name", "type"],
                            through: { attributes: [] }
                        },
                        {
                            model: Fitness,
                            as: 'Fitnesses',
                            attributes: ["id", "name"],
                            through: { attributes: [] }
                        }
                    ]
                });
                coincidence
                    ? res.status(200).json(coincidence)
                    : res.status(404).json({ NotFound: `Email ${email} not found` });
            } else {
                try {
                    const usuarios = await User.findAll();
                    res.status(200).json(usuarios)
                }
                catch (error) {
                    res.status(500).json({ error_getUsers: error.message });
                }
            }
        }
    }
}

const postUser = async (req, res) => {
    const newUserData = req.body;
    try {
        const newUser = await User.create(newUserData);
        res.status(200).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error_postUser: error.message });
    }
}

module.exports = { getUsers, postUser };
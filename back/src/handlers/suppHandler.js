const { User, Supplements, SuppsBought } = require('../db.js');
const { Op } = require('sequelize');

const getSupps = async (req, res) => {
    const { name } = req.query;
    if (name) {
        try {
            const supInfo = await Supplements.findAll({
                where: {
                    name: { [Op.iLike]: `%${name}%` },
                }
            });

            res.status(200).json(supInfo)
        }

        catch (error) {

            res.status(500).json({ error_getSuppByName: error.message });

        }
    }
    else {
        try {
            const allSupps = await Supplements.findAll();
            allSupps.length > 0
                ? res.status(200).json(allSupps)
                : res.status(404).json({ message: 'No supplements found' });
        }
        catch (error) {
            res.status(500).json({ error_getAllSupps: error.message });
        }
    }
}

const addSupp = async (req, res) => {
    const data = req.body;

    try {
        const newSupp = await Supplements.create(data);
        res.status(200).json(newSupp);
    }
    catch (error) {
        res.status(500).json({ error_addSupp: error.message });
    }
}

const deleteSupp = async (req, res) => {
    const { ID } = req.query;

    if (ID) {
        try {
            const updatedSupp = await Supplements.update(
                { isActive: false },
                {
                    where: {
                        id: ID,
                        isActive: true
                    }
                }
            );

            if (updatedSupp[0] !== 0) {
                res.status(200).json({ message: `Supplement with ID ${ID} is now inactive` });
            } else {
                res.status(404).json({ message: `Supplement with ID ${ID} not found or already inactive` });
            }
        } catch (error) {
            res.status(500).json({ error_updateSupp: error.message });
        }
    } else {
        res.status(400).json({ message: 'Please provide a valid ID for the supplement' });
    }
}

const updateSupp = async (req, res) => {
    const { ID } = req.params;
    const dataToUpdate = req.body;

    try {
        const updatedSupp = await Supplements.update(
            dataToUpdate,
            {
                where: {
                    id: ID,
                    isActive: true
                },
                returning: true
            }
        );

        if (updatedSupp[0] !== 0) {
            const [numOfRowsUpdated, [updatedSupplement]] = updatedSupp;
            res.status(200).json({ message: `Supplement with ID ${ID} updated successfully`, updatedSupplement });
        } else {
            res.status(404).json({ message: `Supplement with ID ${ID} not found or already inactive` });
        }
    } catch (error) {
        res.status(500).json({ error_updateSupp: error.message });
    }
}


const getSuppsByID = async (req, res) => {
    const { ID } = req.params;

    try {
        const thisSupp = await Supplements.findByPk(ID, {
            include: [{
                model: User,
                as: 'Users',
                attributes: ["id", "name", "username"],
                through: { attributes: [] }
            }]
        });

        thisSupp
            ? res.status(200).json(thisSupp)
            : res.status(404).json({ message: `Supplement with ID ${ID} not found` });
    } catch (error) {
        res.status(500).json({ error_getSuppByID: error.message });
    }
}


module.exports = { getSupps, addSupp, deleteSupp, updateSupp, getSuppsByID };
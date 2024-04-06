const { Indumentary, User } = require('../db.js');

const getShoes = async (req, res) =>
{
    const { ID } = req.query;
    if(ID)
    {
        try
        {
            const thisShoe = await Indumentary.findByPk( ID,
                {
                    include: [
                        {
                            model: User,
                            as: 'Users',
                            attributes: [ "id", "name", "username" ],
                            through: { attributes: [] }
                        }
                    ]
                } );
            thisShoe.name
            ?res.status(200).json( thisShoe )
            :res.status(404).json( { message: `Shoe id ${ID} not found`});
        }
        catch(error)
        {
            res.status(500).json( { error_getShoeById: error.message } );
        }
    }
    else
    {
        try
        {
            const allShoes = await Indumentary.findAll( { where: { type: 'Shoe' } } );
            allShoes.length>0
            ?res.status(200).json( allShoes )
            :res.status(404).json( { message: 'No shoes found' } );
        }
        catch(error)
        {
            res.status(500).json( { error_getAllShoes: error.message } );
        }
    }
}

const addShoe = async (req, res) =>
{
    const data = req.body;
    try
    {
        const newShoe = await Indumentary.create( data );
        res.status(200).json( newShoe );
    }
    catch(error)
    {
        res.status(500).json( { error_addShoe: error.message } );
    }
}

const updateShoe = async (req, res) =>
{
    const { id, form } = req.body;
    try
    {
        const { data } = await Indumentary.update(form, {where: { id }});
        res.status(200).json( { message: `zapato id ${id} actualizada` } );
    }
    catch(error)
    {
        res.status(500).json( { error_updateShoe: error.message } );
    }
}

module.exports = { getShoes, addShoe, updateShoe };
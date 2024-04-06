const { Indumentary, User } = require('../db.js');

const getShirts = async (req, res) =>
{
    const { ID } = req.query;
    if(ID)
    {
        try
        {
            const thisShirt = await Indumentary.findByPk( ID,
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
                thisShirt.name
            ?res.status(200).json( thisShirt )
            :res.status(404).json( { message: `Shirt id ${ID} not found`});
        }
        catch(error)
        {
            res.status(500).json( { error_getShirtById: error.message } );
        }
    }
    else
    {
        try
        {
            const allShirts = await Indumentary.findAll( { where: { type: 'Shirt' } } );
            allShirts.length>0
            ?res.status(200).json( allShirts )
            :res.status(404).json( { message: 'No shirts found' } );
        }
        catch(error)
        {
            res.status(500).json( { error_getAllShirts: error.message } );
        }
    }
}

const addShirt = async (req, res) =>
{
    const data = req.body;
    try
    {
        const newShirt = await Indumentary.create( data );
        res.status(200).json( newShirt );
    }
    catch(error)
    {
        res.status(500).json( { error_addShirt: error.message } );
    }
}

const deleteShirt = async (req, res) =>
{
    const { ID, disable } = req.body;
    if(ID)
    {
        try
        {
            const deletedShirt = await Indumentary.destroy( { where: { ID } } );
            deletedShirt
            ? res.status(200).json( { shirtID: ID, status: 'Deleted' } )
            : res.status(404).json( { error: `Shirt ID ${ID} not found` } );
        }
        catch(error)
        {
            res.status(500).json( { error_deleteShirtID: error.message } );
        }
    }
    else
    {
        if(disable)
        {
            // aosifdasf
            console.log("Hola");
        }
    }
}

const updateShirt = async (req, res) =>
{
    const { id, form } = req.body;
    try
    {
        const { data } = await Indumentary.update(form, {where: { id }});
        res.status(200).json( { message: `prenda id ${id} actualizada` } );
    }
    catch(error)
    {
        res.status(500).json( { error_updateShirt: error.message } );
    }
}

module.exports = { getShirts, addShirt, deleteShirt, updateShirt };
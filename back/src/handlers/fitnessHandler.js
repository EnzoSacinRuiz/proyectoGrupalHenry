const { Fitness, User } = require('../db.js');

const getFitness = async (req, res) =>
{
    const { ID } = req.query;
    if(ID)
    {
        try
        {
            const thisFitness = await Fitness.findByPk( ID,
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
                thisFitness.name
            ?res.status(200).json( thisFitness )
            :res.status(404).json( { message: `Fitness id ${ID} not found`});
        }
        catch(error)
        {
            res.status(500).json( { error_getFitnessById: error.message } );
        }
    }
    else
    {
        try
        {
            const allFitness = await Fitness.findAll();
            allFitness.length>0
            ?res.status(200).json( allFitness )
            :res.status(404).json( { message: 'No fitness item found' } );
        }
        catch(error)
        {
            res.status(500).json( { error_getAllFitness: error.message } );
        }
    }
}

const addFitness = async (req, res) =>
{
    const data = req.body;
    try
    {
        const newFitness = await Fitness.create( data );
        res.status(200).json( newFitness );
    }
    catch(error)
    {
        res.status(500).json( { error_addFitness: error.message } );
    }
}

const updateFit = async (req, res) =>
{
    const { id, form } = req.body;
    try
    {
        const { data } = await Fitness.update(form, {where: { id }});
        res.status(200).json( { message: `Fit id ${id} actualizada` } );
    }
    catch(error)
    {
        res.status(500).json( { error_updateFit: error.message } );
    }
}

module.exports = { getFitness, addFitness, updateFit };
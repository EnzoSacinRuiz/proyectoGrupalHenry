const { Activity, User } = require('../db.js');

const getActivity = async (req, res) =>
{
    const { ID, name } = req.query;
    if(ID)
    {
        try
        {
            const activityById = await Activity.findByPk(ID,
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
            res.status(200).json( activityById );
        }
        catch(error)
        {
            res.status(500).json( { getActivityById: error.message } );
        }
    }
    else
    {
        if(name)
        {
            const activityByName = await Activity.findOne( { where: { name },
                    include: [
                        {
                            model: User,
                            as: 'Users',
                            attributes: [ "id", "name", "username" ],
                            through: { attributes: [] }
                        }
                    ]
                } ); //falta relación
            res.status(200).json( activityByName );
        }
        else
        {
            try
            {
                const allActivities = await Activity.findAll();
                res.status(200).json( allActivities );
            }
            catch(error)
            {
                res.status(500).json( { error_getActivities: error.message } );
            }
        }
    }
}

const postActivity = async (req, res) =>
{
    const { name, gender, objective, w2m, focalizedArea, weeklyFrequency, sessionIntensity, description } = req.body;
    try
    {
        const activityPrefab = { name, gender, objective, w2m, focalizedArea, weeklyFrequency, sessionIntensity, description };
        const newActivity = await Activity.create( activityPrefab );
        res.status(200).json( { ActividadCreada: newActivity } );
    }
    catch(error)
    {
        res.status(500).json( { error_postActivity: error.message } );
    }
}

module.exports = { getActivity, postActivity };
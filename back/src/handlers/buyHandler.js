const { User, Activity, Supplements, Indumentary, Fitness
    ,ActivePlans, SuppsBought, IndumentaryBought, FitnessBought } = require('../db.js');

const addBuy = async (req, res) =>
{
    const { userId, activityId, suppId, indumentaryId, fitnessId } = req.body;
    /*
        Desde el carrito nos llega el ID de todo lo que tiene agregado el usuario, al confirmarse
        el pago se hace la relación correspondiente.
    */
    try
    {
        const thisUser = await User.findByPk( userId );
        if(activityId)
        {
            let allActivities = [];
            activityId.map( activity => thisUser.addActivity( activity )  );
            activityId.map( async ( x ) => { let y = await Activity.findByPk( x ); allActivities.push( y ); })
        }
        if(suppId)
        {
            let allSupps = [];
            suppId.map( supplement => thisUser.addSupplements( supplement )  );
            suppId.map( async ( x ) => { let y = await Supplements.findByPk( x ); allSupps.push( y ); })
        }
        if(indumentaryId)
        {
            let allIndumentary = [];
            indumentaryId.map( Item => thisUser.addIndumentary( Item )  );
            indumentaryId.map( async ( x ) => { let y = await Indumentary.findByPk( x ); allIndumentary.push( y ); })
        }
        if(fitnessId)
        {
            let allFitness = [];
            fitnessId.map( Fitness => thisUser.addFitness( Fitness )  );
            fitnessId.map( async ( x ) => { let y = await Fitness.findByPk( x ); allFitness.push( y ); })
        }
        res.status(200).json( { Usuario: thisUser.name, Message: 'ITEMS relacionados satisfactoriamente' } )
    }
    catch(error)
    {
        res.status(500).json( { error_addBuy: error.message } )
    }
}

const getBought = async (req, res) =>
{
    const { activities, supplements, shoes, shirts, fitness } = req.query; // ...?activities=true ...?supplemnts=true
    if(activities)
    {
        try
        {
            // Trayendo actividades compradas
            const bought = await ActivePlans.findAll();
            let activePlansIds = [];
            bought.map( relation => { activePlansIds.push(relation.ActivityId); activePlansIds=[...new Set( activePlansIds ) ]; } );
            let activePlans = [];
            for(let i=0; i<activePlansIds.length; i++)
            {
                let thisOne = await Activity.findByPk( activePlansIds[i],
                    {
                        include:
                        {
                            model: User,
                            as: 'Users',
                            attributes: [ "id", "name", "username" ],
                            through: { attributes: [] }
                        }
                    } );
                    activePlans.push( thisOne );
            }
            res.status(200).json( activePlans );
        }
        catch(error)
        {
           res.status(500).json( { error_getBoughtActivities: error.message } );
        }
    }
    else
    {
        if(supplements)
        {
            try
            {
                // Trayendo suplementos comprados
                const bought = await IndumentaryBought.findAll();
                let boughtSuppsIds = [];
                bought.map( relation => { boughtSuppsIds.push(relation.SupplementId); boughtSuppsIds=[...new Set( boughtSuppsIds ) ]; } );
                let boughtSupps = [];
                for(let i=0; i<boughtSuppsIds.length; i++)
                {
                    let thisOne = await Supplements.findByPk( boughtSuppsIds[i],
                        {
                            include:
                            {
                                model: User,
                                as: 'Users',
                                attributes: [ "id", "name", "username" ],
                                through: { attributes: [] }
                            }
                        } );
                        boughtSupps.push( thisOne );
                }
                boughtSupps==0
                ?res.status(404).json( { message: 'No se encontraron coincidencias' } )
                :res.status(200).json( boughtSupps );
            }
            catch(error)
            {
               res.status(500).json( { error_getBoughtSupplements: error.message } );
            }
        }
        else
        {
            if(shoes)
            {
                try
                {
                    // Trayendo zapatos comprados
                    const bought = await IndumentaryBoughtght.findAll( { where: { type: 'Shoe' } } );
                    let boughtShoesIds = [];
                    bought.map( relation => { boughtShoesIds.push(relation.IndumentaryId); boughtShoesIds=[...new Set( boughtShoesIds ) ]; } );
                    let boughtShoes = [];
                    for(let i=0; i<boughtShoesIds.length; i++)
                    {
                        let thisOne = await Indumentary.findByPk( boughtShoesIds[i],
                            {
                                include:
                                {
                                    model: User,
                                    as: 'Users',
                                    attributes: [ "id", "name", "username" ],
                                    through: { attributes: [] }
                                }
                            } );
                            boughtShoes.push( thisOne );
                    }
                    boughtShoes==0
                    ?res.status(404).json( { message: 'No se encontraron coincidencias' } )
                    :res.status(200).json( boughtShoes );
                }
                catch(error)
                {
                    res.status(500).json( { error_getBoughtShoes: error.message } );
                }
            }
            else
            {
                if(shirts)
                {
                    try
                    {
                        // Trayendo remeras compradas
                        const bought = await IndumentaryBoughtght.findAll( { where: { type: 'Shoe' } } );
                        let boughtShirtsIds = [];
                        bought.map( relation => { boughtShirtsIds.push(relation.IndumentaryId); boughtShirtsIds=[...new Set( boughtShirtsIds ) ]; } );
                        let boughtShirts = [];
                        for(let i=0; i<boughtShirtsIds.length; i++)
                        {
                            let thisOne = await Indumentary.findByPk( boughtShirtsIds[i],
                                {
                                    include:
                                    {
                                        model: User,
                                        as: 'Users',
                                        attributes: [ "id", "name", "username" ],
                                        through: { attributes: [] }
                                    }
                                } );
                                boughtShirts.push( thisOne );
                        }
                        boughtShirts==0
                        ?res.status(404).json( { message: 'No se encontraron coincidencias' } )
                        :res.status(200).json( boughtShirts );
                    }
                    catch(error)
                    {
                        res.status(500).json( { error_getBoughtShirts: error.message } );
                    }
                }
                else
                {
                    if(fitness)
                    {
                        try
                        {
                            // Trayendo fitness compradas
                            const bought = await FitnessBought.findAll();
                            let boughtFitIds = [];
                            bought.map( relation => { boughtFitIds.push(relation.FitnessId); boughtFitIds=[...new Set( boughtFitIds ) ]; } );
                            let boughtFit = [];
                            for(let i=0; i<boughtFitIds.length; i++)
                            {
                                let thisOne = await Fitness.findByPk( boughtFitIds[i],
                                    {
                                        include:
                                        {
                                            model: User,
                                            as: 'Users',
                                            attributes: [ "id", "name", "username" ],
                                            through: { attributes: [] }
                                        }
                                    } );
                                    boughtFit.push( thisOne );
                            }
                            boughtFit==0
                            ?res.status(404).json( { message: 'No se encontraron coincidencias' } )
                            :res.status(200).json( boughtFit );
                        }
                        catch(error)
                        {
                            res.status(500).json( { error_getBoughtFitness: error.message } );
                        }
                    }
                    else
                    {
                        try
                        {
                            const plansBought = await ActivePlans.findAll();
                            const suppsBought = await SuppsBought.findAll();
                            const indumentaryBought = await IndumentaryBought.findAll();
                            const fitnessBought = await FitnessBought.findAll();
                            const allOfThem = [...plansBought, ...suppsBought, ...indumentaryBought, ...fitnessBought ];
                            res.status(200).json(allOfThem);
                        }
                        catch(error)
                        {
                            res.status(500).json( { error_getThemAll: error.message } );
                        }
                    }
                }
            }
            
        }
    }
}

module.exports = { addBuy, getBought };
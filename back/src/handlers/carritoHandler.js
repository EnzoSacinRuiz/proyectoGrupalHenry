const { User, Carrito } = require('../db.js');

const addCarrito = async (req, res) =>
{
    const { carritoId, id, type, price, img, name, quantity } = req.body;

    try
    {
        if(carritoId)
        {
            try
            {
                const {dataValues} = await Carrito.findByPk( carritoId );
                if(type=="suppId" && ( dataValues.suppId?.length>0 && dataValues.suppId!=null ) )
                {
                    let newSupps = [];
                    let repeated = [1];
                    dataValues.suppId.map( x => {
                        let thisOne = JSON.parse(x);
                        thisOne.id == id
                        ? (newSupps.push( { ... thisOne, quantity: thisOne.quantity + quantity } ), repeated.push(1) )
                        : newSupps.push( thisOne );
                    } );
                    repeated.length==1 && newSupps.push( { id, name, img, price, quantity } );
                    await Carrito.update( { ...dataValues, suppId: newSupps }, { where: { id: carritoId } } );
                }
                if(type=="suppId" && !dataValues.suppId) await Carrito.update( { ...dataValues, suppId: [ { id, name, img, price, quantity } ] }, { where: { id: carritoId } } );

                if(type=="indId" && ( dataValues.indId?.length>0 && dataValues.indId!=null ) )
                {
                    let newInd = [];
                    let repeated = [1];
                    dataValues.indId.map( x => {
                        let thisOne = JSON.parse(x);
                        thisOne.id == id
                        ? (newInd.push( { ... thisOne, quantity: thisOne.quantity + quantity } ), repeated.push(1) )
                        : newInd.push( thisOne );
                    } );
                    repeated.length==1 && newInd.push( { id, name, img, price, quantity } );
                    await Carrito.update( { ...dataValues, indId: newInd }, { where: { id: carritoId } } );
                }
                if(type=="indId" && !dataValues.indId) await Carrito.update( { ...dataValues, indId: [ { id, name, img, price, quantity } ] }, { where: { id: carritoId } } );

                if(type=="fitId" && ( dataValues.fitId?.length>0 && dataValues.fitId!=null ) )
                {
                    let newFit = [];
                    let repeated = [1];
                    dataValues.fitId.map( x => {
                        let thisOne = JSON.parse(x);
                        thisOne.id == id
                        ? (newFit.push( { ... thisOne, quantity: thisOne.quantity + quantity } ), repeated.push(1) )
                        : newFit.push( thisOne );
                    } );
                    repeated.length==1 && newFit.push( { id, name, img, price, quantity } );
                    await Carrito.update( { ...dataValues, fitId: newFit }, { where: { id: carritoId } } );
                }
                if(type=="fitId" && !dataValues.fitId) await Carrito.update( { ...dataValues, fitId: [ { id, name, img, price, quantity } ] }, { where: { id: carritoId } } );
                
                res.status(200).json( await Carrito.findByPk( carritoId ) );
            }
            catch(error)
            {
                res.status(500).json( { error_addToCarrito_BACK: error.message } );
            }
        }
        else
        {
            try
            {
                const newCarrito = await Carrito.create( { [type]: [  { id, name, img, price, quantity } ] } );
                res.status(200).json( newCarrito );
            }
            catch(error)
            {
                res.status(500).json( { error_createCarrito: error.message } );
            }
        }
    }
    catch(error)
    {
        res.status(500).json( { error_addCarrito: error.message } );
    }
}

const getCarrito = async (req, res) =>
{
    const { id } = req.query;
    if(id)
    {
        try
        {
            const thisCarrito = await Carrito.findByPk( id )
            thisCarrito.id
            ?res.status(200).json( thisCarrito )
            :res.status(404).json( { message: `Carrito id ${id} not found` } );
        }
        catch(error)
        {
            res.status(500).json( { error_getCarritoById: error.message } );
        }
    }
    else
    {
        try
        {
            const allCarritos = await Carrito.findAll();
            allCarritos
            ?res.status(200).json( allCarritos )
            :res.status(404).json( { error: `There are no 'Carritos' in our DB.`} );
        }
        catch(error)
        {
            res.status(500).json( { error_getAllCarritos: error.message } );
        }
    }
}

const deleteCarrito = async (req, res) =>
{
    const { carritoId, itemId, type } = req.body;

    if(itemId)
    {
        try
        {
            const {dataValues} = await Carrito.findByPk( carritoId );

            console.log("DATAVALUES:\n", dataValues);

            if(type=="suppId" && dataValues.suppId) await Carrito.update( { ...dataValues, suppId:  dataValues.suppId.filter( x =>
                {
                    let thisOne = JSON.parse(x);
                    thisOne.id != itemId
                })  }, { where: { id: carritoId } } );

            if(type=="indId" && dataValues.indId ) await Carrito.update( { ...dataValues, indId: dataValues.indId.filter( x =>
                {
                    let thisOne = JSON.parse(x);
                    thisOne.id != itemId
                })  }, { where: { id: carritoId } } );

            if(type=="fitId" && dataValues.fitId ) await Carrito.update( { ...dataValues, fitId:  dataValues.fitId.filter( x =>
                {
                    let thisOne = JSON.parse(x);
                    thisOne.id != itemId
                })  }, { where: { id: carritoId } } );

            const carritoActualizado = await Carrito.findByPk(carritoId);

            res.status(200).json( carritoActualizado );
        }
        catch(error)
        {
            res.status(500).json( { error_deleteItem: error } );
        }
    }
    else
    {
        try
        {
            await Carrito.destroy( { where: { id: carritoId } } );
            res.status(200).json( { message: `Carrito ID: ${carritoId} deleted` } );
        }
        catch(error)
        {
            res.status(500).json( { error_deleteCarrito: error.message } );
        }
    }
}


module.exports = { addCarrito, getCarrito, deleteCarrito };

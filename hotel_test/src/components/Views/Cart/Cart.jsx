import axios from 'axios';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Styles from './Cart.module.css';


export const Cart = () =>
{
    const isLocal = useSelector( state => state.isLocal );
    const navigate = useNavigate();
    const [ carrito, setCarrito ] = useState(false);

    useEffect( () =>
    {
        if(isLocal==true)
        {
            axios(`http://localhost:3001/carrito?id=${ JSON.parse( window.localStorage.getItem('activeCarrito') ) }`)
          .then(({ data }) =>
          {
            setCarrito(data);
          })
          .catch((error) =>
          {
            console.log(`Error en CARGAR_CARRITO: ${error.message}`);
          } );
        }
        else
        {
            axios(`https://getfitserver.up.railway.app/carrito?id=${ JSON.parse( window.localStorage.getItem('activeCarrito') ) }`)
          .then(({ data }) =>
          {
            setCarrito(data);
          })
          .catch((error) =>
          {
            console.log(`Error en CARGAR_CARRITO: ${error.message}`);
          } );
        }
    }, []);
 
    const logCheck = () =>
    {
        if( JSON.parse(window.localStorage.getItem('activeUser')) )
        {
            alert('¡Gracias por elegirnos!');
            navigate('/payout');
        }
        else
        {
            alert('Log in to continue');
            navigate('/login');
        }
    }

    const deleteItem = (cId, iId, type) =>
    {
        if(isLocal==true)
        {
            axios.delete('http://localhost:3001/carrito', {carritoId: cId, itemId: iId, type: type } )
          .then(({ data }) =>
          {
            console.log("DATAAAA: ", data);
            setCarrito(data);
            console.log(`se supone que volaste el item ID ${iId} del carrito y quedó esto:\n${carrito}`);
          })
          .catch((error) =>
          {
            console.log(`Error en BORRAR_ITEM: ${error}`);
          } );
        }
        else
        {
            axios.delete('https://getfitserver.up.railway.app/carrito', {carritoId: cId, itemId: iId, type: type } )
          .then(({ data }) =>
          {
            console.log("DATAAAA: ", data);
            setCarrito(data);
            console.log(`se supone que volaste el item ID ${iId} del carrito y quedó esto:\n${carrito}`);
          })
          .catch((error) =>
          {
            console.log(`Error en BORRAR_ITEM: ${error}`);
          } );
        }
    }
    
    return(
        <div className='container'>
            <button onClick={() => console.log("Hola tarola")}> BOTON </button>
            CARD ID : {carrito.id}
            {carrito.fitId && (
                <div> <h2> Items FITNESS </h2>
                { carrito.fitId.map( (x, y) =>
                    {
                        let items = JSON.parse( x );
                        console.log("CARD: ", items);
                        return(
                        <div key={y}>
                            <img src={items.img} className={ Styles.OBDC}/>
                            <p> producto: {items.name} </p>
                            <p> PRECIO: {items.price} $ (c/u)</p>
                            <p> Cantidad: {items.quantity} </p>
                            <button onClick={ () => deleteItem(carrito.id, items.id, "fitId") }> X </button>
                            -------------------------------------
                        </div>)
                    }
                 ) }
                </div>
            )}
            {carrito.indId && (
                <div> <h2> Items de INDUMENTARIA </h2>
                { carrito.indId.map( (x, y) =>
                    {
                        let items = JSON.parse( x );
                        return(
                        <div key={y}>
                            <img src={items.img} className={ Styles.OBDC}/>
                            <p> producto: {items.name} </p>
                            <p> PRECIO: {items.price} $ (c/u)</p>
                            <p> Cantidad: {items.quantity} </p>
                            -------------------------------------
                        </div>)
                    }
                 ) }
                </div>
            )}
            {carrito.suppId && (
                <div> <h2> SUPLEMENTOS </h2>
                    { carrito.suppId.map( (x, y) =>
                    {
                        let items = JSON.parse( x );
                        return(
                        <div key={y}>
                            <img src={items.img} className={ Styles.OBDC}/>
                            <p> producto: {items.name} </p>
                            <p> PRECIO: {items.price} $ (c/u)</p>
                            <p> Cantidad: {items.quantity} </p>
                            -------------------------------------
                        </div>)
                    }
                 ) }
                </div>
            )}
            <div>
                <button onClick={ () => logCheck() }> COMPRAR </button>
            </div>
        </div>
    )
}
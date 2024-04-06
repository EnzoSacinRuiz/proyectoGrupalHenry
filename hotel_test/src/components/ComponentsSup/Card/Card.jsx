import { initMercadoPago } from '@mercadopago/sdk-react';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleCarrito } from '../../../redux/actions/actions.js';
import style from "./Card.module.css";

export const Card = ({ sup }) => {
  const { isLocal } = useSelector( state => state );
  const [preferenceId, setPreferenceId] = useState(null);
  const [ quantity, setQuantity ] = useState(1);
  let createPreference = '';

  initMercadoPago('TEST-692f2300-ce26-4481-be16-ee5004d3986a');
  
  const { name, price, imgURL, id } = sup;

  if(isLocal==true)
  {
    createPreference = async () => {
      try {
        const response = await axios.post("http://localhost:3001/create_preference", {
          description: name,
          price: price,
          quantity: 1,
        });
  
        const { id } = response.data;
        return id;
      } catch (error) {
        console.log(error);
      }
    };
  }
  else
  {
    createPreference = async () => {
      try {
        const response = await axios.post("https://getfitserver.up.railway.app/create_preference", {
          description: name,
          price: price,
          quantity: 1,
        });
  
        const { id } = response.data;
        return id;
      } catch (error) {
        console.log(error);
      }
    };
  }

  // { carritoId, id, type, price, img, name, quantity }

  const handleBuy = async () =>
  {
    if(JSON.parse( window.localStorage.getItem('activeCarrito') )==null)
    {
      const carrito = await handleCarrito(
        {
          id: sup.id, type: "suppId", price: sup.price,
          img: sup.imgURL, name: sup.name, quantity: quantity
        } )
        console.log("CARRITO: ", carrito);
      window.localStorage.setItem('activeCarrito', JSON.stringify(carrito.id) );
    }
    else
    {
      const carrito = await handleCarrito(
        {
          carritoId: JSON.parse(window.localStorage.getItem('activeCarrito')),
          id: sup.id, type: "suppId", price: sup.price,
          img: sup.imgURL, name: sup.name, quantity: quantity
        } );
      console.log("CARRITO UPDATE: ", carrito);
    }
  };

  console.log("CarritoID: ", JSON.parse(window.localStorage.getItem('activeCarrito')));
  return (
    <>
      <div className={style.cardWrapper}>
        <img src={imgURL} alt="Imagen del producto" />
        <div className={style.cardBody}>
          <h4 className={style.name}>{name}</h4>
          <p className={style.price}>${price}</p>
        </div>

        <div className={style.button}>
          <Link to={`/suppDetail/${id}`}>
            <button className={style.btnDetail}>DETAIL</button>
          </Link>
          <button onClick={ () => quantity>1 && setQuantity(quantity-1) }> - </button>
          <p> {quantity} </p>
          <button onClick={ () => setQuantity(quantity+1) }> + </button>
          <button onClick={handleBuy}> Agregar al carrito </button>
          {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>
      </div>
    </>
  );
};


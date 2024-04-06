import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeType, handleCarrito } from '../../../redux/actions/actions.js';
import Styles from "../Card/ShopCard.module.css";
// import { useNavigate } from "react-router-dom";

export const ShopCard = ({ prop }) => {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ quantity, setQuantity ] = useState(1);
  let type = prop.type=='Shoe' ? 'Shoe' : prop.type=='Shirt' ? 'Shirt' : 'Fit' ;

  console.log("type: ",  type=='Shoe'||type=='Shirt' ? 'indId' : 'fitId' );

  const handleBuy = async () =>
  {
    if(JSON.parse( window.localStorage.getItem('activeCarrito') )==null)
    {
      const carrito = await handleCarrito(
        {
          id: prop.id, type: type=='Shoe'||type=='Shirt' ? 'indId' : 'fitId' , price: prop.price,
          img: prop.image, name: prop.name, quantity: quantity
        } )
        console.log("CARRITO: ", carrito);
      window.localStorage.setItem('activeCarrito', JSON.stringify(carrito.id) );
    }
    else
    {
      const carrito = await handleCarrito(
        {
          carritoId: JSON.parse(window.localStorage.getItem('activeCarrito')),
          id: prop.id, type: type=='Shoe'||type=='Shirt' ? 'indId' : 'fitId', price: prop.price,
          img: prop.image, name: prop.name, quantity: quantity
        } );
      console.log("CARRITO UPDATE: ", carrito);
    }
  };
  
  return (
      <div class="card container d-flex  align-items-center">
        <Link to={ `/shopDetail/${prop.id}` }>
          <img class={`card-img-top ${Styles.asd}`} onClick={ () => dispatch(changeType(type)) } src={prop.image} alt="Imagen del producto" />
        </Link>
        
        <div class="card-body d-flex flex-column align-items-center">
          <h3 class="card-title">{prop.name}</h3>
          <h4 class={` ${Styles.price}`}>$ {prop.price}</h4>
        </div>
        
        <div class="container d-flex justify-content-between mb-3">
        <button class={`btn btn-dark ${Styles.count}`} onClick={ () => quantity>1 && setQuantity(quantity-1) }> - </button>
          <p class="h4 d-flex flex-column justify-content-center"> {quantity} </p>
        <button class={`btn btn-dark ${Styles.count}`} onClick={ () => setQuantity(quantity+1) }> + </button>
        </div>
        <button type="button" class={`btn mb-2 ${Styles.addCart}`} onClick={handleBuy}> Add to cart </button>
      </div>
  );
};

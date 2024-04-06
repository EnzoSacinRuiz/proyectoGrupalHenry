import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Reviews } from "../Reviews/Reviews";
import style from "./Detail.module.css";

export const Detail = () => {
  const isLocal = useSelector( state => state.isLocal );
  const { id } = useParams();
  const [supplements, setSupplements] = useState({});
  const [inputValue, setInputValue] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  //arreglado
  useEffect(() => {
    if(isLocal)
    {
      axios(`http://localhost:3001/supps/${id}`).then(({ data }) => {
        if (data.name) {
          setSupplements(data);
        } else {
          window.alert("0");
        }
      });
    }
    else
    {
      axios(`https://getfitserver.up.railway.app/supps/${id}`).then(({ data }) => {
        if (data.name) {
          setSupplements(data);
        } else {
          window.alert("0");
        }
      });
    }
  }, [id]);
  
  useEffect(() => {
    const price = supplements.price || 0;
    setTotalPrice(price * inputValue);
  }, [supplements.price, inputValue]);

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 0) {
      setInputValue(value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      setInputValue((prev) => prev + 1);
    } else if (event.key === "ArrowDown" && inputValue > 0) {
      setInputValue((prev) => prev - 1);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  };

  const handleBuy = () => {
    //Aca va la logica para mandarlo al carrito o pedir del back etc.
    console.log(`Compraste ${inputValue} unidades por un total de $${totalPrice}`);
  };

  return (
    <div className={style.divDetail}>
      <div className={style.Detailcontainer}>
        <img src={supplements.imgURL} alt={supplements.name} />
        <div className={style.details}>
          <h1>{supplements.name}</h1>
          <h2 className={style.flavorDetail}>{supplements.flavor}</h2>
          <h2>{supplements.category}</h2>
          <h2>${totalPrice}</h2>
          <div>
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            min="1"
            max="10"
            onClick={(event) => event.preventDefault()}
          />
          <button onClick={handleBuy}>Agregar al carrito 🛒</button>
          </div>
        </div>
      </div>
      <div>
        <Reviews />
      </div>
    </div>
  );
};

export default Detail;

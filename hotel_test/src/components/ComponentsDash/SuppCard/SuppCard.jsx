import { Link } from "react-router-dom";
import style from "./SuppCard.module.css";

export const SuppCard = ({ sup }) => {
  const { name, price, imgURL, id } = sup;
  return (
    <>
      <div className={style.cardWrapper}>
        <img src={imgURL} alt="Imagen del producto" />
        <div className={style.cardBody}>
          <h4 className={style.name}>{name}</h4>
          <p className={style.price}>${price}</p>
        </div>

        <div className={style.button}>
          <Link to={`/detail/${id}`}>
            <button className={style.btnDetail}>DETAIL</button>
          </Link>
          <button className={style.btnBuy}>COMPRAR</button>
        </div>
      </div>
    </>
  );
};
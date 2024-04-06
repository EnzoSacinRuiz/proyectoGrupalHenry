import Styles from "./DashCard.module.css";
import { useDispatch } from "react-redux";
import {
  changeForm,
  updateCurrentProduct,
  changeCategory,
} from "../../../redux/actions/actions";
import { useSelector } from "react-redux/es/hooks/useSelector";
// import { useNavigate } from "react-router-dom";

export const DashCard = ({ prop }) => {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current_product_info } = useSelector((state) => state);

  const handleUpdateProduct = () => {
    dispatch(changeForm("update"));
    dispatch(updateCurrentProduct(prop));
    prop.type == "Shoe" && dispatch(changeCategory("ind"));
    prop.type == "Shirt" && dispatch(changeCategory("ind"));
    prop.variation && dispatch(changeCategory("fit"));

    console.log(current_product_info);
  };

  return (
    <div class="card container d-flex  align-items-center">
      <div className={Styles.cardData}>
        <img
          class={`card-img-top ${Styles.asd}`}
          src={prop.image}
          alt="Imagen del producto"
        />

        <div class="card-body d-flex flex-column align-items-center">
          <h3 class="card-title">{prop.name}</h3>
          <p className={Styles.price}>$ {prop.price}</p>
        </div>

        <div className={Styles.buttonsContainer}>
          <button class="btn btn-dark" onClick={handleUpdateProduct}>
            Update
          </button>

          <button class="btn btn-danger"> Delete </button>
        </div>
      </div>
    </div>
  );
};

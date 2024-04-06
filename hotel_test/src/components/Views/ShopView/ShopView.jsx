import { useSelector } from "react-redux";
import { Cards } from "../../Cards/Cards.jsx";
import { Paginado } from "../../Paginado/Paginado";
import { SideBar } from "../../SideBar/SideBar.jsx";

import Styles from "./ShopView.module.css";


export const ShopView = () =>
{
  const workWith = useSelector( state => state.workWith)

  console.log("WORKwith: ", workWith);
  return (
    <div className={Styles.shopContainer}>
      <SideBar />

      <div className={Styles.shopCardList}>
        <Cards />
        <Paginado />
      </div>
    </div>
  );
};

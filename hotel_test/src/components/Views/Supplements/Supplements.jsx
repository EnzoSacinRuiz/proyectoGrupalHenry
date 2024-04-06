import { Cards } from "../../Cards/Cards.jsx";
import { Paginado } from "../../Paginado/Paginado";
import { SideBar } from "../../SideBar/SideBar.jsx";
import style from "./Supplements.module.css";

export const Supplements = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.header}></div>
        <div className={style.body}>
          <SideBar />

          <div className={style.cardsWrapped}>
            <Cards />
          </div>
        </div>
        <Paginado />
      </div>
    </>
  );
};

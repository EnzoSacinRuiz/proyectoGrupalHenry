import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  changeCategory,
  restartPages,
  restartfoundSearch,
} from "../../../redux/actions/actions.js";
import { DashCardList } from "../../ComponentsDash/DashCardList/DashCardList.jsx";
import { DashSideBar } from "../../ComponentsDash/DashSideBar/DashSideBar.jsx";
import { Paginado } from "../../ComponentsDash/Paginado/Paginado.jsx";
import { SuppCards } from "../../ComponentsDash/SuppCards/SuppCards.jsx";
import { Welcome } from "../../ComponentsDash/welcome/Welcome.jsx";
import { CreateArticle } from "../../Create/Create Article/CreateArticle";
import { CreateClothe } from "../../Create/Create Clothe/CreateClothe";
import { CreateSupplement } from "../../Create/Create Supplement/CreateSupplement";
import { CreateUser } from "../../Create/Create User/CreateUser.jsx";
import styles from "./Dashboard.module.css";

export const Dashboard = () => {
  const { sCategory, activeUser, foundSearch_SUPP, foundSearch } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // useEffect( () =>       // MEDIDA DE SEGURIDAD
  // {
  //   activeUser.isAdmin!=true && navigate('/home');
  // }, [])

  useEffect(() => {
    dispatch(changeCategory("all"));
    dispatch(restartfoundSearch());
    dispatch(restartPages());
    console.log("foundSearch_SUPP:", foundSearch_SUPP);
    console.log("foundSearch:", foundSearch);

  }, []);

  return (
    <div className={styles.dashContainer}>
      <DashSideBar />

      <div className={styles.dashCardList}>
        {sCategory == "user" && <CreateUser />}
        {sCategory == "all" && <Welcome />}
        {sCategory == "ind" && <CreateClothe />}
        {sCategory == "fit" && <CreateArticle />}
        {sCategory == "supp" && <CreateSupplement />}
        {(sCategory == "remeras" ||
          sCategory == "calzado" ||
          sCategory == "fitness" ) && <DashCardList />}
        {sCategory == "suplements" && location.pathname !== "/dashboard" && <SuppCards />}
        <Paginado />

      </div>
    </div>
  );
};

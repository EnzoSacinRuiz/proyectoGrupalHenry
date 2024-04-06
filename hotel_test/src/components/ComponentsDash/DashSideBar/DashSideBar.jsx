import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCategory,
  restartPages,
  restartfoundSearch,
  workingWith,
  changeForm,
} from "../../../redux/actions/actions.js";
import { DashSearchBar } from "../SearchBar/DashSearchBar.jsx";
import Styles from "./DashSideBar.module.css";

export const DashSideBar = () => {
  const dispatch = useDispatch();
  const {
    allShoes,
    allShirts,
    allFit,
    allShop,
    sCategory,
    allSupps,
    workWith,
    onView,
    formulary_type,
  } = useSelector((state) => state);

  const swithCategory = (input) => {
    dispatch(changeCategory(input));
    dispatch(restartfoundSearch());
    dispatch(restartPages());
  };

  useEffect(() => {
    if (sCategory == "all") dispatch(workingWith(allShop));
    if (sCategory == "remeras") dispatch(workingWith(allShirts));
    if (sCategory == "calzado") dispatch(workingWith(allShoes));
    if (sCategory == "fitness") dispatch(workingWith(allFit));
    if (sCategory == "suplements") dispatch(workingWith(allSupps));
  }, [sCategory]);

  return (
    <div className={Styles.sideBarContainer}>
      <div className={Styles.child}>
      <h3>Create</h3>

      <button onClick={() => {swithCategory("user"); dispatch(changeForm("create"))}}>+ User</button>
      <button onClick={() => {swithCategory("ind"); dispatch(changeForm("create"))}}>+ Indumentary</button>
      <button onClick={() => {swithCategory("fit"); dispatch(changeForm("create"))}}>+ Fitness Articles</button>
      <button onClick={() => {swithCategory("suplements"); dispatch(changeForm("create")); dispatch(changeCategory("supp"))}}>+ Supplements</button>


      <h3>Update</h3>

      {(sCategory == "remeras" ||
        sCategory == "calzado" ||
        sCategory == "fitness") && <DashSearchBar />}

      <button onClick={() => {swithCategory("remeras"); dispatch(changeForm("update"))}}> Shirts </button>
      <button onClick={() => {swithCategory("calzado"); dispatch(changeForm("update"))}}> Shoes </button>
      <button onClick={() => {swithCategory("fitness"); dispatch(changeForm("update"))}}> Fitness Articles </button>
      <button onClick={() => {dispatch(changeCategory("suplements")); dispatch(changeForm("update"))}}> Supplements </button>
      </div>
    </div>
  );
};

// import { DashSearchBar } from '../SearchBar/DashSearchBar';
// import styles from './DashSideBar.module.css';

// export const DashSideBar = ({switchForm, form}) =>
// {

//     return (
//         <div>
//             <div className={styles.sideBarContainer}>
//                 { (form=='cShoes' || form=='cShirts' || form=='cFit') && <DashSearchBar/>}
//                 <button className={styles.button} onClick={() => switchForm('supp')} >Crear suplemento</button>
//                 <button className={styles.button} onClick={() => switchForm('ind')} >Crear Indumentaria</button>
//                 <button className={styles.button} onClick={() => switchForm('fit')} >Crear Fit</button>
//                 <button className={styles.button} onClick={() => switchForm('cShoes')}> Calzado </button>
//                 <button className={styles.button} onClick={() => switchForm('cShirts')}> Remeras </button>
//                 <button className={styles.button} onClick={() => switchForm('cFit')}> Suplementos </button>
//             </div>
//         </div>
//     );
// }

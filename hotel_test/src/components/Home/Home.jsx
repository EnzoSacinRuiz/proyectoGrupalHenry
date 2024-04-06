import { useDispatch, useSelector } from "react-redux";
import { fillUp, getSupps } from '../../redux/actions/actions.js';
import Styles from "./Home.module.css";

export const Home = () =>
{
    const dispatch = useDispatch();
    const { allUsers, allSupps  } = useSelector( state => state );

    return(
        <div className={Styles.home}>
            <button onClick={() => fillUp(dispatch)}> Cargar mis usuarios</button>
            { allUsers.length>0 && <h3> {allUsers.length} usuarios en la base de datos. </h3> }
            <button onClick={() => getSupps(dispatch)}> Cargar mis suplementos </button>
            { allSupps.length>0 && <h3> {allSupps.length} suplementos en la base de datos. </h3> }
        </div>
    )
}
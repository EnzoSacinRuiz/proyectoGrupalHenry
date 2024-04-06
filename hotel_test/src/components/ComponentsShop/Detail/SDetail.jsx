import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { searchById } from "../../../redux/actions/actions";

export const SDetail = () =>
{
    const { type } = useSelector( state => state );
    const location = useLocation();
    const [ detail, setDetail ] = useState({});
    const { id } = useParams();

    useEffect( () =>
    {
        const doIt = async () =>
        {
            setDetail( await searchById( id, type ) );
        }
        doIt();
    }, [id, type])

    console.log("TYPE: ", type);

    console.log("DETAIL: ", detail);

    return(
        <div>
            <img src={ detail.img } />
            <h1> NOMBRE DE ITEM: { detail.name } </h1>
            Soy el detalle
        </div>
    )
}
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ShopCard } from "../ComponentsShop/Card/ShopCard";
import { Card } from "../ComponentsSup/Card/Card";
import style from "./Cards.module.css";

export const Cards = () =>
{
    const { foundSearch, onView } = useSelector( state => state );
    const location = useLocation();
    const ruta = location.pathname.toLowerCase();

    return(
        <>
        { ruta=='/shop' && (
        <div className={style.list}>
            {( !foundSearch.length>0 ) && onView.map((x, y) => <ShopCard key={y} prop={x}/>)}
            { foundSearch.length>0 && foundSearch.map((x, y) => <ShopCard key={y} prop={x} />)}
        </div>)}

        {ruta=='/supps' && (
        <div>
            <div className={style.cardsList}>
              {onView?.map((sup) => (
                <Card sup={sup} key={sup.id} />
              ))}
            </div>
        </div>
        )}
        </>
    )
};
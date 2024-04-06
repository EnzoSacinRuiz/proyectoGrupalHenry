import { useSelector } from "react-redux";
import { DashCard } from '../DashCard/DashCard.jsx';
import Styles from "../DashCardList/DashCardList.module.css";

export const DashCardList = () =>
{
    const { allShoes, allShirts, allFit, allShop, sCategory, foundSearch, onView, workWith } = useSelector( state => state );

    return(
        <div className={Styles.list}>
            {( !foundSearch.length>0 ) && onView.map((x, y) => <DashCard key={y} prop={x}/>)}
            {/* {(!foundSearch.length>0 && sCategory=='all') && allShop.map((x, y) => <ShopCard key={y} prop={x}/>)}
            {(!foundSearch.length>0 && sCategory=='remeras') && allShirts.map((x, y) => <ShopCard key={y} prop={x}/>)}
            {(!foundSearch.length>0 && sCategory=='calzado') && allShoes.map((x, y) => <ShopCard key={y} prop={x}/>)}
            {(!foundSearch.length>0 && sCategory=='fitness') && allFit.map((x, y) => <ShopCard key={y} prop={x}/>)} */}
            { foundSearch.length>0 && foundSearch.map((x, y) => <DashCard key={y} prop={x} />)}
        </div>
    )
};
import { useSelector } from "react-redux";
import { SuppCard } from '../SuppCard/SuppCard.jsx';
import style from "./SuppCards.module.css";

export const SuppCards = () => 
{
  const { allSupps } = useSelector((state) => state);
  return (
    <div>
      <div className={style.cardsList}>
        {allSupps.map((sup) => (
          <SuppCard sup={sup} key={sup.id} />
        ))}
      </div>
    </div>
  );
};
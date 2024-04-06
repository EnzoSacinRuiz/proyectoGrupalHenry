import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchThis } from "../../../redux/actions/actions";
import styles from "./DashSearchBar.module.css"

export const DashSearchBar = () => {
  const { allShoes, allShirts, allFit, allShop, sCategory, workWith } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const [bar, setBar] = useState("");

  useEffect( () =>
  {
    dispatch(searchThis(bar, workWith));
  }, [bar])


  const handleChange = (e) => {
    setBar(e.target.value);
  };

  return (
    <div>
      <input placeholder="Buscar..." onChange={handleChange} className={styles.dashSearchBar} />
    </div>
  );
};

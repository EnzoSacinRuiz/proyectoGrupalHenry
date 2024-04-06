import { Link } from "react-router-dom";
import style from "./Landing.module.css";

export const Landing = () => {
  return (
    <div className={style.divLand}>
      <div className={style.buttonContainer}>
        <Link to="/home">
          <button> HOME </button>
        </Link>
      </div>
    </div>
  );
};

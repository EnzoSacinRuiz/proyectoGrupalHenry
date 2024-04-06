import { useLocation } from "react-router-dom";
import { useSearchBar } from "../Hooks/SearchBar Hooks/useSearchBar";
import style from "./SearchBar.module.css";

export const SearchBar = () => {
  const location = useLocation();
  const ruta = location.pathname.toLowerCase();
  const { handleSubmit, handleChange, searchString } = useSearchBar();

  return (
    <>
      {ruta == "/shop" && ( //  SHOP SearchBar
        <div className={style.barElement}>
          <input placeholder="Buscar..." onChange={handleChange} />
        </div>
      )}

      {ruta == "/supps" && ( //  SUPP SearchBar
        <div>
          <form onSubmit={handleSubmit}>
            <div className={style.barElement}>
              <input
                type="search"
                placeholder="Search Suplements"
                value={searchString}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

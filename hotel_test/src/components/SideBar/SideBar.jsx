import { useSideBar } from "../Hooks/SideBar Hooks/useSideBar.jsx";

//COMPONENTES
import { SearchBar } from "../SearchBar/SearchBar.jsx";


import { useLocation } from "react-router-dom";
import style from "./SideBar.module.css";


export const SideBar = () =>
{
  const {
    swithCategory, brands, estadoLocal, brandList,
    switchBack, switchHandler,
    handleOrderByPriceAsc, handleOrderByPriceDesc,
    handleFilterCategory, handleFilterBrand, showBrandX, workWithCopy } = useSideBar();

  const location = useLocation();
  const ruta = location.pathname.toLowerCase();

  return (
    <>
    { ruta=='/shop' && (
    <div className={style.sideBarContainer}>
      <h3>Buscar</h3>
      <SearchBar />
      <h3>CATEGORIAS</h3>
      <button onClick={() => swithCategory("all") }>ALL</button>
      <button onClick={() => swithCategory("remeras")}>
        Remeras
      </button>
      <button onClick={() => swithCategory("calzado")}>
        Calzado
      </button>
      <button onClick={() => swithCategory("fitness")}>
        Fitness
      </button>
      <h3>FILTROS</h3>
      <p> Marcas</p>
      {brands.length>0 && brands.map( (x, y) => <button onClick={() => showBrandX( x, workWithCopy )} key={y} > {x} </button>) }
      { (JSON.parse(window.localStorage.getItem('sCategory'))!='all' && JSON.parse(window.localStorage.getItem('sCategory'))!='fitness') && (
      <>
        <button>Talles</button>
      </>)}
      <button>Precios</button>
    </div>)}

    { ruta=='/supps' && (
    <div className={`${style.sideBar} ${style.fixedSidebar}`}>
      <div className={style.searchBar}>
        <SearchBar />
      </div>
      <div className={style.orders}>
        <button onClick={handleOrderByPriceAsc}>Price Low to High</button>
        <button onClick={handleOrderByPriceDesc}>Price High to Low</button>
      </div>
      <div className={style.filters}>
      {JSON.parse(window.localStorage.getItem('basic')) == true && (
        <div className={style.filterCategory}>
          <h3>Categorias</h3>

          <button onClick={() => switchHandler("suplementos")}>
            Suplementos
          </button>
          
          <button onClick={() => switchHandler("brand")}>
            Marcas
          </button>

        </div>
      )}

      {estadoLocal === "suplementos" && (
        <div>
          <h3>Suplementos</h3>
          <div className={style.buttonsSup}>
            <button onClick={() => switchBack()}>Volver</button>
            <button onClick={() => handleFilterCategory("Proteínas")}>
              Proteínas
            </button>
            <button onClick={() => handleFilterCategory("Creatinas")}>
              Creatinas
            </button>
            <button
              onClick={() => handleFilterCategory("Quemadores de grasa")}
            >
              Quemadores de grasa
            </button>
            <button onClick={() => handleFilterCategory("Aminoácidos")}>
              Aminoácidos
            </button>
            <button onClick={() => handleFilterCategory("Pre entreno")}>
              Pre entreno
            </button>
            <button
              onClick={() =>
                handleFilterCategory("Barras / Alimentos proteicos")
              }
            >
              Barras / Alimentos proteicos
            </button>
          </div>
        </div>
      )}

      {estadoLocal === "brand" && (
        <div>
          <h3>Brand</h3>
          <div className={style.filterBrand}>
            <button onClick={() => switchBack()}>Volver</button>
            {brandList.map((x, y) => (
              <button onClick={() => handleFilterBrand(x)} key={y}>
                { x }
              </button>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  )}
  </>
  );
};

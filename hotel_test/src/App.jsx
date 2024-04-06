import axios from 'axios';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Detail } from "./components/ComponentsSup/Detail/Detail.jsx";
import { CreateArticle } from "./components/Create/Create Article/CreateArticle";
import { CreateClothe } from "./components/Create/Create Clothe/CreateClothe";
import { CreateSupplement } from "./components/Create/Create Supplement/CreateSupplement.jsx";
import { CreateUser } from "./components/Create/Create User/CreateUser.jsx";
import { Landing } from "./components/Landing/Landing.jsx";
import { Login } from "./components/Login/Login.jsx";
import { MyProfile } from "./components/My Profile/MyProfile.jsx";
import { Dashboard } from "./components/Views/Dashboard/Dashboard";
import { ShopView } from "./components/Views/ShopView/ShopView";
import { Supplements } from "./components/Views/Supplements/Supplements.jsx";
import { Users } from "./components/Views/Users/Users.jsx";

import {
  fillFitness,
  fillShirts,
  fillShoes,
  getAllAminoacidos,
  getAllBarras,
  getAllCreatinas,
  getAllPreEntreno,
  getAllProts,
  getAllQuemadores,
  getSupps,
  mixAll,
  workingWith_SUPP
} from "./redux/actions/actions.js";

import { SDetail } from './components/ComponentsShop/Detail/SDetail.jsx';
import NavBarUser from "./components/NavBarCliente/NavBarUser.jsx";
import { Cart } from "./components/Views/Cart/Cart.jsx";
import { HomeUser } from "./components/Views/HomeUser/HomeUser.jsx";
import { PayOut } from './components/Views/PayOut/PayOut.jsx';
import { LOGIN } from './redux/actions/actionTypes.js';

const App = () => {
  const location = useLocation();
  const { sCategory, allShop, workWith, allSupps, activeUser, isLocal } = useSelector( (state) => state );
  let filler = {};
  const dispatch = useDispatch();
  const thisShit = JSON.parse( window.localStorage.getItem('activeUser') );

  useEffect(() => //ADEFECIO A RESUMIR
  {
    fillShirts(dispatch);
    fillShoes(dispatch);
    fillFitness(dispatch);
    getSupps(dispatch);
    mixAll(dispatch);
  }, [] );

  // useEffect( () =>
  // {
  //   console.log("Soy un console log");
  //   const doIt = async () =>
  //   {
  //     const usuario = await logInThisId( JSON.parse( window.localStorage.getItem('activeUser') ) );
  //     return usuario;
  //   }
  //   if( JSON.parse( window.localStorage.getItem('activeUser') ) != {} )
  //   {
      
  //     console.log("Usuario: ", doIt() );
  //     // login(usuario);
  //   }
  // }, [] );

  useEffect(() =>
  {
    if(isLocal==true)
    {
      if( JSON.parse( window.localStorage.getItem('activeUser') ))
      {
        axios(`http://localhost:3001/user?ID=${JSON.parse( window.localStorage.getItem('activeUser') )}`)
        .then(({ data }) =>
        {
          dispatch( { type: LOGIN, payload: data } );
        })
        .catch((error) =>
        {
          console.log(`Error en logThisGuy: ${error.message}`);
        } );
      }
    }
    else
    {
      if( JSON.parse( window.localStorage.getItem('activeUser') ))
      {
        axios(`https://getfitserver.up.railway.app/user?ID=${JSON.parse( window.localStorage.getItem('activeUser') )}`)
        .then(({ data }) =>
        {
          dispatch( { type: LOGIN, payload: data } );
        })
        .catch((error) =>
        {
          console.log(`Error en logThisGuy: ${error.message}`);
        } );
      }
    }
  }, []);
  console.log("activeuser", activeUser);


  useEffect(() => {
    dispatch(getAllCreatinas());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllQuemadores());
}, [dispatch]);

  useEffect(() => {
    dispatch(getSupps(dispatch));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllAminoacidos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllPreEntreno());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllBarras());
  }, [dispatch]);


  useEffect(() => {
    if (allSupps.length > 0) {
      dispatch(workingWith_SUPP(allSupps));
    }
  }, [allSupps, dispatch]);

  //    window.localStorage.(x) <-- x siendo lo que quieras hacer
  //    window.localStorage.setItem( 'nombre' , JSON.stringify(quieroQueTenga) );   <--- pisar/crear estado local persistente
  //    window.localStorage.getItem( 'nombre' );      <--- traer la info dentro de ese 'nombre' estado local persistente
  //    CUANDO ENVIÁS JSON.stringify()
  //    CUANDO RECIBIS INFO   JSON.parse()

  return (
    <div>
      {location.pathname !== "/" && <NavBarUser />}
      {/* {show && (
        <button
          onClick={() =>
            window.localStorage.setItem("localShow", JSON.stringify(false))
          }
        >
          {" "}
          Botón{" "}
        </button>
      )}
      <button
        onClick={() =>
          window.localStorage.setItem("localShow", JSON.stringify(false))
        }
      >
        {" "}
        False{" "}
      </button>
      <button
        onClick={() =>
          window.localStorage.setItem("localShow", JSON.stringify(true))
        }
      >
        {" "}
        TRUE{" "}
      </button>
      <button
        onClick={() =>
          window.localStorage.setItem("localShow", JSON.stringify("LMAO"))
        }
      >
        {" "}
        LMAO{" "}
      </button>
      <button
        onClick={() =>
          window.localStorage.setItem(
            "localShow",
            JSON.stringify({ name: "Daro", username: "Reyk0" })
          )
        }
      >
        {" "}
        USER{" "}
      </button>
      <button
        onClick={() => {
          filler = JSON.parse(window.localStorage.getItem("localShow"));
          console.log(filler);
        }}
      >
        {" "}
        ShowMe{" "}
      </button> */}

      {/* { JSON.parse(window.localStorage.getItem("localShow")).map( x => <> <h1></h1></>) } */}

      <Routes>
        {/* Rutas view */}
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomeUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Rutas User */}
        <Route path="/users" element={ <Users /> } />
        <Route path="/createuser" element={ <CreateUser /> } />
        <Route path="/supps" element={ <Supplements /> } />
        <Route path="/createsupp" element={ <CreateSupplement /> } />
        <Route path="/detail/:id" element={ <Detail /> } />

        {/* Rutas Shop */}
        <Route path="/createClothe" element={<CreateClothe />} />
        <Route path="/createArticle" element={<CreateArticle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/suppDetail/:id" element={<Detail />} />
        <Route path="/shopDetail/:id" element={<SDetail />} />
        <Route path="/shop" element={<ShopView />} />PayOut
        <Route path="/cart" element={<Cart />} />
        <Route path="/payout" element={<PayOut />} />
      </Routes>
    </div>
  );
};

export default App;

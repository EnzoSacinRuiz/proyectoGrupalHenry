import {
  ALL_PROTS,
  BACK_WW,
  CHANGE_CATEGORY,
  CHANGE_CATEGORY_SUPP,
  CHANGE_FORM_TYPE,
  CH_TYPE,
  FILL_FITNESS,
  FILL_SHIRTS,
  FILL_SHOES,
  FILTER_BRAND,
  FILTER_CATEGORY,
  FILTER_IT,
  GET_SUPPS,
  GET_SUPP_BY_NAME,
  LOGIN,
  LOGOUT,
  MIX_ALL,
  OPTION,
  PUT_SUPPS,
  RESTART_PAGES,
  RESTART_PAGES_SUPP,
  SEARCH,
  SEARCH_SUPP,
  UPDATE_PRODUCT,
  UPD_ONVIEW,
  UPD_ONVIEW_SUPP,
  UPD_PAGE,
  UPD_PAGE_SUPP,
  UPD_SECTOR,
  WORKING,
  WORKING_SUPP,
} from "./actionTypes.js";

import axios from "axios";

// isLocal variable = http://localhost:3001/users
// !isLocal varialbe = https://getfitserver.up.railway.app/

const isLocal = false;

const endpoint = isLocal ? "http://localhost:3001/" : "https://getfitserver.up.railway.app/";

// USERS ACTIONS

export const login = (form) => {
  return { type: LOGIN, payload: form };
};

export const logout = () => {
  return { type: LOGOUT };
};

export const changeOption = (newOption) => {
  return { type: OPTION, payload: newOption };
};

export const fillUp = async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}users`);
    dispatch({ type: GET_SUPPS, payload: data });
  } catch (error) {
    console.log("Error al ejecutar fillSupps: ", error.message);
  }
};

// SUPPLEMENTS ACTIONS

// export const getSupps = async (dispatch) => {
//     try {
//         const { data } = await axios.get("http://localhost:3001/supps");
//         dispatch({ type: GET_SUPPS, payload: data });
//     }
//     catch (error) {
//         console.log("Error al ejecutar fillSupps: ", error.message);
//     }
// };

export const getSuppsByName = (search) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${endpoint}supps?name=${search}`
      );
      dispatch({
        type: GET_SUPP_BY_NAME,
        payload: data,
      });
    } catch (error) {
      console.log("Error al ejecutar getSuppByName: ", error.message);
    }
  };
};

export const filterCategory = (categoria) => {
  return { type: FILTER_CATEGORY, payload: categoria };
};

export const filterBrand = (brand) => {
  return {
    type: FILTER_BRAND,
    payload: brand,
  };
};

export const fillArticles = async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}fitness`);
    dispatch({ type: FILL_ARTICLES, payload: data });
  } catch (error) {
    console.log("Error al ejecutar fillArticles: ", error.message);
  }
};

export const fillSupps = async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}supps`);
    dispatch({ type: FILL_SUPPS, payload: data });
  } catch (error) {
    console.log("Error al ejecutar fillSupps: ", error.message);
  }
};

//  SHOP ACTIONS

export const fillFitness = async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}fitness`);
    dispatch({ type: FILL_FITNESS, payload: data });
  } catch (error) {
    console.log("Error al ejecutar fillFitness: ", error.message);
  }
};

export const fillShoes = async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}zapatos`);
    dispatch({ type: FILL_SHOES, payload: data });
  } catch (error) {
    console.log("Error al ejecutar fillShoes: ", error.message);
  }
};

export const fillShirts = async (dispatch) => {
  try {
    const { data } = await axios.get(`${endpoint}remeras`);
    dispatch({ type: FILL_SHIRTS, payload: data });
  } catch (error) {
    console.log("Error al ejecutar fillShirts: ", error.message);
  }
};

export const mixAll = async (
  dispatch //shirts, shoes, fit
) => {
  const fit = await axios.get(`${endpoint}fitness`);
  const shoes = await axios.get(`${endpoint}zapatos`);
  const shirts = await axios.get(`${endpoint}remeras`);
  let mixed = [...fit.data, ...shoes.data, ...shirts.data];
  dispatch({ type: MIX_ALL, payload: mixed });
};

export const bringFitness = async () =>
  // ?
  {
    try {
      const { data } = await axios.get(`"${endpoint}fitness`);
      return data;
    } catch (error) {
      console.log("Error al ejecutar bringFitness: ", error.message);
    }
  };

export const changeCategory = (category) => {
  return {
    type: CHANGE_CATEGORY,
    payload: category,
  };
};

export const changeCategorySupp = (category) => {
  return {
    type: CHANGE_CATEGORY_SUPP,
    payload: category,
  };
};

export const searchThis = (input, data) => {
  let inputToLower = input.toLowerCase();
  let found = [];
  data.map((x) => x.name.toLowerCase().includes(inputToLower) && found.push(x));
  found = [...new Set(found)];
  return { type: SEARCH, payload: found };
};

export const restartfoundSearch = () => {
  return { type: SEARCH, payload: [] };
};

export const workingWith = (input) => {
  return { type: WORKING, payload: input };
};

//  Paginado

export const upadteOnView = (input) => {
  return { type: UPD_ONVIEW, payload: input };
};

export const changePage = (input) => {
  return { type: UPD_PAGE, payload: input };
};

export const changeSector = (input) => {
  return { type: UPD_SECTOR, payload: input };
};

export const restartPages = () => {
  return { type: RESTART_PAGES };
};

export const searchById = async (ID, type) => {
  try {
    switch (type) {
      case "Shoe":
        let shoe = await axios.get(`${endpoint}zapatos?ID=${ID}`);
        return shoe.data;
      case "Shirt":
        let shirt = await axios.get(`${endpoint}remeras?ID=${ID}`);
        return shirt.data;
      case "Fit":
        const fit = await axios.get(`${endpoint}fitness?ID=${ID}`);
        return fit.data;
    }
  } catch (error) {
    console.log(`Error en searchById: ${error.message}`);
    return {};
  }
};

export const changeType = (input) => {
  return { type: CH_TYPE, payload: input };
};

// export const upadteOnView = (input) => {
//     return { type: UPD_ONVIEW, payload: input }
// }

// export const changePage = (input) => {
//     return { type: UPD_PAGE, payload: input }
// }

// export const restartPages = () => {
//     return { type: RESTART_PAGES }}

//  Paginado Supps

export const upadteOnView_SUPP = (input) => {
  return { type: UPD_ONVIEW_SUPP, payload: input };
};

export const changePage_SUPP = (input) => {
  return { type: UPD_PAGE_SUPP, payload: input };
};

export const restartPages_SUPP = () => {
  return { type: RESTART_PAGES_SUPP };
};

export const searchThis_SUPP = (input, data) => {
  let inputToLower = input.toLowerCase();
  let found = [];
  data.map((x) => x.name.toLowerCase().includes(inputToLower) && found.push(x));
  found = [...new Set(found)];
  return { type: SEARCH_SUPP, payload: found };
};

export const restartfoundSearchSupp = () => {
  return { type: SEARCH_SUPP, payload: [] };
};

export const workingWith_SUPP = (input) => {
  return { type: WORKING_SUPP, payload: input };
};

export const getSupps = () => async (dispatch) => {
  try {
    const response = await axios.get(`${endpoint}supps`);
    const allSupsResponse = response.data;
    dispatch({ type: GET_SUPPS, payload: allSupsResponse });
  } catch (error) {
    console.log("Error al ejecutar getsupps: ", error.message);
  }
};

export const getAllProts = () => async (dispatch) => {
  try {
    const allSupsResponse = await axios.get(`${endpoint}supps`);
    const prots = allSupsResponse.data.filter(
      (sup) => sup.category === "Proteínas"
    );
    dispatch({ type: ALL_PROTS, payload: prots });
  } catch (error) {
    console.error("Error fetching prots", error);
  }
};

export const getAllCreatinas = () => async (dispatch) => {
  try {
    const allSupsResponse = await axios.get(`${endpoint}supps`);
    const creatinas = allSupsResponse.data.filter(
      (sup) => sup.category === "Creatinas"
    );
    dispatch({ type: "ALL_CREATINAS", payload: creatinas });
  } catch (error) {
    console.error("Error fetching creatinas", error);
    // Handle the error appropriately
  }
};

export const getAllQuemadores = () => async (dispatch) => {
  try {
    const allSupsResponse = await axios.get(`${endpoint}supps`);
    const quemadores = allSupsResponse.data.filter(
      (sup) => sup.category === "Quemadores de grasa"
    );
    dispatch({ type: "ALL_QUEMADORES", payload: quemadores });
  } catch (error) {
    console.error("Error fetching quemadores", error);
    // Handle the error appropriately
  }
};

export const getAllAminoacidos = () => async (dispatch) => {
  try {
    const allSupsResponse = await axios.get(`${endpoint}supps`);
    const aminoacidos = allSupsResponse.data.filter(
      (sup) => sup.category === "Aminoácidos"
    );
    dispatch({ type: "ALL_AMINOACIDOS", payload: aminoacidos });
  } catch (error) {
    console.error("Error fetching aminoacidos", error);
    // Handle the error appropriately
  }
};

export const getAllPreEntreno = () => async (dispatch) => {
  try {
    const allSupsResponse = await axios.get(`${endpoint}supps`);
    const preEntreno = allSupsResponse.data.filter(
      (sup) => sup.category === "Pre entreno"
    );
    dispatch({ type: "ALL_PREENTRENO", payload: preEntreno });
  } catch (error) {
    console.error("Error fetching pre entreno", error);
    // Handle the error appropriately
  }
};

export const getAllBarras = () => async (dispatch) => {
  try {
    const allSupsResponse = await axios.get(`${endpoint}supps`);
    const barras = allSupsResponse.data.filter(
      (sup) => sup.category === "Barras / Alimentos proteicos"
    );
    dispatch({ type: "ALL_BARRAS", payload: barras });
  } catch (error) {
    console.error("Error fetching barras", error);
    // Handle the error appropriately
  }
};

export const renewSupps = (input) => {
  return { type: PUT_SUPPS, payload: input };
};

export const changeForm = (formType) => {
  return { type: CHANGE_FORM_TYPE, payload: formType };
};

export const updateCurrentProduct = (info) => {
  return { type: UPDATE_PRODUCT, payload: info };
};
// USER ACTION

export const logInThisId = async ( id ) =>
{
    try
    {
        const { data } = await axios.get( `${endpoint}user?ID=${id}` );
        return data;
    }
    catch(error)
    {
        console.log(`Error en LogInThisId: ${error.message} `);
    }
}
//

// Carrito ACTION

export const fetchCarrito = async (id) =>
{
  try
  {
    const { data } = await axios.get(`${endpoint}carrito?id=${id}`);
    return data;
  }
  catch(error)
  {
    return { error_fetchCarrito: error.message };
  }
}

export const handleCarrito = async (item_info) =>
{
  try
  {
    const { data } = await axios.post(`${endpoint}carrito`, item_info);
    return data;
  }
  catch(error)
  {
    console.log( { error_handleCarrito: error } );
  }
}

// SHOP SideBar

export const filterByBrand = (brand, workWith) =>
{
  dispatch( { type: BRANDS_SHOP } )
}

export const backToWorkWith = () =>
{
  return { type: BACK_WW };
}

export const applyBrandFilter = ( input ) =>
{
  return { type: FILTER_IT, payload: input };
}

//
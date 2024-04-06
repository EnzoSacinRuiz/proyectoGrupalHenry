import {
  ALL_AMINOACIDOS,
  ALL_BARRAS,
  ALL_CREATINAS,
  ALL_PREENTRENO,
  ALL_PROTS,
  ALL_QUEMADORES,
  BACK_WW,
  CHANGE_CATEGORY,
  CHANGE_CATEGORY_SUPP,
  CHANGE_FORM_TYPE,
  CH_TYPE,
  FILL_FITNESS,
  FILL_SHIRTS,
  FILL_SHOES,
  FILL_UP,
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
  UPD_SECTOR_SUPP,
  WORKING,
  WORKING_SUPP,
} from "./actions/actionTypes.js";

const initialstate = {
  //Dinamic
  isLocal: false,

  //User
  allUsers: [],
  activeUser: {},
  option: "My data",

  //Supps
  allSupps: [],
  suppsCopy: [],
  onViewSupps: [],
  foundSearch_SUPP: [],
  workWith_SUPP: [],
  allProts: [],
  allCreatinas: [],
  allQuemadores: [],
  allAminoacidos: [],
  allPreEntreno: [],
  allBarras: [],
  suppCategory: null,

  //SupPaginado
  onView_SUPP: [],
  page_SUPP: 1,
  sector_SUPP: 1,

  //Shop
  allShoes: [],
  allShirts: [],
  allFit: [],
  allShop: [],
  foundSearch: [],
  workWith: [],
  workWithCopy: [],
  sCategory: null,
  type: "",

  //ShopPaginado
  onView: [],
  page: 1,
  sector: 1,

  //Formularios CREATE/UPDATE
  formulary_type: "",
  current_product_info: {},

};

const rootReducer = (state = initialstate, { type, payload }) => {
  switch (type) {
    //  USERS
    case FILL_UP:
      return { ...state, allUsers: payload };
    case LOGIN:
      return { ...state, activeUser: payload };
    case LOGOUT:
      return { ...state, activeUser: {} };
    case OPTION:
      return { ...state, option: payload };

    //  SUPPS
    case GET_SUPPS:
      return { ...state, suppsCopy: payload, allSupps: payload };
    case PUT_SUPPS:
      return { ...state, allSupps: payload };
    case GET_SUPP_BY_NAME:
      const suppsName = payload;
      return { ...state, allSupps: suppsName };
    case FILTER_CATEGORY:
      const suplementos = state.suppsCopy;
      return {
        ...state,
        allSupps: suplementos.filter((sup) => sup.category === payload),
      };
    case FILTER_BRAND:
      const suplements = state.suppsCopy;
      return {
        ...state,
        allSupps: suplements.filter((sup) => sup.brand === payload),
      };

    case SEARCH_SUPP:
      return { ...state, foundSearch_SUPP: payload };

      //SHOP
    case FILL_SHIRTS:
      return { ...state, allShirts: payload };
    case FILL_SHOES:
      return { ...state, allShoes: payload };
    case FILL_FITNESS:
      return { ...state, allFit: payload };
    case MIX_ALL:
      return { ...state, allShop: payload };
    case WORKING:
      return { ...state, workWith: payload, workWithCopy: payload };
    case SEARCH:
      return { ...state, foundSearch: payload };
    case CHANGE_CATEGORY:
      return { ...state, sCategory: payload };
    case CH_TYPE:
      return { ...state, type: payload };
    case BACK_WW:
      let previous = state.workWithCopy;
      return { ...state, workWith: previous };
    case FILTER_IT:
      return { ...state, workWith: payload };

    //  Paginado
    case UPD_ONVIEW:
      return { ...state, onView: payload };
    case UPD_PAGE:
      return { ...state, page: payload };
    case UPD_SECTOR:
      return { ...state, sector: payload };
    case RESTART_PAGES:
      return { ...state, page: 1, sector: 1 };

    //  Paginado Supps
    case UPD_ONVIEW_SUPP:
      return { ...state, onView_SUPP: payload };
    case UPD_PAGE_SUPP:
      return { ...state, page_SUPP: payload };
    case UPD_SECTOR_SUPP:
      return { ...state, sector_SUPP: payload };
    case RESTART_PAGES_SUPP:
      return { ...state, page_SUPP: 1, sector_SUPP: 1 };
    case WORKING_SUPP:
      return { ...state, workWith_SUPP: payload };
    case ALL_PROTS:
      return { ...state, allprots: payload };
    case ALL_CREATINAS:
      return { ...state, allCreatinas: payload };
    case ALL_QUEMADORES:
      return { ...state, allQuemadores: payload };
    case ALL_AMINOACIDOS:
      return { ...state, allAminoacidos: payload };
    case ALL_PREENTRENO:
      return { ...state, allPreEntreno: payload };
    case ALL_BARRAS:
      return { ...state, allBarras: payload };
    case CHANGE_CATEGORY_SUPP:
      return { ...state, suppCategory: payload };
    case CHANGE_FORM_TYPE:
      return { ...state, formulary_type: payload };
    case UPDATE_PRODUCT:
      return { ...state, current_product_info: payload };

    default:
      return { ...state };
      
  }
};

export default rootReducer;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyBrandFilter,
  backToWorkWith, filterBrand, filterCategory,
  renewSupps, restartPages, restartfoundSearch,
  workingWith
} from "../../../redux/actions/actions";

export const useSideBar = () =>
{
    const dispatch = useDispatch();
    const { allShoes, allShirts, allFit, allShop, sCategory, workWith, workWithCopy, allSupps, suppsCopy } = useSelector( state => state );
    const [ brands, setBrands ] = useState([]);
    const [brandList, setBrandList] = useState([]);
    let brandsList = [];
    let estadoLocal = JSON.parse(window.localStorage.getItem('category')); //supp

    const [ click, setClick ] = useState(true);

    useEffect( () =>
    {
        JSON.parse(window.localStorage.getItem('sCategory'))==null && window.localStorage.setItem('sCategory', JSON.stringify('all'));
        JSON.parse(window.localStorage.getItem('category'))==null && window.localStorage.setItem('category', JSON.stringify(false));
        JSON.parse(window.localStorage.getItem('basic'))==null && window.localStorage.setItem('basic', JSON.stringify(true));
        JSON.parse(window.localStorage.getItem('category'))==null && window.localStorage.setItem('category', JSON.stringify(false)); //supp
        JSON.parse(window.localStorage.getItem('basic'))==null && window.localStorage.setItem('basic', JSON.stringify(true)); //supp
        setClick(!click);
    }, [] );

    useEffect(() =>     //supp
    {
        allSupps?.map((x) => {
          brandsList.push(x.brand);
        });
        setBrandList([...new Set(brandsList)]);
      }, [allSupps]);

    const swithCategory = (input) =>    //shop
    {
        setClick(!click);
        window.localStorage.setItem('sCategory', JSON.stringify(input));
        dispatch(restartfoundSearch());
        dispatch(backToWorkWith());
        dispatch(restartPages());
    }

    const showBrandX = (brand, copy) =>
    {
      const filteredByBrand = copy.filter( x => x.brand==brand );
      dispatch( applyBrandFilter(filteredByBrand) );
    }

    const switchBack = () =>    //supp
    {
        setClick(!click);
        dispatch(renewSupps(suppsCopy));
        dispatch(restartPages());
        window.localStorage.setItem('basic', JSON.stringify(true));
        window.localStorage.setItem('category', JSON.stringify(false));
    }

    const switchHandler = (value) =>    //supp
    {
        setClick(!click);
        window.localStorage.setItem('basic', JSON.stringify(false));
        window.localStorage.setItem('category', JSON.stringify(value));
      };

    useEffect(() => {
        JSON.parse(window.localStorage.getItem('sCategory')) =='all' && dispatch(workingWith(allShop));
        JSON.parse(window.localStorage.getItem('sCategory')) =='remeras' && dispatch(workingWith(allShirts));
        JSON.parse(window.localStorage.getItem('sCategory')) =='calzado' && dispatch(workingWith(allShoes));
        JSON.parse(window.localStorage.getItem('sCategory')) =='fitness' && dispatch(workingWith(allFit));
        estadoLocal = JSON.parse(window.localStorage.getItem('category')); //supp
    }, [ click, allShop ]);

    useEffect( () =>      //supp
    {
        let brands = [];
        workWith.map( x => !brands.includes(x.brand) && brands.push(x.brand) );
        setBrands(brands);
        let sizes = [];
    }, [ workWith ]);

    //Order
  const handleOrderByPriceAsc = () =>      //supp
  {
    const sortedItems = [...allSupps].sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
    dispatch(renewSupps(sortedItems));
  };

  const handleOrderByPriceDesc = () =>      //supp swithCategory
  {
    const sortedItems = [...allSupps].sort(
      (a, b) => parseFloat(b.price) - parseFloat(a.price)
    );
    dispatch(renewSupps(sortedItems));
  };

  //Filter
  const handleFilterCategory = (category) =>      //supp
  {
    dispatch(restartPages());
    dispatch(filterCategory(category));
  };

  const handleFilterBrand = (brand) =>      //supp
  {
    dispatch(filterBrand(brand));
  };


    return { swithCategory, brands, switchBack, switchHandler,
        handleOrderByPriceAsc, handleOrderByPriceDesc, handleFilterCategory,
        handleFilterBrand, estadoLocal, brandList, showBrandX, workWithCopy }
}
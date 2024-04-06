import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSuppsByName, searchThis } from "../../../redux/actions/actions.js";

export const useSearchBar = () =>
{
    const location = useLocation();
    const ruta = location.pathname.toLowerCase();
    const dispatch = useDispatch();
    const { workWith } = useSelector( state => state );

    const [searchString, setSearchString] = useState("");

    const handleChange = (e) => {
      setSearchString(e.target.value);
    };
  
    useEffect( () =>
    {
      ruta=='/shop' && dispatch(searchThis(searchString, workWith));
    }, [searchString])
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(getSuppsByName(searchString));
    };
    return { handleSubmit, handleChange, searchString }
}
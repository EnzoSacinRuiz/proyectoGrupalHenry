import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { upadteOnView } from "../../../redux/actions/actions.js";

export const usePaginado = () =>
{
    const dispatch = useDispatch();
    const location = useLocation();
    const ruta = location.pathname.toLowerCase();
    const { workWith, allSupps, page, sector } = useSelector( state => state );
    let totalPages = 0;

    const cardsPerPage = 4;

    if(ruta=='/shop') totalPages = Math.ceil(workWith.length/cardsPerPage);;
    if(ruta=='/supps') totalPages = Math.ceil(allSupps.length/cardsPerPage);;

    // const totalPages = Math.ceil(workWith.length/cardsPerPage);
    const visiblePages = 5;
    const totalSectors = Math.ceil( totalPages / visiblePages );

    const paginas = [];

    for( let i=1; i<=totalPages; i++)
    {
        paginas.push(i);
    }

    const topPage = visiblePages * sector;
    const firstPage = ( topPage - visiblePages );
    const showPages = paginas.slice(firstPage, topPage);
    //
    const topCard = cardsPerPage * page;
    const firstCard = topCard - cardsPerPage;

    useEffect( () =>
    {
        let sliced = [];
        if(ruta=='/shop')sliced.push( workWith.slice(firstCard, topCard));
        if(ruta=='/supps') sliced.push( allSupps.slice(firstCard, topCard));
        // let sliced = workWith.slice(firstCard, topCard) ;
        dispatch( upadteOnView(sliced[0]) );
    }, [page, workWith, allSupps])

    return { showPages, page, sector, totalSectors }
}
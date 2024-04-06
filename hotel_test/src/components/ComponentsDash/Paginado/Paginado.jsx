import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, changeSector, upadteOnView } from "../../../redux/actions/actions";
import style from './Paginado.module.css';

export const Paginado = () =>
{
    const dispatch = useDispatch();
    const { workWith, onView, page, sector } = useSelector( state => state );

    const cardsPerPage = 4;


    const totalPages = Math.ceil(workWith.length/cardsPerPage);
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
        const sliced = workWith.slice(firstCard, topCard);
        dispatch( upadteOnView(sliced) );
    }, [page, workWith])

    return(
        <div class='container d-flex justify-content-center'>
            {sector!=1 && (
                <button class="btn btn-primary" onClick={ () => dispatch( changeSector(sector-1) ) } > ◀ </button>
            )}
            
            { showPages.map( x =>
            x!=page
            ? <button class="btn btn-secondary " onClick={() => dispatch(changePage(x))} key={x}> {x} </button>
            : <button class="btn btn-secondary " onClick={() => dispatch(changePage(x))}  key={x}> {x} </button> )}

            {(sector!=totalSectors && totalSectors>1) && (
                <button class="btn btn-primary" onClick={ () => dispatch( changeSector(sector+1) ) } > ▶ </button>
            )}
        </div>
    )
}
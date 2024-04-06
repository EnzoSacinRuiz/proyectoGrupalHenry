import { useDispatch } from "react-redux";
import { changePage, changeSector } from "../../redux/actions/actions.js";
import { usePaginado } from "../Hooks/Paginado Hooks/usePaginado";


export const Paginado = () =>
{
    const dispatch = useDispatch();
    const { showPages, page, sector, totalSectors } = usePaginado();
    
    return(
        <div class='container d-flex justify-content-center'>
            {sector!=1 && (
                <button class="btn btn-primary" onClick={ () => dispatch( changeSector(sector-1) ) } > ◀ </button>
            )}
            {/* showPages.length > 1 && */}
            { showPages.map( x =>
            x!=page
            ? <button class="btn btn-secondary " onClick={() => dispatch(changePage(x))} key={x}> {x} </button>
            : <button class="btn btn-secondary " onClick={() => dispatch(changePage(x))} key={x}> {x} </button> )}

            {(sector!=totalSectors && totalSectors>1) && (
                <button class="btn btn-primary" onClick={ () => dispatch( changeSector(sector+1) ) } > ▶ </button>
            )}
        </div>
    )
};
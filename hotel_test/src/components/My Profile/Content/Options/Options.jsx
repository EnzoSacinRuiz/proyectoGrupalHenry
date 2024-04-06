import { useDispatch } from "react-redux";
import { changeOption } from "../../../../redux/actions/actions";

export const Options = () =>
{
    const dispatch = useDispatch();

    const irA = ( text ) =>
    {
        dispatch( changeOption( text ) );
    }

    return(
        <div>
            <button onClick={ () => irA('Recovery') }> Cambiar contraseña </button>
        </div>
    )
}
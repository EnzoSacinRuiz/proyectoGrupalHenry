import { useEffect } from "react";
import { useNavigate } from "react-router";

export const PayOut = () =>
{
    const navigate = useNavigate();

    useEffect( () =>
    {
        if( !JSON.parse(window.localStorage.getItem('activeUser')) ||  JSON.parse( window.localStorage.getItem('activeCarrito') )==null)
        {
            navigate('/home')
        }
    }, [])

    return(
        <div class="container">
            Gracias por su compra!
        </div>
    )
}
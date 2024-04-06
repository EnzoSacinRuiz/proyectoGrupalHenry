import { useState } from "react";
import { useSelector } from "react-redux";

export const MyData = () =>
{
    const { activeUser } = useSelector( state => state );
    const [ showPass, setShowPass ] = useState("🙉");
    const [ type, setType ] = useState('password');

    const show = () =>
    {
        setShowPass( showPass=='🙈' ? '🙉' : '🙈' );
        setType( type=='password' ? 'text' : 'password' );
    }

    return(
        <div>
            <h2> ¡Bienvenido {activeUser.name} {activeUser.surname}! </h2>
            <label> Usuario: </label>
            <input type='text' value={activeUser.username} disabled/>
            <br/>
            <label> Contraseña: </label>
            <input type={type} value={activeUser.password} disabled/>
            { showPass=='🙉' && <button onClick={show}> 🙈 </button>}
            { showPass=='🙈' && <button onClick={show}> 🙉 </button>}
            <br/>
            <label> Email: </label>
            <input type='text' value={activeUser.email} disabled/>
            <br/>
            <label> Telefono: </label>
            <input type='text' value={activeUser.telephone} disabled/>
            <br/>
        </div>
    )
}

/*
Activities
:
[]
id: "cd4d3ff4-3258-4248-b3c7-d0b979a47a22"
username: "Reyk0"
password: "1234!!"
name: "Dario"
surname: "Gonzalez"
email: "dario@gmail.com"
telephone: "1557482021"
securityQuestion: "Nombre de su primera mascota"
securityAnswer: "Fido Dido"
*/
import { useState } from "react";
import { useSelector } from "react-redux";

export const PasswordRecovery = () =>
{
    const { activeUser } = useSelector( state => state );
    const [ ready, setReady ] = useState(false);
    const [ form, setForm ] = useState(
        {
            securityQuestion: '',
            securityAnswer: '',
            password: '',
            rePassword: '',
        }
    );
    const [ err, setErr ] = useState(
        {
            securityQuestion: '',
            securityAnswer: '',
            password: '',
            rePassword: '',
        }
    );

    const showme = () =>
    {
        console.log("Usuario activo:\n", activeUser);
    }

    const showForm = () =>
    {
        console.log("Formulario so far:\n", form);
        console.log("Errores so far:\n", err);
    }

    const validate = ( x ) =>
    {
        switch( event.target.name )
        {
            case 'securityAnswer':
                {
                    x.securityAnswer == activeUser.securityAnswer
                    ? setErr( { ... err, securityAnswer: '' } )
                    : setErr( { ... err, securityAnswer: 'Pregunta/Respuesta de seguridad incorrecta.' } );
                    break;
                }
            case 'securityQuestion':
                {
                    x.securityQuestion == activeUser.securityQuestion
                    ? setErr( { ...err, securityQuestion: '' } )
                    : setErr( { ...err, securityQuestion: 'Pregunta/Respuesta de seguridad incorrecta.'});
                    break;
                }
            case 'password':
                {
                    x.password == activeUser.password
                    ? setErr( { ... err, password: '' } )
                    : setErr( { ... err, password: 'Contraseña incorrecta.' } );
                    break;
                }
            case 'rePassword':
                {
                    x.rePassword == x.password
                    ? setErr( { ... err, rePassword: ''})
                    : setErr( { ... err, rePassword: 'Contraseñas no coinciden.' } );

                    break;
                }
            default:
                break;
        }

    }

    const handleChange = (e) =>
    {
        const { name, value } = e.target;

        setForm( { ... form, [name]: value } );

        validate( { ...form, [name]: value } );
    }

    const handleSubmit = (e) =>
    {
        
        e.preventDefault();

        setReady(true);

        validate(form);
        
        for( let key in err )
        {
            err[key]!='' ? setReady(false) : false ;
        }
        
        console.log( "Err dentro del submitHandler: ", err, "\nReady después del analizis: ", ready );

        ready ? console.log( "Todo está bien" ) : console.log( "Algo está mal" );

    }

    return(
        <div>
            <button onClick={showme}> Show me the user </button>
            <button onClick={showForm}> Show me the form </button>
            <br/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Pregunta de seguridad: </label>
                        <select name="securityQuestion" value={form.securityQuestion} onChange={handleChange}>
                            <option>  </option>
                            <option value="Nombre de su primera mascota"> Nombre de su primera mascota </option>
                            <option value="Primer número telefónico"> Primer número telefónico </option>
                            <option value="Lugar preferido para vacacionar"> Lugar preferido para vacacionar </option>
                            <option value="Frase preferida de celebridad"> Frase preferida de celebridad </option>
                        </select>
                </div>
                <div>
                    <label>Respuesta de seguridad: </label>
                    <input name="securityAnswer" value={form.securityAnswer} onChange={handleChange} />
                    <br/>
                    <span> { err.securityQuestion } </span>
                </div>
                {/* <div>
                    <label> Contraseña actual: </label>
                    <input type='password' name='password' value={form.password} onChange={handleChange} />
                    <br/>
                    <span> { err.password } </span>
                    <span> { err.rePassword } </span>
                </div>
                <div>
                    <label> Ingrese la contraseña actual nuevamente: </label>
                    <input type='password' name='rePassword' value={form.rePassword} onChange={handleChange} />
                    <br/>
                    <span> { err.rePassword } </span>
                </div> */}
                    <button type='submit'> Enviar </button>
            </form>
        </div>
    )
}
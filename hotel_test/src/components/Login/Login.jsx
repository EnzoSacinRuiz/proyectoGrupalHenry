import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/actions";

export const Login = () => {
  const isLocal = useSelector( state => state.isLocal );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useState(() => {
    JSON.parse(window.localStorage.getItem("activeUser")) == null &&
      window.localStorage.setItem("activeUser", JSON.stringify(false));
  }, []);

  //
  const { activeUser } = useSelector((state) => state);

  //
  const [show, setShow] = useState("password");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  //
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let user = '';
      isLocal
      ? user = await axios.get( `http://localhost:3001/user?username=${form.username}` )
      : user = await axios.get( `https://getfitserver.up.railway.app/user?username=${form.username}` );
      if (user.data.password == form.password) {
        console.log("Usuario y contraseña correctos", user.data);
        localStorage.setItem("activeUser", JSON.stringify(user.data?.id));
        dispatch(login(user.data));
        navigate("/home");
      } else {
        console.log("Contraseña incorrecta");
      }
    } catch (error) {
      console.log(error.response.data);
      alert("¡Usuario no encontrado!");
    }
  };

  const handleSuccess = async (CredentialsResponse) => {
    const credentialDecode = jwtDecode(CredentialsResponse.credential);
    console.log("CredentialsResponse", CredentialsResponse);
    console.log("CredentialDecode", credentialDecode);
    try {
      let user = '';
      isLocal
      ? user = await axios.get( `http://localhost:3001/user?email=${credentialDecode.email}` )
      : user = await axios.get( `https://getfitserver.up.railway.app/user?email=${credentialDecode.email}` );
      console.log(user.data);
      console.log("Este usuario ya existe, te logueamos");
      localStorage.setItem("activeUser", JSON.stringify(user.data?.id));
      dispatch(login(user.data));
      navigate("/home");

    } catch (error) {
      const nombreComp = credentialDecode.name;
      const nombreSep = nombreComp.split(" ");
      const email = credentialDecode.email;
      const username = email.split("@");

      const newUser = {
        username: username[0],
        name: nombreSep[0],
        surname: nombreSep[1],
        email: credentialDecode.email,
        img: credentialDecode.picture,
        isGoogle: true,
      };

      let user = '';

      isLocal
      ? user = await axios.post(`http://localhost:3001/user`, newUser)
      : user = await axios.post(`https://getfitserver.up.railway.app/user`, newUser);
      console.log("Usuario creado");
      localStorage.setItem("activeUser", JSON.stringify(user.data?.id));
      dispatch(login(user.data));
      navigate("/home");
    }
  };

  const handleError = () => {
    console.log("Login failed");
  };

  const switchIt = () => {
    setShow(show == "password" ? "text" : "password");
  };

  const logout = () => {
    dispatch(login({}));
  };

  return (
    <div>
      <div className="Logout">
        <button onClick={logout}> Log Out </button>
        <div>
          <label> USERNAME </label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label> PASSWORD </label>
          <input
            type={show}
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <button onClick={switchIt}> Mostrar </button>
        </div>
        <button onClick={handleSubmit}> Login </button>
      </div>
      <div className="GoogleAuth">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
      <p>
        ¿No tienes cuenta? <Link to={"/createuser"}>Crear Cuenta</Link>
      </p>
    </div>
  );
};

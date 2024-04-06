import axios from "axios";
import { useState } from "react";
import { Button, Form, FormLabel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fillUp } from "../../../redux/actions/actions";
import { ValidacionesUsuario } from "../../Validaciones/ValidacionesUsuario";

export const CreateUser = () => {
  const isLocal = useSelector( state => state.isLocal );
  const location = useLocation();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: "",
    password: "",
    isAdmin: false,
    name: "",
    surname: "",
    img: "",
    email: "",
    telephone: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const [errores, setErrores] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const completedForm = {
      username: form.username,
      password: form.password,
      isAdmin: form.isAdmin,
      name: form.name,
      surname: form.surname,
      img: imageURL,
      email: form.email,
      telephone: form.telephone,
      securityQuestion: form.securityQuestion,
      securityAnswer: form.securityAnswer,
    };

    const erroresValidacion = ValidacionesUsuario(form);

    if (!Object.keys(erroresValidacion).length) {
      try {
        isLocal
        ? await axios.post("http://localhost:3001/user", completedForm )
        : await axios.post("https://getfitserver.up.railway.app/user", completedForm );
        alert("¡Usuario creado!");
        setForm({
          username: "",
          password: "",
          isAdmin: false,
          name: "",
          surname: "",
          img: "",
          email: "",
          telephone: "",
          securityQuestion: "",
          securityAnswer: "",
        });
        setImageURL("");
        fillUp(dispatch);
        location.reload();
      } catch (error) {
        console.log({ Error_HandleSubmit: error });
        alert("¡Ocurrió un error!");
      }
    } else {
      setErrores(erroresValidacion);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    setErrores((prevErrores) => ({
      ...prevErrores,
      [name]: undefined,
    }));
  };

  console.log("Formulario so far: ", form);
  console.log(errores);

  // CLOUDINARY

  const [imageURL, setImageURL] = useState("");
  const [imagePublicId, setImagePublicId] = useState("");

  const changeUploadImage = async (event) => {
    try {
      const file = event.target.files[0];
      const data = new FormData();

      data.append("file", file);
      data.append("upload_preset", "hlm8qowi");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddiz6bdow/image/upload",
        data
      );

      setImageURL(response.data.secure_url);
      setImagePublicId(response.data.public_id);
      console.log(response.data);
    } catch (error) {
      setImageURL("");
      console.log(`Error uploading image ${error.message}`);
    }
  };

  const handleDeleteImage = async () => {
    setImageURL("");
  };

  return (
    <Form
      className="container"
      style={{ width: "400px" }}
      onSubmit={handleSubmit}
    >
      <div>
        <label>Photo: </label>
        <input
          name="image"
          type="file"
          accept="image/*"
          value={form.img}
          onChange={changeUploadImage}
        />
        {imageURL && (
          <div>
            <Image src={imageURL} roundedCircle style={{ width: "200px" }} />
            <br />
            <button type="button" onClick={handleDeleteImage}>
              Eliminar imagen
            </button>
          </div>
        )}
      </div>
      <Form.Group>
        <FormLabel>ADMIN: </FormLabel>
        <Button
          type="button"
          onClick={() =>
            setForm((prevInput) => ({ ...prevInput, isAdmin: true }))
          }
        >
          TRUE
        </Button>
        <Button
          type="button"
          onClick={() =>
            setForm((prevInput) => ({ ...prevInput, isAdmin: false }))
          }
        >
          FALSE
        </Button>
        <FormLabel> selected: {form.isAdmin ? "TRUE" : "FALSE"} </FormLabel>
      </Form.Group>
      <Form.Group>
        <Form.Control
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
      </Form.Group>
      {errores.username && <p>{errores.username}</p>}

      <Form.Group>
        <label>Password: </label>
        <Form.Control
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {errores.password && <p>{errores.password}</p>}
      </Form.Group>
      <Form.Group>
        <label>Name: </label>
        <Form.Control name="name" value={form.name} onChange={handleChange} />
        {errores.name && <p>{errores.name}</p>}
      </Form.Group>
      <Form.Group>
        <label>Surname: </label>
        <Form.Control
          name="surname"
          value={form.surname}
          onChange={handleChange}
        />
        {errores.surname && <p>{errores.surname}</p>}
      </Form.Group>
      <Form.Group>
        <label>Email: </label>
        <Form.Control name="email" value={form.email} onChange={handleChange} />
        {errores.email && <p>{errores.email}</p>}
      </Form.Group>
      <Form.Group>
        <label>Telefono: </label>
        <Form.Control
          name="telephone"
          value={form.telephone}
          onChange={handleChange}
        />
        {errores.telephone && <p>{errores.telephone}</p>}
      </Form.Group>
      <Form.Group>
        <label>Pregunta de seguridad: </label>
        <Form.Select
          aria-label="Default select example"
          name="securityQuestion"
          value={form.securityQuestion}
          onChange={handleChange}
        >
          <option> </option>
          <option value="Nombre de su primera mascota">
            {" "}
            Nombre de su primera mascota{" "}
          </option>
          <option value="Primer número telefónico">
            {" "}
            Primer número telefónico{" "}
          </option>
          <option value="Lugar preferido para vacacionar">
            {" "}
            Lugar preferido para vacacionar{" "}
          </option>
          <option value="Frase preferida de celebridad">
            {" "}
            Frase preferida de celebridad{" "}
          </option>
        </Form.Select>
      </Form.Group>
      {errores.securityQuestion && <p>{errores.securityQuestion}</p>}

      <Form.Group>
        <label>Respuesta de seguridad: </label>
        <Form.Control
          name="securityAnswer"
          value={form.securityAnswer}
          onChange={handleChange}
        />
      </Form.Group>
      {errores.securityAnswer && <p>{errores.securityAnswer}</p>}

      <Button style={{ width: "380px" }} type="submit">
        Submit
      </Button>
    </Form>
  );
};

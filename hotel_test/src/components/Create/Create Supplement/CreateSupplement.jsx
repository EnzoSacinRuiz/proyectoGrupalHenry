import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSupps } from "../../../redux/actions/actions.js";
import { ValidacionesSup } from "../../Validaciones/ValidacionesSup.jsx";

export const CreateSupplement = () => {
  const dispatch = useDispatch();
  const { allSupps, formulary_type, isLocal } = useSelector((state) => state);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    stock: "",
    price: "",
    description: "",
    category: "",
    flavor: null,
  });

  const [errores, setErrores] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresValidacion = ValidacionesSup(form, imageURL);

    const completedForm = {
      name: form.name,
      brand: form.brand,
      stock: form.stock,
      imgURL: imageURL,
      price: form.price,
      description: form.description,
      category: form.category,
      flavor: form.flavor,
    };

    if (Object.keys(erroresValidacion).length === 0) {
      try {
        isLocal
        ? await axios.post("http://localhost:3001/supps", completedForm)
        : await axios.post("https://getfitserver.up.railway.app/supps", completedForm);
        alert("Suplemento creado!");
        setForm({
          name: "",
          brand: "",
          stock: "",
          price: "",
          description: "",
          category: "",
          flavor: null,
        });
        setImageURL('');
        getSupps(dispatch);
      } catch (error) {
        console.log({ Error_HandleSubmit: error });
        alert("¡Ocurrió un error!");
      }
    } else {
      setErrores(erroresValidacion);
      alert("Por favor, completa el formulario correctamente.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevInput) => ({ ...prevInput, [name]: value }));

    const erroresValidacion = ValidacionesSup(form);
    setErrores(erroresValidacion);
  };

  const showme = () => {
    console.log("SUPPS EN E-G: ", allSupps);
  };

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
    <div>
      <button onClick={showme}> SHOW ME </button>
      {formulary_type == "create" && <h1>Create Supplement</h1>}
      {formulary_type == "update" && <h1>Update Supplement</h1>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={handleChange} />
          {errores.name && <p>{errores.name}</p>}
        </div>
        <div>
          <label>Price: </label>
          <input name="price" value={form.price} onChange={handleChange} />
          {errores.price && <p>{errores.price}</p>}
        </div>
        <div>
          <label>Brand: </label>
          <input name="brand" value={form.brand} onChange={handleChange} />
          {errores.brand && <p>{errores.brand}</p>}
        </div>
        <div>
          <label>Stock: </label>
          <input name="stock" value={form.stock} onChange={handleChange} />
          {errores.stock && <p>{errores.stock}</p>}
        </div>
        <div>
          <label>Description: </label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          {errores.description && <p>{errores.description}</p>}
        </div>
        <div>
          <label>Categoria: </label>
          <select name="category" value={form.category} onChange={handleChange}>
            <option hidden defaultValue>
              Categorias
            </option>
            <option value="Proteínas">Proteínas</option>
            <option value="Creatinas">Creatinas</option>
            <option value="Quemadores de grasa">Quemadores de grasa</option>
            <option value="Aminoácidos">Aminoácidos</option>
            <option value="Pre entreno">Pre entreno</option>
            <option value="Barras / Alimentos proteicos">
              Barras / Alimentos proteicos
            </option>
          </select>
          {errores.category && <p>{errores.category}</p>}
        </div>
        {form.category === "Proteínas" && (
          <div>
            <label>Flavor: </label>
            <select name="flavor" value={form.flavor} onChange={handleChange}>
              <option hidden defaultValue>
                Flavor
              </option>
              <option value="Frutilla">Frutilla</option>
              <option value="Chocolate">Chocolate</option>
              <option value="Vainilla">Vainilla</option>
              <option value="Banana">Banana</option>
            </select>
            {errores.flavor && <p>{errores.flavor}</p>}
          </div>
        )}
        <div>
          <label>Image: </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            value={form.image}
            onChange={changeUploadImage}
          />
          {imageURL && (
            <div>
              <img src={imageURL} alt="" />
              <button type="button" onClick={handleDeleteImage}>
                Eliminar imagen
              </button>
            </div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

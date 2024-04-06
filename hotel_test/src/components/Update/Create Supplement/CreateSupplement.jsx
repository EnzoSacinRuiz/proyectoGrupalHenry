import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSupps } from "../../../redux/actions/actions.js";
import { ValidacionesSup } from "../../ValidacionesSup/ValidacionesSup.jsx";

export const CreateSupplement = () => {
  const dispatch = useDispatch();
  const { allSupps, isLocal } = useSelector((state) => state);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    stock: "",
    imgURL: "",
    price: "",
    description: "",
    category: "",
    flavor: null,
  });

  const [errores, setErrores] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresValidacion = ValidacionesSup(form);

    if (Object.keys(erroresValidacion).length === 0) {
      try {
        isLocal
        ? await axios.post("http://localhost:3001/supps", form)
        : await axios.post("https://getfitserver.up.railway.app/supps", form);
        alert("Suplemento creado!");
        setForm({
          name: "",
          brand: "",
          stock: "",
          imgURL: "",
          price: "",
          description: "",
          category: "",
          flavor: null,
        });
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

  return (
    <div>
      <button onClick={showme}> SHOW ME </button>
      <h1> Create Supplement </h1>
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
          <label>Imagen: </label>
          <input name="imgURL" value={form.imgURL} onChange={handleChange} />
          {errores.imgURL && <p>{errores.imgURL}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

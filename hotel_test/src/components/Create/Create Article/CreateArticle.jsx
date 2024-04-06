import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fillSupps, mixAll } from "../../../redux/actions/actions";
import { ValidacionesShop } from "../../Validaciones/ValidacionesShop";
import Styles from "./CreateArticle.module.css";

export const CreateArticle = () => {
  const dispatch = useDispatch();
  const [errores, setErrores] = useState({});

  const { current_product_info, formulary_type, isLocal } = useSelector(
    (state) => state
  );
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
  });

  useEffect(() => {
    formulary_type == "update" &&
      (setForm({
        name: current_product_info.name,
        price: current_product_info.price,
        description: current_product_info.description,
        brand: current_product_info.brand,
      }),
      setVariation(current_product_info.variation),
      setImageURL(current_product_info.image));
    console.log(current_product_info);
  }, [current_product_info]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const erroresValidacion = ValidacionesShop(form);

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    const completedForm = {
      name: form.name,
      price: form.price,
      variation: variation,
      image: imageURL,
      description: form.description,
      brand: form.brand,
    };

    if(isLocal==true)
    {   // PETICIONES AL LOCALHOST BACK-END
      if (formulary_type == "create") {
        try {
          await axios.post("http://localhost:3001/fitness", completedForm);
          alert("Artículo creado!");
          setForm({
            name: "",
            price: "",
            variation: "",
            description: "",
            brand: "",
          });
          fillSupps(dispatch);
          mixAll(dispatch);
        } catch (error) {
          console.log({ Error_HandleSubmit: error });
          alert("¡Ocurrió un error!");
        }
      }
      if (formulary_type == "update") {
        try {
          await axios.put("http://localhost:3001/fitness", {
            id: current_product_info.id,
            form: completedForm,
          });
          alert("Artículo actualizado!");
          fillSupps(dispatch);
          mixAll(dispatch);
          location.reload();
        } catch (error) {
          console.log({ Error_HandleSubmit: error });
          alert("¡Ocurrió un error!");
        }
      }
    }
    else
    {   //PETICIONES AL DEPLOYED BACK-END
      if (formulary_type == "create") {
        try {
          await axios.post("https://getfitserver.up.railway.app/fitness", completedForm);
          alert("Artículo creado!");
          setForm({
            name: "",
            price: "",
            variation: "",
            description: "",
            brand: "",
          });
          fillSupps(dispatch);
          mixAll(dispatch);
        } catch (error) {
          console.log({ Error_HandleSubmit: error });
          alert("¡Ocurrió un error!");
        }
      }
      if (formulary_type == "update") {
        try {
          await axios.put("https://getfitserver.up.railway.app/fitness", {
            id: current_product_info.id,
            form: completedForm,
          });
          alert("Artículo actualizado!");
          fillSupps(dispatch);
          mixAll(dispatch);
          location.reload();
        } catch (error) {
          console.log({ Error_HandleSubmit: error });
          alert("¡Ocurrió un error!");
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const [variationInput, setVariationInput] = useState("");

  const [variation, setVariation] = useState([]);

  const handleAddVariation = () => {
    if (variationInput.trim() !== "" && !variation.includes(variationInput)) {
      setVariation([...variation, variationInput]);
      setVariationInput("");
    }
  };

  const handleRemoveVariation = (variationToRemove) => {
    const updatedVariation = variation.filter(
      (vars) => vars !== variationToRemove
    );
    setVariation(updatedVariation);
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
    <div className={Styles.createArticle}>
      {formulary_type == "create" && <h1>Create Article</h1>}
      {formulary_type == "update" && <h1>Update Article</h1>}
      <form onSubmit={handleSubmit}>
      <div>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={handleChange} />
          {errores.name && <p className="error-message">{errores.name}</p>}
        </div>
        <div>
          <label>Marca: </label>
          <input name="brand" value={form.brand} onChange={handleChange} />
          {errores.brand && <p className="error-message">{errores.brand}</p>}
        </div>
        <div>
          <label>Price: </label>
          <input name="price" value={form.price} onChange={handleChange} />
          {errores.price && <p className="error-message">{errores.price}</p>}
        </div>
        <div>
          <div>
            <label>Variation: </label>
            <input
              type="text"
              name="variation"
              autoComplete="off"
              value={variationInput}
              placeholder="Add one or more..."
              onChange={(e) => setVariationInput(e.target.value)}
            />
            <button type="button" onClick={handleAddVariation}>
              ADD
            </button>
          </div>
          <br />
          <div>
            {variation.map((variation, index) => (
              <div key={index}>
                {variation}
                <button
                  type="button"
                  onClick={() => handleRemoveVariation(variation)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
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
        <div>
          <label>Description: </label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          {errores.description && (
            <p className="error-message">{errores.description}</p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

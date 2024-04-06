import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ValidacionesShop } from "../../Validaciones/ValidacionesShop";
import Styles from "../Create Article/CreateArticle.module.css";

export const CreateClothe = () => {
  const { current_product_info, formulary_type, isLocal } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    type: "",
    price: "",
    description: "",
  });

  const [errores, setErrores] = useState({});

  const [selectedSizes, setSelectedSizes] = useState({
    sizes: [],
  });

  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    formulary_type === "update" &&
      setForm({
        name: current_product_info.name,
        brand: current_product_info.brand,
        type: current_product_info.type,
        price: current_product_info.price,
        description: current_product_info.description,
      });
  }, [current_product_info, formulary_type]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const erroresValidacion = ValidacionesShop(form, imageURL);

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    const completedForm = {
      name: form.name,
      brand: form.brand,
      type: form.type,
      price: form.price,
      image: imageURL,
      description: form.description,
      size: selectedSizes.sizes,
    };


    try {
      let response = '';
      if(isLocal==true)
      {
        response = await axios.post("http://localhost:3001/remeras", completedForm);
      }
      else
      {
        response = await axios.post("https://getfitserver.up.railway.app/remeras", completedForm);
      }
      console.log("API Response:", response.data);

      if (response.data.success) {
        alert("Indumentaria creada exitosamente!");
      } else {
        alert("Error al crear la indumentaria. Por favor, verifica la consola para más detalles.");
      }

      setForm({
        name: "",
        brand: "",
        type: "",
        price: "",
        description: "",
      });
      setSelectedSizes({ sizes: [] });
      setErrores({});

    } catch (error) {
      console.error("Error_HandleSubmit:", error);
      alert("¡Ocurrió un error! Consulta la consola para obtener más detalles.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSizeSelect = (event) => {
    const selectedSize = event.target.value;
    if (selectedSize && !selectedSizes.sizes.includes(selectedSize)) {
      setSelectedSizes({
        sizes: [...selectedSizes.sizes, selectedSize],
      });
    }
  };

  const handleRemoveSize = (sizeToRemove) => {
    const updatedSizes = selectedSizes.sizes.filter(
      (size) => size !== sizeToRemove
    );
    setSelectedSizes({
      sizes: updatedSizes,
    });
  };

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
      {formulary_type === "create" && <h1>Create Clothe</h1>}
      {formulary_type === "update" && <h1>Update Clothe</h1>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={handleChange} />
          {errores.name && <p className="error-message">{errores.name}</p>}
        </div>
        <div>
          <label>Brand: </label>
          <input name="brand" value={form.brand} onChange={handleChange} />
          {errores.brand && <p className="error-message">{errores.brand}</p>}
        </div>
        <div>
          <label>Type: </label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option> </option>
            <option value="Shoe"> Shoe </option>
            <option value="Shirt"> Shirt </option>
          </select>
          {errores.type && <p className="error-message">{errores.type}</p>}
        </div>
        <div>
          <label>Price: </label>
          <input name="price" value={form.price} onChange={handleChange} />
          {errores.price && <p className="error-message">{errores.price}</p>}
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
          {errores.image && <p className="error-message">{errores.image}</p>}
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
        {form.type === "Shoe" && (
          <div>
            <label>Size: </label>
            <select
              name="size"
              value={selectedSizes}
              onChange={handleSizeSelect}
            >
              <option key="35" value="35">
                {" "}
                35{" "}
              </option>
              <option key="36" value="36">
                {" "}
                36{" "}
              </option>
              <option key="37" value="37">
                {" "}
                37{" "}
              </option>
              <option key="38" value="38">
                {" "}
                38{" "}
              </option>
              <option key="39" value="39">
                {" "}
                39{" "}
              </option>
              <option key="40" value="40">
                {" "}
                40{" "}
              </option>
              <option key="41" value="41">
                {" "}
                41{" "}
              </option>
              <option key="42" value="42">
                {" "}
                42{" "}
              </option>
              <option key="43" value="43">
                {" "}
                43{" "}
              </option>
            </select>
          </div>
        )}

        {form.type === "Shirt" && (
          <div>
            <label>Size: </label>
            <select
              name="size"
              value={selectedSizes}
              onChange={handleSizeSelect}
            >
              <option key="S" value="S">
                {" "}
                S{" "}
              </option>
              <option key="M" value="M">
                {" "}
                M{" "}
              </option>
              <option key="L" value="L">
                {" "}
                L{" "}
              </option>
              <option key="XL" value="XL">
                {" "}
                XL{" "}
              </option>
              <option key="XXL" value="XXL">
                {" "}
                XXL{" "}
              </option>
            </select>
          </div>
        )}
        <div>
          {selectedSizes.sizes.map((selectedSize, index) => (
            <div key={index}>
              {selectedSize}
              <button
                type="button"
                onClick={() => handleRemoveSize(selectedSize)}
              >
                X
              </button>
            </div>
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

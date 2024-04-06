import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fillSupps, mixAll } from "../../../redux/actions/actions";
import Styles from "./CreateArticle.module.css";

export const CreateArticle = () => {
  const isLocal = useSelector( state => state.isLocal );
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    price: "",
    variation: [],
    image: "",
    description: "",
    brand: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const completedForm = {
      name: form.name,
      price: form.price,
      variation: variation,
      image: form.image,
      description: form.description,
      brand: form.brand,
    };
    try {
      isLocal
      ? await axios.post( "http://localhost:3001/fitness", completedForm )
      : await axios.post( "https://getfitserver.up.railway.app/fitness", completedForm );
      alert("Artículo creado!");
      setForm({
        name: "",
        price: "",
        variation: "",
        image: "",
        description: "",
        brand: "",
      });
      fillSupps(dispatch);
      mixAll(dispatch);
    } catch (error) {
      console.log({ Error_HandleSubmit: error });
      alert("¡Ocurrió un error!");
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

  console.log("Formulario so far: ", form);

  return (
    <div className={Styles.createArticle}>
      <h1>Create Article</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label>Marca: </label>
          <input name="brand" value={form.brand} onChange={handleChange} />
        </div>
        <div>
          <label>Price: </label>
          <input name="price" value={form.price} onChange={handleChange} />
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
          <input name="image" value={form.image} onChange={handleChange} />
        </div>
        <div>
          <label>Description: </label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

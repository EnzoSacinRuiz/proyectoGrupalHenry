import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fillShirts, fillShoes, mixAll } from "../../../redux/actions/actions";
import Styles from "../Create Article/CreateArticle.module.css";

export const CreateClothe = () => {
  const { allShirts, allShoes, allFit } = useSelector( state => state );
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    brand: "",
    type: "",
    price: "",
    image: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const completedForm = {
      name: form.name,
      brand: form.brand,
      type: form.type,
      price: form.price,
      image: form.image,
      description: form.description,
      size: selectedSizes.sizes,
    };
    try {
      if(isLocal==true)
      {
        form.type == "Shoe" &&
          (await axios.post("http://localhost:3001/zapatos", completedForm),
          await fillShoes(dispatch),
          mixAll(dispatch));
        form.type == "Shirt" &&
          (await axios.post("http://localhost:3001/remeras", completedForm),
          await fillShirts(dispatch),
          mixAll(dispatch));
      }
      else
      {
        form.type == "Shoe" &&
          (await axios.post("https://getfitserver.up.railway.app/zapatos", completedForm),
          await fillShoes(dispatch),
          mixAll(dispatch));
        form.type == "Shirt" &&
          (await axios.post("https://getfitserver.up.railway.app/remeras", completedForm),
          await fillShirts(dispatch),
          mixAll(dispatch));
      }
      alert("Indumentaria creada!");
      setForm({
        name: "",
        brand: "",
        type: "",
        price: "",
        image: "",
        description: "",
      });
      setSelectedSizes({ sizes: [] });
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

  const [selectedSizes, setSelectedSizes] = useState({
    sizes: [],
  });

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

  return (
    <div className={Styles.createArticle}>
        <h1>Create Clothe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label>Brand: </label>
          <input name="brand" value={form.brand} onChange={handleChange} />
        </div>
        <div>
          <label>Type: </label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option> </option>
            <option value="Shoe"> Shoe </option>
            <option value="Shirt"> Shirt </option>
          </select>
        </div>
        <div>
          <label>Price: </label>
          <input name="price" value={form.price} onChange={handleChange} />
        </div>
        <div>
          <label>Image: </label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        {form.type == "Shoe" && (
          <div>
            <label>Size: </label>
            <select name="size" value={selectedSizes} onChange={handleSizeSelect}>
              <option key="35" value="35"> 35 </option>
              <option key="36" value="36"> 36 </option>
              <option key="37" value="37"> 37 </option>
              <option key="38" value="38"> 38 </option>
              <option key="39" value="39"> 39 </option>
              <option key="40" value="40"> 40 </option>
              <option key="41" value="41"> 41 </option>
              <option key="42" value="42"> 42 </option>
              <option key="43" value="43"> 43 </option>
            </select>
          </div>
        )}
        {form.type == "Shirt" && (
          <div>
            <label>Size: </label>
            <select name="size" value={selectedSizes} onChange={handleSizeSelect}>
              <option key="S" value="S"> S </option>
              <option key="M" value="M"> M </option>
              <option key="L" value="L"> L </option>
              <option key="XL" value="XL"> XL </option>
              <option key="XXL" value="XXL"> XXL </option>
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
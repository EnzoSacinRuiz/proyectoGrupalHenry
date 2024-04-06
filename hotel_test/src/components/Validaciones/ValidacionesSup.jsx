export const ValidacionesSup = (form, imageURL) => {
    let errores = {};
  
    
    if (!form.name || form.name.trim().length < 3 || form.name.trim().length > 30) {
      errores.name = "El nombre debe tener entre 3 y 30 caracteres.";
    }
  
    
    if (!form.brand || form.brand.trim().length < 3 || form.brand.trim().length > 30) {
      errores.brand = "La marca debe tener entre 3 y 30 caracteres.";
    }
  
    
    const stockNum = parseInt(form.stock, 10);
    if (isNaN(stockNum) || stockNum < 10 || stockNum > 100) {
      errores.stock = "El stock debe ser un número entre 10 y 100.";
    }
  

    if (isNaN(form.price)) {
      errores.price = "El precio debe ser un número.";
    }
  
    
    if (!form.description || form.description.trim().length < 20) {
      errores.description = "La descripción debe tener al menos 20 caracteres.";
    }
  
    
    if (!form.category) {
      errores.category = "Selecciona una categoría.";
    }
  
    
    if (form.category === "Proteínas" && !form.flavor) {
      errores.flavor = "Selecciona un sabor para la categoría Proteínas.";
    }
  
    if (!imageURL)
    {
      errores.image = "Ingresa una imagen.";
    }
  
    return errores;
  };
  
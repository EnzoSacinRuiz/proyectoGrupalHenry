export const ValidacionesShop = (form, imageURL) => {
    let errores = {};

    if (!form.name || form.name.trim().length < 3 || form.name.trim().length > 30) {
      errores.name = "El nombre debe tener entre 3 y 30 caracteres.";
    }

    if (!form.price || !/^\d+$/.test(form.price)) {
      errores.price = "Ingresa un precio válido (solo números permitidos).";
    }

    if (!form.description || form.description.trim().length < 3) {
      errores.description = "Ingresa una descripción válida (mínimo 3 caracteres).";
    }

    if (!form.brand || form.brand.trim().length < 3 || form.brand.trim().length > 30) {
      errores.brand = "La marca debe tener entre 3 y 30 caracteres.";
    }

    if (!imageURL) {
      errores.image = "Ingresa una imagen.";
    }

    if (!form.type) {
      errores.type = "Selecciona un tipo.";
    }

    
  
    return errores;
  };
  
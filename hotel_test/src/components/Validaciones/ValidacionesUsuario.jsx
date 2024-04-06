export const ValidacionesUsuario = (form) => {
    let errores = {};
  
    if (!form.username || form.username.trim().length < 3 || form.username.trim().length > 30) {
      errores.username = "El nombre de usuario debe tener entre 3 y 30 caracteres.";
    }
  
    if (!form.password || form.password.trim().length < 6) {
      errores.password = "La contraseña debe tener al menos 6 caracteres.";
    }
  
    if (!form.name || form.name.trim().length < 3 || form.name.trim().length > 30) {
      errores.name = "El nombre debe tener entre 3 y 30 caracteres.";
    }
  
    if (!form.surname || form.surname.trim().length < 3 || form.surname.trim().length > 30) {
      errores.surname = "El apellido debe tener entre 3 y 30 caracteres.";
    }
  
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errores.email = "Ingresa un correo electrónico válido.";
    }
  
    if (!form.telephone || !/^\d+$/.test(form.telephone)) {
      errores.telephone = "Ingresa un número de teléfono válido (solo números permitidos).";
    }
    
  
    if (!form.securityQuestion) {
      errores.securityQuestion = "Selecciona una pregunta de seguridad.";
    }
  
    if (!form.securityAnswer || form.securityAnswer.trim().length < 3) {
      errores.securityAnswer = "Ingresa una respuesta de seguridad válida (mínimo 3 caracteres).";
    }
  
    return errores;
  };
  
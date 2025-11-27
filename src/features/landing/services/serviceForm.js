export const sendFormData = async (formData) => {
  try {
    // Determine the community value - use otraComunidad if comunidad is "OTROS"
    const comunidadValue = formData.comunidad === "OTROS"
      ? formData.otraComunidad
      : formData.comunidad;

    const payload = {
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      numeroTelefono: formData.telefono,
      email: formData.email,
      calle: "Sin especificar",
      numeroExterior: "0",
      codigoPostal: "00000",
      colonia: "Sin especificar",
      municipio: formData.municipio,
      estado: formData.estado,
      comunidadPerteneciente: comunidadValue,
      porQueMeInteresa: formData.motivo
    }

    const url = `${import.meta.env.VITE_API_SERVICES_FORM}/forms`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al enviar formulario');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message }
  }
}

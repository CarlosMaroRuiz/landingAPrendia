/**
 * Get API URL based on environment
 */
const getApiUrl = (endpoint) => {
  // Use proxy during development, direct URL for production
  if (import.meta.env.MODE === 'development') {
    return `/api/form${endpoint}`;
  }
  return `${import.meta.env.VITE_API_SERVICES_FORM}${endpoint}`;
};

export const sendFormData = async (formData) => {
  try {
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
      porQueMeInteresa: formData.motivo
    }

    const url = getApiUrl('/forms');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error('Error al enviar formulario')
    }

    try {
      const data = JSON.parse(responseText);
      return { success: true, data }
    } catch {
      throw new Error('Respuesta inválida del servidor');
    }
  } catch (error) {
    console.error('Error en sendFormData:', error)
    return { success: false, error: error.message }
  }
}

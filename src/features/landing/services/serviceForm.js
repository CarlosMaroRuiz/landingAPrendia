import { apiClient } from '../../../core/api/apiClient';

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

    const data = await apiClient.post('/forms', payload);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message }
  }
}

import envConfig from '../core/env/enviromentConfig'

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

    const response = await fetch(`${envConfig.apiForm}/forms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error('Error al enviar formulario')
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('Error en sendFormData:', error)
    return { success: false, error: error.message }
  }
}

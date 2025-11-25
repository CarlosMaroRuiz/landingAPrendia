import environment from '../../../common/iu/environment.js'

export const getMunicipalitiesByState = async (stateId) => {
  try {
    const response = await fetch(`${environment.apiCore}/municipalities/state/${stateId}`)

    if (!response.ok) {
      throw new Error('Error al obtener municipios')
    }

    const data = await response.json()

    const municipalityNames = data.data.map(municipality => municipality.nombre)

    return municipalityNames
  } catch (error) {
    console.error("Oh no ocurrio un problema con el internet")
    return []
  }
}

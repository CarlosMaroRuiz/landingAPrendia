export const getMunicipalitiesByState = async (stateId) => {
  try {
    const apiUrl = `${import.meta.env.VITE_API_CORE}/municipalities/state/${stateId}`

    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error('Error al obtener municipios')
    }

    const data = await response.json()

    const municipalityNames = data.data.map(municipality => municipality.nombre)


    const sortedMunicipalities = municipalityNames.sort((a, b) =>
      a.localeCompare(b, 'es', { sensitivity: 'base' })
    )

    return sortedMunicipalities
  } catch (error) {
    console.error("Error al obtener municipios:", error)
    return []
  }
}

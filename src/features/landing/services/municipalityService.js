/**
 * Get API URL based on environment
 */
const getApiUrl = (endpoint) => {
  // Use proxy during development, direct URL for production
  if (import.meta.env.MODE === 'development') {
    return `/api/core${endpoint}`;
  }
  return `${import.meta.env.VITE_API_CORE}${endpoint}`;
};

export const getMunicipalitiesByState = async (stateId) => {
  try {
    // Use proxy route during development, direct URL for production
    const apiUrl = getApiUrl(`/municipalities/state/${stateId}`)

    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error('Error al obtener municipios')
    }

    const data = await response.json()

    const municipalityNames = data.data.map(municipality => municipality.nombre)

    // Sort alphabetically A-Z using localeCompare for proper Spanish character handling
    const sortedMunicipalities = municipalityNames.sort((a, b) =>
      a.localeCompare(b, 'es', { sensitivity: 'base' })
    )

    return sortedMunicipalities
  } catch (error) {
    console.error("Error al obtener municipios:", error)
    return []
  }
}

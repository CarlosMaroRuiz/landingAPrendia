export const getStats = async () => {
  try {
    const apiUrl = `${import.meta.env.VITE_API_SERVICES_FORM}/forms/stats`;
    const token = localStorage.getItem('token');

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener estadísticas');
    }

    const data = await response.json();

    return {
      totalRegistros: data.totalRegistros || 0,
      registrosAtendidos: data.registrosAtendidos || 0,
      registrosNoAtendidos: data.registrosNoAtendidos || 0,
      success: true,
      error: null
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      totalRegistros: 0,
      registrosAtendidos: 0,
      registrosNoAtendidos: 0,
      success: false,
      error: error.message
    };
  }
};

export const getTopMunicipalities = async () => {
  try {
    const apiUrl = `${import.meta.env.VITE_API_SERVICES_FORM}/forms/top-municipalities`;
    const token = localStorage.getItem('token');

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener municipios');
    }

    const data = await response.json();
    const municipalities = Array.isArray(data) ? data : [];

    return {
      data: municipalities,
      success: true,
      error: null
    };
  } catch (error) {
    console.error('Error fetching top municipalities:', error);
    return {
      data: [],
      success: false,
      error: error.message
    };
  }
};

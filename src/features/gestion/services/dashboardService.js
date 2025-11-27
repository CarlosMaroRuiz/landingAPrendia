export const getStats = async () => {
  try {
    const url = import.meta.env.MODE === 'development'
      ? '/api/forms/stats'
      : `${import.meta.env.VITE_API_SERVICES_FORM}/forms/stats`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
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
    const url = import.meta.env.MODE === 'development'
      ? '/api/forms/top-municipalities'
      : `${import.meta.env.VITE_API_SERVICES_FORM}/forms/top-municipalities`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
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

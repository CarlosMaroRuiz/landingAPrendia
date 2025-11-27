import { apiClient } from '../../../core/api/apiClient';

export const getStats = async () => {
  try {
    const data = await apiClient.get('/forms/stats');

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
    const data = await apiClient.get('/forms/top-municipalities');
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

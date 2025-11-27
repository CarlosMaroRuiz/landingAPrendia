import { apiClient } from '../../../core/api/apiClient';

export const getInteresados = async (params = {}) => {
  const { page = 1, search = '', community = '', municipality = '' } = params;

  try {
    // Fetch from forms endpoint
    // apiClient handles the base URL (/api in dev, VITE_API_URL in prod)
    // and the Authorization header automatically
    const data = await apiClient.get('/forms');

    const forms = Array.isArray(data) ? data : data.data || [];

    // Map API response to table format
    const mappedForms = forms.map((form) => ({
      id: form.id || '',
      name: form.nombre || '',
      lastName: form.apellidos || '',
      email: form.email || '',
      phone: form.numeroTelefono || '',
      city: form.municipio || '',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${form.email}`,
      community: form.comunidadPerteneciente || form.colonia || '',
      registrationDate: form.createdAt ? new Date(form.createdAt).toLocaleDateString() : '',
      postalCode: form.codigoPostal || '',
      interest: form.porQueMeInteresa || '',
      atendido: form.atendido === true || form.atendido === 'true'
    }));

    // Apply filters
    let filtered = mappedForms;

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.id.toLowerCase().includes(searchLower)
      );
    }

    // Filter by community
    if (community) {
      filtered = filtered.filter(user =>
        user.community.toLowerCase() === community.toLowerCase()
      );
    }

    // Filter by municipality
    if (municipality) {
      filtered = filtered.filter(user => {
        const userCity = (user.city || '').trim();
        const searchMunicipality = municipality.trim();

        // Normalize strings to remove accents and special characters
        const normalizeString = (str) => {
          return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, ''); // Remove accents
        };

        const normalizedUserCity = normalizeString(userCity);
        const normalizedSearch = normalizeString(searchMunicipality);

        return normalizedUserCity.includes(normalizedSearch);
      });
    }

    // Simple pagination
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const paginatedData = filtered.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    };
  } catch (error) {
    console.error('Error fetching interesados:', error);
    // Return empty result on error instead of throwing
    return {
      data: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      error: error.message
    };
  }
};

/**
 * Get a single interested person by ID
 */
export const getInteresadoById = async (id) => {
  try {
    const form = await apiClient.get(`/forms/${id}`);

    // Map to table format
    return {
      id: form.id || '',
      name: form.nombre || '',
      lastName: form.apellidos || '',
      email: form.email || '',
      phone: form.numeroTelefono || '',
      city: form.municipio || '',
      community: form.colonia || '',
      registrationDate: form.createdAt ? new Date(form.createdAt).toLocaleDateString() : '',
      postalCode: form.codigoPostal || '',
      interest: form.porQueMeInteresa || '',
      atendido: form.atendido === true || form.atendido === 'true'
    };
  } catch (error) {
    console.error('Error fetching interesado:', error);
    throw error;
  }
};

/**
 * Update the attended status of a form
 */
export const updateAttendedStatus = async (formId, atendido) => {
  try {
    const data = await apiClient.patch(`/forms/${formId}/atendido`, { atendido });

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error updating attended status:', error);
    return {
      success: false,
      error: error.message || 'Error desconocido al actualizar el estado'
    };
  }
};

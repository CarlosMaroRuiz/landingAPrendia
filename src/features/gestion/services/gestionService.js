export const getInteresados = async (params = {}) => {
  const { page = 1, search = '', community = '', municipality = '' } = params;

  try {
    const token = localStorage.getItem('token');

    // Fetch from forms endpoint (this endpoint returns all forms)
    const formsUrl = import.meta.env.MODE === 'development'
      ? '/api/forms'
      : `${import.meta.env.VITE_API_SERVICES_FORM}/forms`;

    const response = await fetch(formsUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
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
      interest: form.porQueMeInteresa || ''
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
    const token = localStorage.getItem('token');

    const url = import.meta.env.MODE === 'development'
      ? `/api/forms/${id}`
      : `${import.meta.env.VITE_API_SERVICES_FORM}/forms/${id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const form = await response.json();

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
      interest: form.porQueMeInteresa || ''
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
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const url = import.meta.env.MODE === 'development'
      ? `/api/forms/${formId}/atendido`
      : `${import.meta.env.VITE_API_SERVICES_FORM}/forms/${formId}/atendido`;

    console.log('Updating attended status:', { url, formId, atendido });

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ atendido })
    });

    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        // If response is not JSON, use the status text
        console.error('Error parsing error response:', e);
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
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

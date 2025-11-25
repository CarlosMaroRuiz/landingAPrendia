/**
 * Get API URL based on environment
 */
const getApiUrl = (endpoint) => {
  // Use proxy during development, direct URL for production
  if (import.meta.env.MODE === 'development') {
    return `/api/form${endpoint}`;
  }
  return `${import.meta.env.VITE_API_SERVICES_FORM}${endpoint}`;
};

export const getInteresados = async (params = {}) => {
  const { page = 1, search = '', community = '', municipality = '' } = params;

  try {
    const token = localStorage.getItem('token');

    // Fetch from forms endpoint (this endpoint returns all forms)
    const response = await fetch(getApiUrl('/forms'), {
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
    const limit = 7;
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
      limit: 7,
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

    const response = await fetch(getApiUrl(`/forms/${id}`), {
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

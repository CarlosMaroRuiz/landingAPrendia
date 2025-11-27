/* eslint-disable no-restricted-globals */

// Helper to normalize strings (remove accents, etc.)
const normalizeString = (str) => {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};

// Helper to map API data to domain model
const mapUser = (form) => ({
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
});

let intervalId = null;
let lastDataHash = null;
let currentConfig = {
    token: null,
    baseUrl: '',
    params: {
        page: 1,
        search: '',
        community: '',
        municipality: ''
    }
};

const fetchData = async () => {
    try {
        const { token, baseUrl, params } = currentConfig;

        if (!baseUrl) return;

        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        };

        // Fetch all forms to filter in worker (simulating heavy processing)
        // In a real scenario with thousands of records, you might still want backend pagination
        // but here we are offloading the filtering/processing of the result.
        // For this implementation, we'll fetch from /forms which returns all or paginated depending on backend.
        // Assuming /forms returns all for client-side filtering as per previous logic simulation
        // OR we respect backend pagination if the backend supports it.
        // The previous service used apiClient.get('/forms') which likely returned all items 
        // and then filtered them in JS. We will replicate that.

        const response = await fetch(`${baseUrl}/forms`, {
            method: 'GET',
            headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let rawData = await response.json();
        // Handle different response structures
        const forms = Array.isArray(rawData) ? rawData : rawData.data || [];

        // 1. Map
        const mappedForms = forms.map(mapUser);

        // 2. Filter
        let filtered = mappedForms;

        if (params.search) {
            const searchLower = params.search.toLowerCase();
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower) ||
                user.id.toLowerCase().includes(searchLower)
            );
        }

        if (params.community) {
            filtered = filtered.filter(user =>
                user.community.toLowerCase() === params.community.toLowerCase()
            );
        }

        if (params.municipality) {
            filtered = filtered.filter(user => {
                const userCity = (user.city || '').trim();
                const searchMunicipality = params.municipality.trim();
                return normalizeString(userCity).includes(normalizeString(searchMunicipality));
            });
        }

        // 3. Paginate
        const limit = 10;
        const startIndex = (params.page - 1) * limit;
        const paginatedData = filtered.slice(startIndex, startIndex + limit);

        const result = {
            data: paginatedData,
            total: filtered.length,
            page: params.page,
            limit,
            totalPages: Math.ceil(filtered.length / limit)
        };

        // 4. Diff
        const newHash = JSON.stringify(result);
        if (newHash !== lastDataHash) {
            lastDataHash = newHash;
            self.postMessage({ type: 'DATA_UPDATED', payload: result });
        }

    } catch (error) {
        self.postMessage({ type: 'ERROR', error: error.message });
    }
};

self.onmessage = (e) => {
    const { action, payload } = e.data;

    switch (action) {
        case 'START':
            currentConfig = { ...currentConfig, ...payload };
            // Fetch immediately then interval
            fetchData();
            if (!intervalId) {
                intervalId = setInterval(fetchData, 2000);
            }
            break;

        case 'UPDATE_PARAMS':
            currentConfig = { ...currentConfig, ...payload };
            // Trigger fetch immediately on param change for responsiveness
            fetchData();
            break;

        case 'STOP':
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            break;
    }
};

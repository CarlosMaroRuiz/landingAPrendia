import { formatValidationMessage } from '../utils/errorFormatter';

/**
 * Centralized API Client for handling HTTP requests
 */
class ApiClient {
    constructor() {
        this.baseUrl = this.getBaseUrl();
    }

    /**
     * Determine the base URL based on the environment
     */
    getBaseUrl() {
        if (import.meta.env.MODE === 'development') {
            return '/api';
        }
        return import.meta.env.VITE_API_URL || '';
    }

    /**
     * Get headers with authorization token if available
     */
    getHeaders(customHeaders = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...customHeaders,
        };

        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    /**
     * Handle response parsing and error handling
     */
    async handleResponse(response) {
        let data;
        const contentType = response.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');

        try {
            if (isJson) {
                data = await response.json();
            } else {
                data = await response.text();
            }
        } catch (error) {
            throw new Error('Error al procesar la respuesta del servidor');
        }

        if (!response.ok) {
            let errorMsg = 'Error desconocido';

            if (typeof data === 'string') {
                errorMsg = data;
            } else if (typeof data === 'object' && data !== null) {
                // Handle NestJS standard error structure
                // { statusCode: 400, message: "...", error: "Bad Request" }
                errorMsg = data.message || data.error || 'Error en la petición';
            }

            // Handle nested error objects (e.g. from global filters)
            if (typeof errorMsg === 'object' && errorMsg !== null && errorMsg.message) {
                errorMsg = errorMsg.message;
            }

            // Format/Translate the error message
            const formattedError = formatValidationMessage(errorMsg);
            throw new Error(formattedError);
        }

        return data;
    }

    /**
     * GET request
     */
    async get(endpoint, headers = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'GET',
                headers: this.getHeaders(headers),
            });
            return await this.handleResponse(response);
        } catch (error) {
            throw error;
        }
    }

    /**
     * POST request
     */
    async post(endpoint, body, headers = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: this.getHeaders(headers),
                body: JSON.stringify(body),
            });
            return await this.handleResponse(response);
        } catch (error) {
            throw error;
        }
    }

    /**
     * PUT request
     */
    async put(endpoint, body, headers = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'PUT',
                headers: this.getHeaders(headers),
                body: JSON.stringify(body),
            });
            return await this.handleResponse(response);
        } catch (error) {
            throw error;
        }
    }

    /**
     * PATCH request
     */
    async patch(endpoint, body, headers = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'PATCH',
                headers: this.getHeaders(headers),
                body: JSON.stringify(body),
            });
            return await this.handleResponse(response);
        } catch (error) {
            throw error;
        }
    }

    /**
     * DELETE request
     */
    async delete(endpoint, headers = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'DELETE',
                headers: this.getHeaders(headers),
            });
            return await this.handleResponse(response);
        } catch (error) {
            throw error;
        }
    }
}

export const apiClient = new ApiClient();

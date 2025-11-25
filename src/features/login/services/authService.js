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

/**
 * Login with username and password
 */
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(getApiUrl('/auth/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (!response.ok) {
      let errorMessage = 'Error al iniciar sesión';

      // Try to parse error response
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const error = await response.json();
          errorMessage = error.message || error.error || errorMessage;
        } else {
          // Server returned HTML or other non-JSON response
          const text = await response.text();
          console.error('Server response:', text.substring(0, 100));
        }
      } catch (e) {
        // Error parsing response
        console.error('Error parsing response:', e);
      }

      // Provide user-friendly error messages based on status code
      if (response.status === 401 || response.status === 400) {
        errorMessage = 'Usuario o contraseña incorrectos';
      } else if (response.status === 500) {
        errorMessage = 'Error en el servidor. Intenta más tarde';
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Store token in localStorage
    if (data.access_token || data.token) {
      localStorage.setItem('token', data.access_token || data.token);
      localStorage.setItem('user', JSON.stringify(data));
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error en loginUser:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Logout user
 */
export const logoutUser = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true };
  } catch (error) {
    console.error('Error en logoutUser:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get current user from localStorage
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

/**
 * Get stored token
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

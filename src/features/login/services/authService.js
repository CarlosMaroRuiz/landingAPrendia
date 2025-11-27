/**
 * Login with username and password
 */
export const loginUser = async (username, password) => {
  try {
    const url = import.meta.env.MODE === 'development'
      ? '/api/auth/login'
      : `${import.meta.env.VITE_API_SERVICES_FORM}/auth/login`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al iniciar sesión');
    }

    const data = await response.json();

    // Store token in localStorage
    if (data.access_token || data.token) {
      localStorage.setItem('token', data.access_token || data.token);
      localStorage.setItem('user', JSON.stringify(data));
    }

    return { success: true, data };
  } catch (error) {
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

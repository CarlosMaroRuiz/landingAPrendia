import { useState, useCallback } from 'react';

/**
 * Hook to handle async operations with loading, data and error states
 * @param {Function} asyncFunction - The async function to execute
 */
const useAsync = (asyncFunction) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await asyncFunction(...args);
            setData(response);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [asyncFunction]);

    const reset = useCallback(() => {
        setData(null);
        setLoading(false);
        setError(null);
    }, []);

    return { execute, data, loading, error, reset };
};

export default useAsync;

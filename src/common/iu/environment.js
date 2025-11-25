const environment = {
  apiCore: import.meta.env.VITE_API_CORE || 'http://localhost:3000',
  apiForm: import.meta.env.VITE_API_SERVICES_FORM || 'http://localhost:4000',
}

export default environment

class EnviromentConfig{

    constructor(){
        const isProd = import.meta.env.PROD

        // En producción usa el proxy de Vercel, en desarrollo usa las URLs directas
        this.apiCore = isProd ? "/api/core" : import.meta.env.VITE_API_CORE
        this.apiForm = isProd ? "/api/form" : import.meta.env.VITE_API_SERVICES_FORM
    }
}
const envConfig = new EnviromentConfig()
export default envConfig
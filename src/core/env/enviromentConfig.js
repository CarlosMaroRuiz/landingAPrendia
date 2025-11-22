class EnviromentConfig{

    constructor(){
        this.apiCore = import.meta.env.VITE_API_CORE;
        this.apiForm = import.meta.env.VITE_API_SERVICES_FORM 
    }
}
const envConfig = new EnviromentConfig()
export default envConfig
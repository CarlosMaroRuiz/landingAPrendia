import { TextInput } from "../molecules"

const InputsForms = ({ formData = {}, onInputChange = () => {} }) => {
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      onInputChange({ ...formData, [name]: value });
   };

   return <section className="flex flex-col mt-12 gap-y-6">
          <TextInput
             label="Usuario"
             placeholder="Ingresa tu usuario"
             type="text"
             name="username"
             value={formData.username || ''}
             onChange={handleInputChange}
          />
          <TextInput
             label="Contraseña"
             placeholder="Ingresa tu contraseña"
             type="password"
             name="password"
             value={formData.password || ''}
             onChange={handleInputChange}
          />
   </section>
}
export default InputsForms
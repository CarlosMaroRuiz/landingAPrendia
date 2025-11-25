import { TextInput } from "../molecules"

const InputsForms = () =>{
   return <section className="flex flex-col mt-12 gap-y-6">
          <TextInput label="Correo Electrónico" placeholder="Ingresa tu correo" type="email" />
           <TextInput label="Contraseña" placeholder="" type="password" />
   </section>
}
export default InputsForms
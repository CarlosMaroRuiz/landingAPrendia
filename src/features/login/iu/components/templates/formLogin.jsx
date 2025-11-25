import PrimaryButton from "../../../../../common/iu/components/atoms/button"
import {ForgotPassword, TitleLogin} from "../molecules"
import { InputsForm } from "../organisms"

const FormLogin = () =>{

  return <form className="bg-[#FFFFFF] border-1 border-[#E5E7EB] rounded-xl py-10 px-11 w-full ml-10">
      <TitleLogin/>
      <InputsForm/>
      <ForgotPassword/>
      <PrimaryButton text={"Iniciar Seccion"} className={"w-full py-1 text-sm"}/>
  </form>
}
export default FormLogin
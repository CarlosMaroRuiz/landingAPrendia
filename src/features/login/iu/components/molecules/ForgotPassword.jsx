import { Checkbox } from "../atoms";
import { useState } from "react";
const ForgotPassword = () =>{
  const [remember, setRemember] = useState(false);
    return <section className="flex justify-between flex-wrap items-center my-5">
 <Checkbox
        label="Recordarme"
        checked={remember}
        onChange={(e) => setRemember(e.target.checked)}
      />
      <a href="" className="text-pink-ia">¿Olvidaste tu contraseña?</a>
    </section>
}
export default ForgotPassword
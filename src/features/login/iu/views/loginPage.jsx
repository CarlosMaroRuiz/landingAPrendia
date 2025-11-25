import { HeaderLogin, FooterLogin } from "../components";
import logo from "/img/logo_xl.png";
import "../../css/login.css";
import FormLogin from "../components/templates/formLogin";

const LoginPage = () => {
  return (
    <div className="flex w-full bg-image-login h-screen py-8 flex-col justify-between px-50">
      <HeaderLogin />

      <section className="w-full flex justify-between items-center">
       
          <FormLogin />
       

        <img
          src={logo}
          alt=""
          className="w-[50rem] h-[30rem]"
        />
      </section>

      <FooterLogin />
    </div>
  );
};

export default LoginPage;

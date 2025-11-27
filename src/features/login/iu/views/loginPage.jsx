import { HeaderLogin, FooterLogin } from "../components";
import logo from "/img/logo_xl.png";

import FormLogin from "../components/templates/formLogin";

const LoginPage = () => {
  return (
    <div className="flex w-full  min-h-screen py-6 sm:py-8 flex-col justify-between px-4 sm:px-6 md:px-10 lg:px-50">
      <HeaderLogin />

      <section className="w-full flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
        <div className="w-full lg:w-full ">
          <FormLogin />
        </div>

        <img
          src={logo}
          alt=""
          className="hidden lg:block w-200 h-120"
        />
      </section>

      <FooterLogin />
    </div>
  );
};

export default LoginPage;

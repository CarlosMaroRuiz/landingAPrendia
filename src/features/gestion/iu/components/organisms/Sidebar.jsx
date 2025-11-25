import { HeaderSideBar,FooterSideBar } from '../molecules';


export const Sidebar = ({ activeSection, onNavigate, onLogout }) => {


  return (
    <aside className="w-64 bg-linear-to-b from-pink-ia to-pink-ia/90 text-white flex flex-col mb-3 px-6 mt-4 py-10  mx-4 rounded-xl justify-between">
      {/* Logo */}

     
         <HeaderSideBar/>

      {/* Footer */}
      
      <FooterSideBar onLogout={onLogout}/>
    </aside>
  );
};

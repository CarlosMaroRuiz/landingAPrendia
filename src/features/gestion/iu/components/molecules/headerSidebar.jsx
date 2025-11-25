import  logoApr  from '/img/logo_white.png';
import { HomeIcon } from '@heroicons/react/24/solid';
export const HeaderSideBar = () =>{

   return (
     <header className='w-full flex-col items-center flex'>

      <img src={logoApr} alt="" className='w-25 h-25 mb-15'/>
  
   
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 transition-colors text-left justify-center">
            <HomeIcon className="h-6 w-6 shrink-0" />
            <span className="font-medium">Inicio</span>
          </button>

      </header>
   )
}

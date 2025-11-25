import {CogIcon} from '@heroicons/react/24/solid';

export const FooterSideBar = ({onLogout}) =>{
    return (
           <div className="border-t border-white/20 pt-4 space-y-2 flex flex-col items-center justify-center">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 transition-colors text-center justify-center"
        >
          <CogIcon className="h-6 w-6" />
          <span>Log out</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 transition-colors text-left justify-center">
          <CogIcon className="h-6 w-6" />
          <span>Configuración</span>
        </button>
      </div>
    )
}
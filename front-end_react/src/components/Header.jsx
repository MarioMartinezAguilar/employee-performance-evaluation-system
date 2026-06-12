import logo from '../assets/logo2.png';
import {  useNavigate } from 'react-router-dom';

export function Header(){
    const navigate = useNavigate();
  return (
    <header className="bg-blue-900 text-white shadow-md">
        <div className="max-w-6x1 mx-auto px-4 py-3 flex items-center gap-6">
            <img 
                src={logo} 
                alt="logo"
                className='w-30 h-10 objet-contain cursor-pointer  transition-transform duration:300 hover:scale-105 hover:opacity-90 hover:drop-shadow-md' 
                onClick={()=> navigate('/')}
            />

            <div>
                <h1 className="text-lg md:text-xl font-bold leading-tight">Presidencia Municipal de Celaya</h1>
                <p className='text-sm text-gray-300'>Sistema de Evaluación de Desempeño Laboral</p>
            </div>
        </div>
        <div className="h-2 bg-blue-600"></div>
    </header>
  )
}

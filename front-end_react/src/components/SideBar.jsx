import { NavLink } from "react-router-dom";
import {LayoutDashboard, Users,FileText, LogOut} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

export function SideBar(){
    const navigate = useNavigate();

    const logout = () =>{
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        toast.success('Sesión cerrada exitosamente', {
            style: {
                background: "#1080e9",
                color: '#e4dfdf'
            }
        });
        navigate('/login', {replace: true});
    }
    return(
        <div className="w-full md:w-64 min-h-screen bg-slate-900 text-white p-6">
            <h1 className="text-2xl font-bold mb-8">Sistema</h1>
            <nav className="flex flex-col gap-4">
                <NavLink to="/dashboard"
                    className={({isActive})=>`
                        p-3
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        hover:bg-slate-700
                        transition
                        ${isActive
                            ?'bg-green-700'
                            :'hover:bg-slate-700'
                        }
                    `}
                
                >
                    <LayoutDashboard size={20}/>
                    Dashboard
                </ NavLink>
                <NavLink to ="/employees/stats"
                    className={({isActive})=>`
                        p-3
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        hover:bg-gray-700
                        transition"
                        ${isActive
                            ? 'bg-green-700'
                            : 'hover:bg-gray-700'
                        }
                    `}
                >
                    <Users size={20}/>
                    Estadísticas De Empleados
                </NavLink>
                <NavLink to ="/reports"
                    className={({isActive})=>`
                        p-3
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        hover:bg-gray-700
                        transition"
                        ${isActive
                            ? 'bg-green-700'
                            : 'hover:bg-gray-700'
                        }
                    `}
                >
                    <FileText size={20}/>
                        Reportes

                </NavLink>
                <div className="mt-auto border-t border-gray-300 pt-4">
                    <button className="flex items-center gap-2 w-full px-4 py-2
                        text-red-600 font-bold hover:bg-red-100 rounded-lg"
                        onClick={logout}
                    >
                        
                        <LogOut size={20}/>
                        <span>Cerrar Sesión</span>
                    </button> 

                </div>
            </nav>
        </div>
    )
}
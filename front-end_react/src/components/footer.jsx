import {useState, useEffect} from 'react';


export function Footer() {
    const [year,setYear] = useState('');

    useEffect (()=>{
        const fecha = new Date();
        setYear(fecha.getFullYear());
    },[])


    return (

        <footer
            className="
                border-t
                text-center
                py-6
                text-blue-600
                text-sm
            "
        >

            <p>

                &copy; <span id="fecha">{year}</span> Presidencia Municipal

            </p>

            <p>

                Sistema de Encuestas

            </p>

        </footer>

    )

}
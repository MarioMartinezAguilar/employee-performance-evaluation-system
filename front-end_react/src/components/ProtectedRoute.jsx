import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
    const id = localStorage.getItem('id');

    //validamos si no existe el id en el localStorage
    if(!id){
        return <Navigate to= '/' />
    }

    return children;
}

//corrigiendo la advertencia del children
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
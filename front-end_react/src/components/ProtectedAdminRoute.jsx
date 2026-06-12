import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";


export function ProtectedAdminRoute({children}){
    const token = localStorage.getItem('accessToken');
    if(!token){
        return <Navigate to='/login'/>
    }
    //muestra el dashboard
    return children
}

ProtectedAdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
import PropTypes from 'prop-types';
import {Navigate} from 'react-router-dom';

export function PublicRoute({children}){
    const token = localStorage.getItem('accessToken');

    if(token){
        return<Navigate to='/dashboard'/>
    }

    return children;

}

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
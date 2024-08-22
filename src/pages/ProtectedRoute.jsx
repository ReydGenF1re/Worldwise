import React, {useEffect} from 'react';
import {useAuth} from "../contexts/FakeAuthContext.jsx";
import {useNavigate} from "react-router-dom";

function ProtectedRoute({children}) {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if(!isAuthenticated) navigate('/');
    }, [isAuthenticated, navigate]);
    return isAuthenticated ? children : null;
}

export default ProtectedRoute;
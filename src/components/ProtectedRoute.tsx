import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../auth/store/useAuthStore';


const ProtectedRoute = () => {
    const { isLoggedIn, isLoaded, checkAuth } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoaded) checkAuth();
    }, [isLoaded, checkAuth]);

    useEffect(() => {
        if (isLoaded && !isLoggedIn) {
            navigate('/', { replace: true });
        }
    }, [isLoaded, isLoggedIn, navigate]);

    if (!isLoaded) return null;

    return isLoggedIn ? <Outlet /> : null;
};

export default ProtectedRoute;
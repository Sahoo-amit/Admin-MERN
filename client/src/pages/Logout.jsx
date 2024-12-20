import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokenContext } from '../context/TokenContext';

const Logout = () => {
    const { userLogout } = useTokenContext();
    const navigate = useNavigate();

    useEffect(() => {
        userLogout()
        navigate('/login')
    }, [userLogout, navigate])

    return null;
}
export default Logout

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate,NavLink } from 'react-router-dom';
import decode from 'jwt-decode';
import logo from './assets/logo.png';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profiles')));

    console.log(user);

    const location = useLocation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        navigate('/');
    }

    useEffect(() => {
        const token=user?.token;
        if(token){
            const decodeToken=decode(token);
            if(decodeToken.exp*1000< new Date().getTime()){
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profiles')));
    }, [location])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid col-md-10">
                <Link className="navbar-brand moveDown" to="/"><img src={logo} alt='Logo' style={{width:'30px'}} /> <strong>Memories</strong><strong style={{color:'#0b7f62'}}>World</strong></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {user?.token ? <div> <img src={user?.userProfile?.imageUrl} alt='user' style={{ width: '40px', borderRadius: '50%', marginRight: '10px' }} /> <span className='me-4 fw-bold moveDown'>{user?.userProfile?.name}</span> <button className='btn btn-danger' onClick={logout}>Logout</button></div> : <NavLink className='btn btn-primary' to='/auth'>Sign In</NavLink>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

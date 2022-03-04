import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate();
    const handleOnLogout = ()=>{
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-name');
        navigate('/')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">CloudNote</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                        </ul>
                        <i className="bi bi-brightness-high"></i>
                        {!localStorage.getItem('auth-token') && <>
                        <Link to="/login" className="btn btn-secondary mx-2">Login</Link>
                        <Link to="/signup" className="btn btn-primary">Signup</Link></>}
                        {localStorage.getItem('auth-token')&& <>
                        <h5 className='d-flex align-items-center' style={{marginLeft:'5px'}}>{localStorage.getItem('user-name')}</h5>
                        <button onClick={handleOnLogout} className="btn btn-primary" style={{marginLeft:'10px'}}>Logout</button>
                        </>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
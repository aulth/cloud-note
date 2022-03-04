import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({email:'', password:''})
    const handleOnChange = (e)=>{
        e.preventDefault();
        setUser({...user, [e.target.name]:e.target.value})
    }
    const handleOnLogin = async (e)=>{
        e.preventDefault();
        const url = "https://cloudnoteb.herokuapp.com/auth/login";
        const response = await fetch(url, {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({email:user.email, password:user.password})
        })
        const data = await response.json();
        if(data.success){
            localStorage.setItem('auth-token', data.authtoken);
            localStorage.setItem('user-name', data.name);
            alert('Logged in successfully')
            navigate('/notes')
        }else{
            alert(data.message)
        }
    }
    return (
        <>
            <section style={{height:'calc(100vh-56px)'}} className="bg-transparent">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                                <form onSubmit={handleOnLogin} className="card-body p-5 text-center">
                                    <h3 className="mb-5">Login</h3>
                                    <div className="form-outline mb-4">
                                        <input type="email" id="typeEmailX-2" onChange={handleOnChange} name='email' placeholder='Email' className="form-control form-control-lg" />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="password" id="typePasswordX-2" onChange={handleOnChange} name='password' placeholder='Password' className="form-control form-control-lg" />
                                    </div>
                                    <button className="btn text-light btn-lg btn-block"  style={{ background:"linear-gradient(20deg, rgba(232,62,140,1) 0%, rgba(253,126,20,1) 0%, rgba(253,128,20,1) 49%, rgba(255,193,7,1) 98%)" }} type="submit">Login</button>
                                    <hr className="my-4" />
                                    <Link to="/signup" className="btn btn-secondary">Create an account</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
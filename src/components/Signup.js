import React , {useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({name:'', email:'', password:''})
    const handleOnChange = (e)=>{
        e.preventDefault();
        setUser({...user, [e.target.name]:e.target.value});
    }
    const handleOnSignup = async (e)=>{
        e.preventDefault();
        const url = "https://cloudnoteb.herokuapp.com/auth/signup";
        const response = await fetch(url, {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({name:user.name, email:user.email, password:user.password})
        })
        const data = await response.json();
        if(data.success){
            localStorage.setItem('auth-token', data.authtoken);
            localStorage.setItem('user-name', data.user.name);
            alert('Sign up successfully')
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
                                <form onSubmit={handleOnSignup} className="card-body p-5 text-center">
                                    <h3 className="mb-5">Sign up</h3>
                                    <div className="form-outline mb-4">
                                        <input type="text" id="name" onChange={handleOnChange} name="name" placeholder='Name' className="form-control form-control-lg" />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="email" id="typeEmailX-2"  name='email' onChange={handleOnChange} placeholder='Email' className="form-control form-control-lg" />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="password" id="typePasswordX-2" name='password' onChange={handleOnChange} placeholder='Password' className="form-control form-control-lg" />
                                    </div>
                                    <button className="btn btn-lg btn-block text-light"  style={{ background:"linear-gradient(20deg, rgba(232,62,140,1) 0%, rgba(253,126,20,1) 0%, rgba(253,128,20,1) 49%, rgba(255,193,7,1) 98%)" }} type="submit">Register</button>
                                    <hr className="my-3" />
                                    <p className='mb-2'>Alreadey have an account?</p>
                                    <Link to="/login" className="btn btn-secondary ">Login</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
      </>
  )
}

export default Signup
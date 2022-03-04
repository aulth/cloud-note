import React from 'react'
import { Link } from 'react-router-dom'
const Getstart = () => {
    return (
        <>
            <div style={{height:'calc(100vh - 56px',minWidth:'100%',backgroundPosition:'center', backgroundImage:"url('https://i.ibb.co/5RrtgRB/glenn-carstens-peters-P1qy-Ef1g0-HU-unsplash.jpg')", backgroundRepeat:'no-repeat', backgroundSize:'cover'}} className="container align-items-center text-light justify-content-center  d-flex ">
                <div style={{backdropFilter:'blur(5px)', padding:'10px'}} className="container d-flex  flex-column">
                    <h2 className='text-center' >Type your notes on cloud</h2>
                    <h4 className='text-center'>Manage it from any corner of the world</h4>
                    <div className="container d-flex justify-content-center"><Link to="/signup" className="btn btn-primary">Get started</Link></div>
                </div>
            </div>
        </>
    )
}

export default Getstart
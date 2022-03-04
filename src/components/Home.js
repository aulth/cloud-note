import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Getstart from './Getstart';

const Home = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(localStorage.getItem('auth-token')?true:false);
    useEffect(() => {
      if(isLogin){
        setIsLogin(true)
          navigate('/notes')
      }
      //eslint-disable-next-line
    }, [isLogin])
    
  return (
    <>
    <Getstart/>
    </>
  )
}

export default Home
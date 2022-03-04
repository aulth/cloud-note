import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Notes from './components/Notes';
import Home from './components/Home'
import About from './components/About';
function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/notes' element={<Notes/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;

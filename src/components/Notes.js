import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Noteitem from './Noteitem'

const Notes = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(localStorage.getItem('auth-token')?true:false);
    const [note, setNote] = useState({title:'', content:'', tag:''})
    const [notes, setNotes] = useState({});
    const showAddBox = ()=>{
        document.getElementById('add-note-btn').style.display ='none';
        document.getElementById('add-note-box').style.display = 'block'
    }
    const handleOnCancel = ()=>{
        document.getElementById('add-note-box').style.display = 'none';
        document.getElementById('add-note-btn').style.display = 'block';
    }
    const handleOnChange = (e)=>{
        e.preventDefault();
        setNote({...note, [e.target.name]:e.target.value})
    }
    const handleOnAddNote = async (e)=>{
        e.preventDefault();
        const url = 'https://cloudnoteb.herokuapp.com/note/create';
        const response = await fetch(url, {
            method:'POST',
            headers:{
                'content-type':'application/json',
                'auth-token':localStorage.getItem('auth-token')
            },
            body:JSON.stringify({title:note.title, content:note.content, tag:note.tag})
        })
        const data = await response.json();
        if(data.success){
            alert("Note added successfully");
        }else{
            alert(data.message)
        }
    }
    
    const fetchNotes = async ()=>{
        const url = "https://cloudnoteb.herokuapp.com/note/fetch";
        const response = await fetch(url, {
            method:'GET',
            headers:{
                'auth-token':localStorage.getItem('auth-token')
            }
        })
        const data = await response.json();
        if(data.success){
            setNotes(data.notes)
        }else{
            alert(data.message)
        }
    }
    useEffect(() => {
      if(isLogin){
          fetchNotes()
      }else{
          navigate('/login')
      }
      //eslint-disable-next-line
    }, [])
    
    return (
        <>
            <div style={{ minWidth: '100%' }} className="container my-2">
                <button onClick={showAddBox} style={{marginLeft:'5px'}} className="btn btn-primary" id='add-note-btn'>Add <i className="bi bi-plus"></i></button>
                <div style={{minWidth:'100%', display:'none'}} id="add-note-box" className="container">
                    <form onSubmit={handleOnAddNote}>
                        <div className="mb-1">
                            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                            <input type="text" name='title' className="form-control" onChange={handleOnChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                            <input type="text" name='tag' className="form-control" onChange={handleOnChange} id="exampleInputPassword1"/>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                            <textarea name="content" id="" style={{minWidth:'100%'}} onChange={handleOnChange} className='container'></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                        <button onClick={(e)=>{e.preventDefault();handleOnCancel()}} className="btn btn-secondary mx-2">Cancel</button>
                    </form>
                </div>
            </div>
            <div className="note-container my-2">
               {notes && notes.length>0 && notes.map((note, index)=>{
                   return <Noteitem fetchNotes={fetchNotes} key={index} note={note}/>
               })}
            </div>
        </>
    )
}

export default Notes
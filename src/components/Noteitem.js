import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const Noteitem = (props) => {
    const navigate = useNavigate();
    const {note, fetchNotes} = props;
    const [newNote, setNewNote] = useState({title:'', content:'', tag:''})
    const deleteNote = async (noteid)=>{
        const url =`http://localhost:5000/note/delete/${noteid}`;
        const response = await fetch(url, {
            method:'DELETE',
            headers:{
                'auth-token':localStorage.getItem('auth-token')
            }
        })
        const data = await response.json();
        if(data.success){
            alert("Note deleted successfully");
        }else{
            alert(data.message)
        }
    }
    const showEditBox = (noteid)=>{
        let title = document.getElementById(`note-${noteid}-title`).textContent;
        let content = document.getElementById(`note-${noteid}-content`).textContent;
        let tag = document.getElementById(`note-${noteid}-tag`).textContent;
        document.getElementById(`note-${noteid}-title`).style.display = 'none';
        document.getElementById(`note-${noteid}-content-box`).style.display = 'none';
        document.getElementById(`note-${noteid}-tag`).style.display = 'none';
        document.getElementById(`note-${noteid}-delete-icon`).style.display = 'none';
        document.getElementById(`note-${noteid}-edit-icon`).style.display = 'none';
        document.getElementById(`note-${noteid}-save-icon`).style.display = 'block';
        document.getElementById(`note-${noteid}-cancel-icon`).style.display = 'block';
        document.getElementById(`note-${noteid}-title-input`).style.display = 'block';
        document.getElementById(`note-${noteid}-content-input`).style.display = 'block';
        document.getElementById(`note-${noteid}-tag-input`).style.display = 'block';
        setNewNote({title:title, content:content, tag:tag});
        console.log(title, content, tag);
    }
    const hideEdit = (noteid)=>{
        setNewNote({title:'', content:'', tag:''});
        document.getElementById(`note-${noteid}-title`).style.display = 'block';
        document.getElementById(`note-${noteid}-content-box`).style.display = 'block';
        document.getElementById(`note-${noteid}-tag`).style.display = 'block';
        document.getElementById(`note-${noteid}-delete-icon`).style.display = 'block';
        document.getElementById(`note-${noteid}-edit-icon`).style.display = 'block';
        document.getElementById(`note-${noteid}-save-icon`).style.display = 'none';
        document.getElementById(`note-${noteid}-cancel-icon`).style.display = 'none';
        document.getElementById(`note-${noteid}-title-input`).style.display = 'none';
        document.getElementById(`note-${noteid}-content-input`).style.display = 'none';
        document.getElementById(`note-${noteid}-tag-input`).style.display = 'none';
    }
    const handleOnChange = (e)=>{
        setNewNote({...newNote, [e.target.name]:e.target.value});
        console.log(newNote)
    }
    const handleOnSave = async (noteid)=>{
        const url = `https://cloudnoteb.herokuapp.com/note/edit/${noteid}`;
        const response = await fetch(url, {
            method:'PUT',
            headers:{
                'content-type':'application/json',
                'auth-token':localStorage.getItem('auth-token')
            },
            body:JSON.stringify({title:newNote.title, content:newNote.content, tag:newNote.tag})
        })
        const data = await response.json();
        if(data.success){
            hideEdit(noteid);
            navigate('/notes')
        }else{
            alert(data.message);
        }
    }
    useEffect(() => {
      fetchNotes();
      //eslint-disable-next-line
    }, [handleOnSave, deleteNote])
    
    return (
        <>
            <div className="note note-1">
                <div className="note-header">
                    <div className="note-title" id={`note-${note._id}-title`}>{note.title}</div>
                    <input type="text" style={{display:'none', background:'transparent'}} onChange={handleOnChange} className="note-title note-edit-input "  value={newNote.title} name="title" id={`note-${note._id}-title-input`}/>
                    <div className="note-control"><i onClick={()=>{showEditBox(`${note._id}`)}}  id={`note-${note._id}-edit-icon`}  className="bi bi-pen mx-1"></i><i id={`note-${note._id}-delete-icon`} onClick={()=>{deleteNote(note._id)}} className="bi bi-trash3 mx-1"></i><i style={{display:'none'}}  id={`note-${note._id}-cancel-icon`} onClick={()=>{hideEdit(note._id)}}  className="bi bi-x-lg mx-1"></i><i  style={{display:'none'}}  id={`note-${note._id}-save-icon`} onClick={(e)=>{e.preventDefault();handleOnSave(note._id)}} className="bi bi-check2-circle mx-1"></i></div>
                </div><hr/>
                <div className="note-content" id={`note-${note._id}-content-box`}><p  id={`note-${note._id}-content`}>{note.content}</p></div>
                <textarea className="note-content container note-edit-input"  style={{display:'none',paddingLeft:'2px', background:'transparent', marginBottom:'5px'}} name='content'  id={`note-${note._id}-content-input`} onChange={handleOnChange} value={newNote.content}/>
                <div className="time-tag d-flex justify-content-between align-items-center">
                <div className="note-time d-flex align-items-center"><i className="bi bi-calendar4"></i>{note.time}</div>
                <div className="note-tag d-flex" ><i className="bi bi-tag align-items-center d-flex"></i> <span id={`note-${note._id}-tag`}>{note.tag}</span><input  style={{display:'none', width:'100px', background:'transparent'}} className="note-content note-edit-input" name='tag'  id={`note-${note._id}-tag-input`} onChange={handleOnChange} value={newNote.tag}/> </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem
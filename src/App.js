import React, { useState,useEffect } from 'react';
import './App.css';
import {Button, FormControl, InputLabel, Input} from '@material-ui/core'
import Todo from './Todo';
import db from './firebase';
import firebase from "firebase";

const App = () => {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // when the app loads , listen to the databse and fetch new todos as they add or remove.
  
  useEffect(() => {
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo})))
    })
  }, [])

  const addTodo =(event) =>{  
    event.preventDefault();
    // setTodos([...todos,input]);
    // setInput('')
    
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()

    })

  }      

  return (
    <div className="App">
     <h1>Todo App</h1>     
    <form>
    <FormControl>
      <InputLabel htmlFor="my-input">✔  Write a Todo</InputLabel>
      <Input value={input} onChange={event => setInput(event.target.value)} />                
    </FormControl>

    <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add Todo</Button>
    </form>
     
     
       <ul>
          {todos.map((todo)=>(
            <Todo todo={todo}/>
          ))}
       </ul>
     
    </div>
  );
}

export default App;

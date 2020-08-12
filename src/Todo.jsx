import React, { useState } from 'react'
import { ListItem, ListItemText, List, Modal, Button, makeStyles } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import db from './firebase';

const useStyles = makeStyles((theme) => ({
    paper:{
        position:'absolute',
        width:400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding:theme.spacing(2,4,3),
    
    },
}))

function Todo(props) {
    const classes = useStyles();
    const [open,setOpen] = useState(false)
    const [input,setInput] = useState("")

    const handleOpen = (e) =>{
        console.log("event value " , e)
        setOpen(true);
    }
  
    const UpdateTodo = () =>{
        db.collection('todos').doc(props.todo.id).set({
            todo : input
        },{merge: true}); // append the todo
        setOpen(false);
    }
    return (
        <>
        <Modal
            open={open}
            onClose={e => setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
            <div className={classes.paper}>
                <h1>Open</h1>
                <input placeholder = {props.todo.todo} value={input} onChange={e=> setInput(e.target.value)} />
                <Button onClick={UpdateTodo}>Update Todo</Button>
            </div>
        </Modal>
        <List className="todo_list">
            <ListItem>
                <ListItemText primary={props.todo.todo} secondary="Todo ⏰ "/>
            </ListItem>
            <EditIcon onClick={handleOpen} />
            <DeleteIcon onClick={event=>db.collection('todos').doc(props.todo.id).delete()}> Delete me</DeleteIcon>
        </List>
        </>
    );
}

export default Todo

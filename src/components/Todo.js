import React, { useState } from 'react';
import TodoForm from './TodoForm';

//React Icons
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';



function Todo({ todoList, completeTodo, removeTodo, updateTodo }) {

    const [edit, setEdit] = useState({ id: null, value: '' });


    const submitUpdate = value => {

        updateTodo(edit.id, value);                                 //← 1.  When user updates a item, passes values into into 'updateTodo' function for requirement checks 
        setEdit({ id: null, value: '' });                           //← 4.  Reset edit value back to default.
    }

    if (edit.id) {                                                  //← 2.  If something has been edited and the id is truthy, return item with id passed with new value.
        return <TodoForm edit={edit} onSubmit={submitUpdate} />     //← 3.  Sends the updated value to 'TodoList.js'
    }



    return todoList.map((todo, index) => (

        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>       {/* If item clicked, will highlight/ghost item (completed/not)(CSS styling) */}

            <div key={todo.id} onClick={() => completeTodo(todo.id)}>                          {/* When clicked, id is passed into function on 'TodoList' */}
                {todo.text}
            </div>

            <div className="icons">
                <RiCloseCircleLine onClick={() => removeTodo(todo.id)} className="delete-icon" />
                <TiEdit onClick={() => setEdit({ id: todo.id, value: todo.text })} className="edit-icon" />
            </div>

        </div>
    )
    );
}

export default Todo

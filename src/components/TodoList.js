import React, { useState } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';

function TodoList() {

    const [todoList, setTodoList] = useState([]);


    //!Add a To Do item
    const addToDo = (aTodo) => {
        if (!aTodo.text || /^\s*$/.test(aTodo.text)) {             //<--Code from 'Stackoverflow', ensuring spaces only take up one character square and if no characters entered nothing gets added to the todo list. 
            return;
        }
        const newTodos = [aTodo, ...todoList]
        setTodoList(newTodos);

        //console.log(aTodo, ...todoList)
    }


    //!Update a To Do item
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodoList(previous => previous.map(item => (item.id === todoId ? newValue : item))    //<--If id's match then update with new value passed, if not keep current value.
        );
    }


    //!Remove a To Do item
    const removeTodo = id => {
        const removeItem = [...todoList].filter(todo => todo.id !== id)     //<--Take 'id' passed and remove it from the array, aka create a new array without that todo. 

        setTodoList(removeItem)
    }


    //!Completed a To Do item
    const completeTodo = id => {
        let updatedTodos = todoList.map(todo => {                   //<--When item clicked, take that id from item,loop through all items and if a matching id if found, change 'isComplete' value.
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;                 //<--Will Toggle the current value to the opposite value, toggle on/off.
            }
            return todo;
        })
        setTodoList(updatedTodos);
    }


    return (

        <div>
            <h1>What's the plan for today?</h1>
            <TodoForm onSubmit={addToDo} />                          {/* Every time a new item gets added, takes that new item add it to the todos array  */}
            <Todo
                todoList={todoList}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </div>
    )
}

export default TodoList

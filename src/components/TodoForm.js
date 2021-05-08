import React, { useState, useEffect, useRef } from 'react'

function TodoForm(props) {

    //↓ When we want to edit an item (making props.edit = true), make sure the current value is visible when doing so.
    const [input, setInput] = useState(props.edit ? props.edit.value : '')


    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus();                    //<--Will set focus in the input field when adding or updating a item. 
    })


    const handleChange = (e) => {                    //<--When value is changed update 'input' value.
        setInput(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        props.onSubmit({                             //<--When a new item gets added this will generate a random 'ID' for that item.    
            id: Math.floor(Math.random() * 10000),
            text: input.charAt(0).toUpperCase() + input.slice(1)        //<--Capitalize first letter with new Todo
        })

        setInput('')
    }



    return (

        <form className='todo-form' onSubmit={handleSubmit}>

            {props.edit ? (
                <>                         {/* If item being edited display some different text and styles,use these settings */}
                    <input type="text"
                        name='text'
                        placeholder='Update item'
                        value={input}
                        className='todo-input edit'
                        onChange={handleChange}
                        ref={inputRef} />                        {/* Referencing which field to focus */}

                    <button className='todo-button edit'>Update</button>
                </>
            ) : (
                <>
                    <input type="text"
                        name='text'
                        placeholder='Add a Todo'
                        value={input}
                        className='todo-input'
                        onChange={handleChange}
                        ref={inputRef} />                         {/* Referencing which field to focus */}

                    <button className='todo-button'>Add a Todo</button>
                </>
            )}

        </form>
    )
}

export default TodoForm

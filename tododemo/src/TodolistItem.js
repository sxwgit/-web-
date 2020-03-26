import React from 'react'
import "./TodoItem.css"


const TodolistItem = (props)=>{
    const item = props.item;
    if (item.done){
        return <p  className="done-item">{item.content}</p>
    }
    else{
        return <p className="undone-item">{item.content}</p>
    }
}

export default TodolistItem
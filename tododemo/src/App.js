import React, {Component} from 'react';
import './App.css';
import TodolistHeader from './TodolistHeader';
import Todolist from "./Todolist"

export default class App extends Component {
  render() {
    return (
      <div className="App"> 
        <TodolistHeader />
        <Todolist />
      </div>
    )
  }
}




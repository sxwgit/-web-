import React, { Component } from 'react'
import TodolistItem from "./TodolistItem"
import Addtodo from "./Addtodo"
import { number } from 'prop-types';
// import todolist from './data/todo.json'

const formatDate = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = minute < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};


export default class Todolist extends Component {
    constructor(props) {
        super(props);
        // 在初始状态时，读取todo.json的文件，并绑定到selftodolist中
        var todolist = require("./data/todo")
        var done_item = todolist.filter(function (x) {
            return x.done === true
        })

        var undone_item = todolist.filter(function (x) {
            return x.done === false
        })

        this.state = {
            selftodolist: todolist,
            selfundonelist: undone_item,
            selfdonelist: done_item
        }
        // this.EditDoneState = this.EditDoneState.bind(this)
    }

    AddNewItem = (NewItemContent) => {
        // 同时更新item和undoitem
        var new_item = {
            id: formatDate(new Date()), // 用时间做key,
            content: NewItemContent,
            done: false
        }
        var newtodolist = [...this.state.selftodolist, new_item]
        var newundolist = [...this.state.selfundonelist, new_item]
        this.setState({
            selftodolist: newtodolist,
            selfundonelist: newundolist
        })
    }

    RefreshTodoState = () => {

        var done_item1 = this.state.selftodolist.filter(function (x) {
            return x.done === true
        })

        var undone_item1 = this.state.selftodolist.filter(function (x) {
            return x.done === false
        })

        this.setState({
            selfdonelist: done_item1,
            selfundonelist: undone_item1
        })

    }


    EditDoneState = (id) => {
        var content_id
        for (var i = 0; i < this.state.selftodolist.length; i++) {
            if((typeof this.state.selftodolist[i].id) === "number"){
                content_id = this.state.selftodolist[i].id.toString()
            }
            else{
                content_id = this.state.selftodolist[i].id
            }
            if (content_id === id) {
                this.state.selftodolist[i].done = true
                this.RefreshTodoState()
            }

        }

    }

    ShowUndoPage = ()=>{
        const handleClick = e => this.EditDoneState((e.target.id));
        if(this.state.selfundonelist.length === 0){
            return <h2>恭喜你，所有代办事项已经完成</h2>
        }
        else{
            return <div>
                <p>未完成项目</p>
                < table align="center">
                    {
                        this.state.selfundonelist.map(function (item) {
                            return <div>
                                <tr>
                                    <td><TodolistItem item={item} /></td>
                                    <td><button id={item.id} onClick={handleClick}> 已完成</button></td>
                                </tr>
                            </div>
                        }
                        )}
                </table>
            </div>
        }
    }

    ShowDonePage = ()=>{
        if(this.state.selfdonelist.length === 0){
            return <h2>没有完成代办事项</h2>
        }
        else{
            return <div>
                <p>以完成项目</p>
                < table align="center">
                    {
                        this.state.selfdonelist.map(function (item) {
                            return <div>
                                <tr>
                                    <td><TodolistItem item={item} /></td>
                                    
                                </tr>
                            </div>
                        }
                        )}
                </table>
            </div>
        }
    }

    render() {
        // var EditDoneState = this.EditDoneState
        const handleClick = e => this.EditDoneState((e.target.id));
        return (
            <div>
                <Addtodo AddNewItem={this.AddNewItem} />
                <this.ShowUndoPage/>
                <this.ShowDonePage/>
                {/* <p>未完成项目</p>
                < table align="center">
                    {
                        this.state.selfundonelist.map(function (item) {
                            return <div>
                                <tr>
                                    <td><TodolistItem item={item} /></td>
                                    <td><button id={item.id} onClick={handleClick}> 已完成</button></td>
                                </tr>
                            </div>
                        }
                        )}
                </table>

                <p>以完成项目</p>
                < table align="center">
                    {
                        this.state.selfdonelist.map(function (item) {
                            return <div>
                                <tr>
                                    <td><TodolistItem item={item} /></td>
                                </tr>
                            </div>
                        }
                        )}
                </table> */}
            </div>
        );

    }
}

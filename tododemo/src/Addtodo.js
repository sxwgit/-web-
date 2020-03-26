import React, { Component } from 'react'





export default class Addtodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputContent: ""
        }
    }

    OnBtnClick = (event) => {
        if(this.state.inputContent !== ""){
            this.props.AddNewItem(this.state.inputContent)
            this.setState({
                inputContent : ""
            })
        }


    }

    OnInputChange = (event) => {
        this.setState({
            inputContent: event.target.value
        })
    }
    render() {
        return (
            <div>
                <input value={this.state.inputContent} id="inputcontent" onChange={this.OnInputChange} />
                <button id="testid" onClick={this.OnBtnClick}>Add new todo item </button>
            </div>
        )
    }
}


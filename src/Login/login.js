import React, { Component } from 'react'

class Counter extends Component { 
    state = { value: 1 }; 
 
    render() { 
       return <div>hi{ this.state.value }</div>;
    }

    
 }
class login extends Component{
    constructor() {
        super();
        this.styles ={
            color: 'white'
        };
    }
    render() {
        return (
                <div><h1>title1</h1></div>
        )
    }
    
    
}

export default  login;

import React, { Component } from 'react';
import './Question.css';
import logo from '../../sample.png'

class Question extends Component {
    render () {
        return (
            <div>
                <h1>
                    What is garbage collection in Java?
                </h1>
                <h6 className="question-autor">
                    Asked by Piyush Agarwal
                </h6>
                <img src={logo} alt=""></img>
                
            </div>
        );
    }
}

export default Question;
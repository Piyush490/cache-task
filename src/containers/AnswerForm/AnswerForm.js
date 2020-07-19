import React, { Component } from 'react';
import './AnswerForm.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
class AnswerForm extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        count: 0,
        name: '',
        email: '',
        answerText: '',
        isRecording: false,
        blobURL: '',
        isBlocked: false,
      };
  
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
      this.handleAudioChange = this.handleAudioChange.bind(this);
    }
    start = () => {
      if (this.state.isBlocked) {
        console.log('MIC Permission Denied');
      } else {
        Mp3Recorder
          .start()
          .then(() => {
            this.setState({ isRecording: true });
          }).catch((e) => console.error(e));
      }
    };

    stop = () => {
      Mp3Recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const blobURL = URL.createObjectURL(blob)
          this.setState({ blobURL, isRecording: false });
        }).catch((e) => console.log(e));
    };
    
    handleNameChange(event) {
      this.setState({name: event.target.value});
    }
  
    handleEmailChange(event) {
      this.setState({email: event.target.value});
    }
  
    handleTextChange(event) {
      this.setState({answerText: event.target.value});
    }

    handleAudioChange(event){
      this.setState({blobURL: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();
      this.props.onAnswerAdded(this.state.count, this.state.name, this.state.email, this.state.answerText,this.state.blobURL);
    }
      
    componentDidMount(){
      navigator.getUserMedia({ audio: true },
        () => {
          console.log('Permission Granted');
          this.setState({ isBlocked: false });
        },
        () => {
          console.log('Permission Denied');
          this.setState({ isBlocked: true })
        },
      );
    }
  
    render() {
      
      return (
        <div>
        <form onSubmit={this.handleSubmit} className="answers-form">
          <label>
            <input type="text" required placeholder="Enter your name" onChange={this.handleNameChange} />
          </label>
          <label>
            <input type="email" required placeholder="Enter your email" onChange={this.handleEmailChange} />
          </label>
          <br/>
          <label>
            <textarea cols="48" required placeholder="Enter your answer" onChange={this.handleTextChange} />
          </label>
          <br/>
          <input className="btn btn-danger" type="submit" value="Submit" />
        </form>
        <button onClick={this.start} onChange={this.handleAudioChange} disabled={this.state.isRecording}> Record</button>
        <button onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
        <audio src={this.state.blobURL} controls="controls" />
        </div>
      );
    }
  }

  const mapDispatchToProps = dispatch => {
      return {
          onAnswerAdded: (count, name, email, answerText) => dispatch({type: actionTypes.ADD_ANSWER, payload: {count, name, email, answerText}})
      }
  }

  export default connect(null, mapDispatchToProps)(AnswerForm);
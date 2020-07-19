import React, { Component } from 'react';
import './App.css';
import Qna from './components/Qna/Qna';
import AnswersSection from './components/AnswersSection/AnswersSection';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="mmt-app-body">
          <Qna />
          <AnswersSection />
        </div>
      </div>
    );
  }
}

export default App;

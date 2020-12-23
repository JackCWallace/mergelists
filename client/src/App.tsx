// App.js
//
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

interface State {
  messages: any
}

interface Props{
  history: any
}

class App extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);
    this.state = {
      messages: []
    };
    // this.getMessages();
  }

  componentDidMount(){
    this.getMessages()
      .then(res => this.setState({messages: res.messages}))
  }

  getMessages = async () => {
    const response = await fetch('/v1/messages');
    const body = await response.json();
    console.log(body)

    return body;
   
    // fetch('/v1/messages')
    //   .then(response => response.json())
    //   .then(response => {
    //     this.setState({
    //       messages: response
    //     });
    //   });
  }

  render() {

    const {messages} = this.state
    console.log(messages)

    const showMessages = (messages:any) => {
      return <div>{messages.map((message:any) => (<div>{message.name} says {message.message}</div>))}</div>;
    }

    return (
      <Router>
        <div>
         {showMessages(messages)}
        </div>
      </Router>
    );
  }
}

export default App;
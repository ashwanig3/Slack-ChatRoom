import React, { Component } from 'react'
import io from 'socket.io-client';
import { connect } from 'react-redux';

const socket = io('http://localhost:4400/');

class DirectMessage extends Component {
  state = {
    msg: '',
    directMassages: []
  }
  handleChange = (e) => {
    this.setState({
      msg: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('directMessage',{
      msg: this.state.msg,
      from: this.props.userData.name
    });
    document.getElementById('msg-box').value = '';
  }

  getMessageFromServer = (() => {
    socket.on('directMessage', (data) => 
    this.setState({
      directMassages: [...this.state.directMassages, data]
    }))
  })()

  render() {
    const { directMassages } = this.state;
    return (
      <div>
        <div className="right-sidebar">
                <div className="right-sidebar_header">
                  <h2>{this.props.match.params.name}</h2>
                  <div>
                   <h4>{this.props.userData.name}</h4> 
                  <button onClick ={this.handleSignOut}>Signout from Batch1</button>
                  </div>
                </div>
                <div className="all-msg">
                {
                  directMassages && directMassages.map(msg => <p><span className="member">{this.props.match.params.name}: </span>{msg.msg}</p>)
                }
                 <form onSubmit={this.handleSubmit}>
                      <input id="msg-box" type="text" placeholder="type here" onChange={this.handleChange} />
                      <button type="submit">Send</button>
                  </form>
                </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.currentUserData.userInfo
  }
}

export default connect(mapStateToProps)(DirectMessage)
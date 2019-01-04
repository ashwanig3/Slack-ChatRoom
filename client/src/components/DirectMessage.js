import React, { Component } from 'react'
// import io from 'socket.io-client';
import { connect } from 'react-redux';
import socket from '../socket.io';

// const socket = io('http://localhost:4400/');

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
    socket.emit('getMsg',{
      msg: this.state.msg,
      from: this.props.userData.username,
      to: this.props.match.params.name
    });
    socket.emit('sendMsg', {
      msg: this.state.msg,
      from: this.props.userData.username
    });
    document.getElementById('msg-box').value = '';
    // this.props.dispatch(postDirectMsg({
    //   msg: this.state.msg,
    //   from: 
    // }))
  }

  getMessageFromServer = (() => {
    socket.on('getMsg', (data) => 
    this.setState({
      directMassages: [...this.state.directMassages, data]
    })
    )
    socket.on('sendMsg', (data) => 
    this.setState({
      directMassages: [...this.state.directMassages, data]
    })
    )
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
                  directMassages && directMassages.map(msg => <p><span className="member">{msg.from}: </span>{msg.msg}</p>)
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
    userData: state.currentUserData.userInfo,
    allMembers: state.allMembers
  }
}

export default connect(mapStateToProps)(DirectMessage)
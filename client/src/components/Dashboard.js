import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

// import io from 'socket.io-client';
import { postMsg, joinChannel, getAllMembers, getMessages, signedOut } from '../actions/actions';
import socket from '../socket.io';


// const socket = io('http://localhost:4400/');

class Dashboard extends Component {
  state = {
    msg: '',
    allMsg: []
  }
  handleChange = (e) => {
    this.setState({
      msg: e.target.value
    })
  }
  componentWillMount = () => {
    this.props.dispatch(getMessages())

  }
  componentDidUpdate = () => {
    socket.emit('online', this.props.userData.name)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chatting',{
      msg: this.state.msg,
      authorName: this.props.userData.name
    });
    document.getElementById('msg-box').value = '';
    this.props.dispatch(postMsg({
      msg: this.state.msg,
      memberId: this.props.memberId._id,
      memberName: this.props.memberId.name
    }))
  }
  
  getMessageFromServer = (() => {
    socket.on('chatting', (data) => {
      console.log(data);
      this.setState({
        allMsg: [...this.state.allMsg, data]
      })
    })
  })()

  handleClick = (e) => {
    e.preventDefault();
    this.props.dispatch(joinChannel({
      name: this.props.userData.name,
      email: this.props.userData.email
    }))
    this.props.dispatch(getAllMembers())
  }
  handleSignOut = (e) => {
    e.preventDefault();
    this.props.dispatch(signedOut())
  }

  render() {
    const { userId, allMembers, messages, userData, memberId } = this.props;
    const { allMsg } = this.state;
    let item;
    if(memberId) {
      item = <form onSubmit={this.handleSubmit}>
      <input id="msg-box" type="text" placeholder="type here" onChange={this.handleChange} />
      <button type="submit">Send</button>
   </form>
    } else {item = <div></div>}
    if(!userId) {
      return <Redirect to='/login' />
    } else {
      return (
        <div className="dashboard">
          <div className="hero-section">
            <div className="left-sidebar">
              <ul className="group-msg">
                <span>Channels</span>
                <li>#Batch1</li>
                <button type="submit" onClick={this.handleClick}>Join Chat</button>
              </ul>
              <ul className="direct-msg">
                <span>Direct messages</span>
                {
                  allMembers && allMembers.map(member => <Link to={`/direct/${member.name}`} className="members">{member.name}</Link>)
                }
              </ul>
            </div>
            <div className="right-sidebar">
                <div className="right-sidebar_header">
                  <h2>#Batch1</h2>
                  <div>
                   <h4>{userData.name}</h4> 
                  <button onClick ={this.handleSignOut}>Signout from Batch1</button>
                  </div>
                </div>
                <div className="all-msg">
                {
                  messages && messages.map(msg => <p><span className="member">{msg.memberName}:</span> {msg.msg}</p>)
                }
                  {
                    allMsg && allMsg.map(msg => <p><span className="member">{msg.authorName}:</span> {msg.msg}</p>)
                  }
                </div>
                {
                  item
                }
            </div>
          </div>
          
        </div>
      )
    }
    
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.currentUserId,
    userData: state.currentUserData.userInfo,
    memberId: state.memberData,
    allMembers: state.allMembers,
    messages: state.currentMember.allMsg
  }
}

export default connect(mapStateToProps)(Dashboard)

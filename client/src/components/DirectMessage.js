import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import socket from '../socket.io';
import { postDirectMsg, getAllDirectMsg, signedOut } from '../actions/actions';


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
      author: this.props.userData.name,
      from: this.props.userData.username,
      to: this.props.match.params.name
    });
    socket.emit('sendMsg', {
      msg: this.state.msg,
      from: this.props.userData.username,
      author: this.props.userData.name
    });
    document.getElementById('msg-box').value = '';
    const from = this.props.allMembers.filter(member => member.email === this.props.userData.email)
    const to = this.props.allMembers.filter(member => member.name === this.props.match.params.name)
    this.props.dispatch(postDirectMsg({
      msg: this.state.msg,
      from: from[0]._id,
      to: to[0]._id,
      author: from[0].name
    }))
  }

  componentWillMount = () => {
    const from = this.props.allMembers.filter(member => member.email === this.props.userData.email)
    const to = this.props.allMembers.filter(member => member.name === this.props.match.params.name)
    this.props.dispatch(getAllDirectMsg(from[0]._id, to[0]._id))
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

  handleSignOut = (e) => {
    e.preventDefault();
    this.props.dispatch(signedOut())
  }

  render() {
    const { directMassages } = this.state;
    const { directMsgs, userData, userId } = this.props;
    if(!userId) {
      return <Redirect to='/login' />
    } else {

      return (
        <div>
          <div className="right-sidebar">
                  <div className="right-sidebar_header">
                    <h2>{this.props.match.params.name}</h2>
                    <div className="top-nav-bar">
                      <div className='link-wrapper'>
                        <Link to='/' className="dashboard-link">Dashboard</Link>
                      </div>
                     <div>
                        <h4>{userData.name}</h4> 
                        <button onClick ={this.handleSignOut}>Signout from Batch1</button>
                     </div>
                    </div>
                  </div>
                  <div className="all-msg">
                  {
                    directMsgs && directMsgs.map(msg => <p><span className="member">{msg.author}: </span>{msg.msg}</p>)
                  }
                  {
                    directMassages && directMassages.map(msg => <p><span className="member">{msg.author}: </span>{msg.msg}</p>)
                  }
                   <form onSubmit={this.handleSubmit} className="direct-form">
                        <input id="msg-box" type="text" placeholder="type here" onChange={this.handleChange} />
                        <button type="submit">Send</button>
                    </form>
                  </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.currentUserData.userInfo,
    allMembers: state.allMembers,
    directMsgs: state.directMsgs,
    userId: state.currentUserId
  }
}

export default connect(mapStateToProps)(DirectMessage)
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { postMsg, getAllMembers, getMessages, signedOut, addChannels, getAllChannels } from '../actions/actions';
import socket from '../socket.io';
import GroupMsgs from './GroupMsgs';

class Dashboard extends Component {
  state = {
    msg: '',
    channelName: '',
    allMsg: [],
    isClicked: 
    false,
    isLoading : false
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  componentWillMount = () => {
    this.props.dispatch(getAllChannels())
    this.props.dispatch(getMessages())
    this.props.dispatch(getAllMembers())

  }
  componentWillUpdate = () => {
    socket.emit('online', this.props.userData.username)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chatting',{
      msg: this.state.msg,
      username: this.props.userData.username
    });
    document.getElementById('msg-box').value = '';
    this.props.dispatch(postMsg({
      msg: this.state.msg,
      userId: this.props.userData._id,
      username: this.props.userData.username
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
  handleSignOut = (e) => {
    e.preventDefault();
    this.props.dispatch(signedOut())
  }

  handleAdd = (e) => {
    e.preventDefault();
    this.setState({
      isClicked: !this.state.isClicked
    })
  }
  handleAddChannels = (e) => {
    e.preventDefault();
    this.setState({
      isLoading : true
    })
    this.props.dispatch(addChannels({
      channelName: this.state.channelName,
      createdBy: this.props.userId
    }, (isSucced) => {
      if(isSucced) {
        this.setState({
          isLoading : false
        })  
      }
    }))
    this.setState({
      isClicked: !this.state.isClicked
    })
  }

  render() {
    const { userId, allMembers, messages, userData, memberId, allChannels } = this.props;
    const { allMsg, isClicked, isLoading } = this.state;
    let addChannelForm;
    if(isClicked === true) {
      addChannelForm = <form onSubmit={this.handleAddChannels}>
        <input type="text" placeholder="Enter Channel Name" name="channelName" onChange={this.handleChange} />
      </form>
    } 
    if(!userId) {
      return <Redirect to='/login' />
    } else {
      return (
        isLoading ? <p>Loading...</p> : (
          <div className="dashboard">
          <div className="hero-section">
            <div className="left-sidebar">
              <ul className="group-msg">
                <div>
                  <span className="subheading">Channels</span>
                  <i class="fas fa-plus-circle" onClick={this.handleAdd}></i>
                </div>
                {
                  addChannelForm
                }
                {
                  allChannels && allChannels.map((channel, i) => <li key={i}>#{channel.channelName}</li>)
                }
              </ul>
              <ul className="direct-msg">
                <span className="subheading">Direct messages</span>
                {
                  allMembers && allMembers.map((member,i) => <Link to={`/direct/${member.username}`} key={i} className="members">{member.name}</Link>)
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
                    <GroupMsgs messages={messages} allMsg={allMsg} />
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input id="msg-box" type="text" placeholder="type here" name="msg" onChange={this.handleChange} />
                    <button type="submit">Send</button>
                </form>
            </div>
          </div>
          
        </div>
        )
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
    messages: state.currentMember.allMsg,
    allChannels: state.allChannels
  }
}

export default connect(mapStateToProps)(Dashboard)

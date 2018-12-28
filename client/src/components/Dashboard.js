import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import io from 'socket.io-client';
const socket = io('http://localhost:4400/');

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
  handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chatting',this.state.msg);
    socket.on('chatting', (data) => 
    this.setState({
      allMsg: [...this.state.allMsg, data]
    }))
  }
  render() {
    const { userId } = this.props;
    const { allMsg } = this.state;
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
                <li>#Batch2</li>
              </ul>
              <ul className="direct-msg">
                <span>Direct messages</span>
                <li>Praveen</li>
                <li>Madhusudan</li>
                <li>Komal</li>
              </ul>
            </div>
            <div className="right-sidebar">
                <div className="right-sidebar_header">
                  <h2>#Batch1</h2>
                </div>
                <div className="all-msg">
                  {
                    allMsg && allMsg.map(msg => <p>{msg}</p>)
                  }
                </div>
                <form onSubmit={this.handleSubmit}>
                   <input type="text" placeholder="type here" onChange={this.handleChange} />
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
    userId: state.currentUserId
  }
}

export default connect(mapStateToProps)(Dashboard)

import React, { Component } from 'react'

export default class GroupMsgs extends Component {
  render() {
      const { messages, allMsg } = this.props;
    return (
      <div>
        {
            messages && messages.map((msg,i) => <p key={i}><span className="member">{msg.username}:</span> {msg.msg}</p>)
        }
        {
            allMsg && allMsg.map((msg,i) => <p key={i}><span className="member">{msg.username}:</span> {msg.msg}</p>)
        }
      </div>
    )
  }
}


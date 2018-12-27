import React, { Component } from 'react'

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="left-sidebar">
                <div className="group-chat">
                    
                </div>
                <div className="direct-messages">
                    <ul>
                        <li>Madhusudan Bhardwaj</li>
                        <li>Praveen kr Saini</li>
                        <li>Komal Raj</li>
                        <li>Ashwani Goswami</li>
                    </ul>
                </div>
            </div>
        <main>
            <div className="right-sidebar">
            <header className="dashboard-header">
                 <h1>Batch 1</h1>
            </header>
            <div className="hero">

            </div>
            </div>
        </main>
      </div>
    )
  }
}

import React from "react";
import {connect} from "react-redux";
import {getMessages} from "../reducers";
import {Link} from "react-router-dom";

const ReceivedMessages = ({dispatch, messages}) => {
  const renderMessages = messages => {
    if (messages.length === 0) return <div className="navbar-item">No Messages :(</div>
    return messages.map((msg) => {
      console.log(msg);
      return (
        <div key={msg.id}>
          <div className="from-user">
            <span>From: </span>{msg.fromUser.name}
          </div>
          <hr/>
          <div className="navbar-item navbar-item-message">
            <div>
              {msg.text}
            </div>
            <Link onClick={() => {
            }} to={msg.cta}>
              <div className="button is-success s-m-r">Join</div>
            </Link>
            <button
              onClick={() => {
              }}
              className="button is-warning">Later
            </button>
          </div>
        </div>

      )
    })
  }

  return renderMessages(messages);
}

const mapStateToProps = state => ({
  messages: getMessages(state)
});

export default connect(mapStateToProps)(ReceivedMessages);
import React from "react";
import {connect} from "react-redux";
import {getMessages} from "../reducers";
import {Link} from "react-router-dom";
import {markMessageAsRead} from "../actions";

const ReceivedMessages = ({messages}) => {

  const handleMessageRead = message => {
    markMessageAsRead(message);
  }
  const renderMessages = messages => {
    const filteredMessages = messages.filter(m => !m.isRead).map((msg) => {
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
              onClick={() => handleMessageRead(msg)}
              className="button is-warning">Later
            </button>
          </div>
        </div>
      )
    })
    if (filteredMessages.length === 0) return <div className="navbar-item">No Messages <span role="img" aria-label="frown" style={{marginLeft: "5px"}}>😓</span></div>
    return filteredMessages;
  }

  return renderMessages(messages);
}

const mapStateToProps = state => ({
  messages: getMessages(state)
});

export default connect(mapStateToProps)(ReceivedMessages);
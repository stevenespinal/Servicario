import React from "react";
import {connect} from "react-redux";
import {getMessages} from "../reducers";
import {markMessageAsRead} from "../actions";
import {useHistory} from "react-router-dom";

const ReceivedMessages = ({messages}) => {

  const history = useHistory();

  const handleMessageRead = message => {
    markMessageAsRead(message);
  }

  const navigateToCollaboration = message => {
    markMessageAsRead(message);
    history.push(message.cta);
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
            <div onClick={() => {navigateToCollaboration(msg)}}>
              <div className="button is-success s-m-r">Join</div>
            </div>
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
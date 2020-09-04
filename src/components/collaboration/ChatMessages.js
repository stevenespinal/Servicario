import React from "react";
import moment from "moment";


const ChatMessages = ({messages, authUser}) => {
  const renderMessages = (messages, authUser) => {
    if (messages.length > 0) {
      return messages.map(msg => {
        if (msg.user.uid === authUser.uid) {
          return (
            <div className="viewWrapItemLeft" key={msg.id}>
              <div className="viewWrapItemLeft3">
                <img src={msg.user.avatar} alt="avatar" className="peerAvatarLeft"/>
                <div className="viewItemLeft">
                  <span className="textContentItem">{msg.content}</span>
                </div>
              </div>
              <span className="textTimeLeft">{moment(msg.timestamp).fromNow()}</span>
            </div>
          )
        }

        return (
          <div className="viewWrapItemRight" key={msg.id}>
            <div className="viewWrapItemRight3">
              <img src={msg.user.avatar} alt="" className="peerAvatarLeft"/>
              <div className="viewItemRight">
                <span className="textContentItem">{msg.content}</span>
              </div>
            </div>
            <span className="textTimeLeft">{moment(msg.timestamp).fromNow()}</span>
          </div>
        )
      })
    }
    return null;
  }

  return renderMessages(messages, authUser);
}

export default ChatMessages;
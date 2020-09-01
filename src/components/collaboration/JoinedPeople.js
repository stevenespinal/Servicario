import React from "react";

const JoinedPeople = ({users}) => {

  const status = state => {
    return state === "online" ? "success" : "danger";
  }

  const renderUsers = (users) => {
    return users.map(user => (
      <div className="viewWrapItem" key={user.id}>
        <img
          className="viewAvatarItem"
          src={user.avatar}
          alt="icon avatar"
        />
        <div className="viewWrapContentItem">
          <span className="textItem">{user.fullName}</span>
          <span className={`textItem tag is-${status(user.state)}`}>{user.state}</span>
        </div>
      </div>
    ))
  }

  if (users.length > 0) {
    return renderUsers(users);
  } else {
    return null;
  }
}

export default JoinedPeople;
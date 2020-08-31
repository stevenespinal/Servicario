import {SET_COLLABORATION, SET_COLLABORATION_JOINED_PEOPLE, UPDATE_COLLABORATION_USER} from "../types";
import {combineReducers} from "redux";

const initCollaboration = () => {
  const collaboration = (state = {}, action) => {
    const {type, collaboration} = action;
    switch (type) {
      case SET_COLLABORATION:
        return collaboration;
      default:
        return state;
    }
  }
  const joinedPeople = (state = [], action) => {
    const {type, joinedPeople} = action;
    switch (type) {
      case SET_COLLABORATION_JOINED_PEOPLE:
        return joinedPeople;
      case UPDATE_COLLABORATION_USER:
        const newJoinedPeople = [...state];
        const {user} = action;
        const index = newJoinedPeople.findIndex(jp => jp.uid === user.uid);
        if (index < 0) {
          return state;
        }
        if (newJoinedPeople[index].state === user.state) {
          return state;
        }
        newJoinedPeople[index].state = user.state;
        return newJoinedPeople;
      default:
        return state;
    }
  }
  const messages = (state = [], action) => {
    const {type} = action;
    switch (type) {
      default:
        return state;
    }
  }

  return combineReducers({
    joined: collaboration,
    joinedPeople,
    messages
  });
}

const collaboration = initCollaboration();

export default collaboration;
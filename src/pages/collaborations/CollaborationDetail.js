import React, {Component} from 'react';
import {connect} from 'react-redux';
import withAuthorization from '../../components/hoc/withAuthorization';
import {withRouter} from "react-router-dom";
import {Timestamp} from "../../db";
import {
  subscribeToCollaboration,
  joinCollaboration,
  subscribeToProfile,
  leaveCollaboration,
  sendCollabMessage,
  subToMessages,
  startCollaboration
} from "../../actions";
import JoinedPeople from "../../components/collaboration/JoinedPeople";
import moment from "moment";
import Timer from "../../components/collaboration/Timer";
import ChatMessages from "../../components/collaboration/ChatMessages";

class CollaborationDetail extends Component {
  state = {
    inputValue: '',
    reload: false
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    const {user} = this.props.auth;
    joinCollaboration(id, user.uid);
    this.watchCollabChanges(id);
    this.watchMessagesChanges(id);
  }

  watchCollabChanges = id => {
    this.unsubscribeFromCollaboration = this.props.subscribeToCollaboration(id, ({joinedPeople}) => {
      this.watchJoinedPeopleChanges(joinedPeople.map(jp => jp.id));
    });
  }

  watchJoinedPeopleChanges = ids => {
    this.peopleWatchers = {}
    ids.forEach(id => {
      this.peopleWatchers[id] = this.props.subscribeToProfile(id);
    });
  }

  watchMessagesChanges = collabId => {
    this.unsubscribeFromMessages = this.props.subToMessages(collabId);
  }

  componentWillUnmount() {
    const {id} = this.props.match.params;
    const {user} = this.props.auth;
    this.unsubscribeFromCollaboration();
    this.unsubscribeFromMessages();
    Object.keys(this.peopleWatchers).forEach(uid => this.peopleWatchers[uid]());
    user && leaveCollaboration(id, user.uid);
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  onSendMessage = inputValue => {
    if (inputValue.trim() === "") return;
    const timestamp = moment().valueOf().toString();
    const {auth: {user}, collaboration} = this.props;

    const message = {
      user: {
        uid: user.uid,
        avatar: user.avatar,
        name: user.fullName
      },
      timestamp: parseInt(timestamp, 10),
      content: inputValue.trim()
    }
    sendCollabMessage({message, collabId: collaboration.id, timestamp}).then(() => this.setState({inputValue: ''}));
  }

  onKeyboardPress = (e) => {
    if (e.key === "Enter") {
      this.onSendMessage(this.state.inputValue);
    }
  }


  onStartCollaboration = collaboration => {
    // alert(`Starting collab ${JSON.stringify(collaboration.title)}`);
    const {id, time} = collaboration;
    const secondsNow = Timestamp.now().seconds;
    const expiresAt = new Timestamp(secondsNow + time, 0);
    startCollaboration(id, expiresAt);
  }

  reloadPage = () => {
    this.setState({reload: true})
  }

  getCollaborationStatus = collaboration => {
    if (Object.keys(collaboration).length === 0) {
      return "loading";
    }
    if (!collaboration.expiresAt) {
      return 'notStarted';
    }

    if (Timestamp.now().seconds < collaboration.expiresAt.seconds) {
      return 'active';
    } else {
      return 'finished'
    }
  }

  render() {
    const {collaboration, joinedPeople, messages, auth: {user}} = this.props;
    const {inputValue} = this.state;
    const status = this.getCollaborationStatus(collaboration);

    return (
      <div className="content-wrapper">
        <div className="root">
          <h1 style={{fontWeight: "bold", fontSize: "24px"}}>{collaboration.title}</h1>
          <div className="body">
            <div className="viewListUser">
              <JoinedPeople users={joinedPeople}/>
            </div>
            <div className="viewBoard">
              <div className="viewChatBoard">
                <div className="headerChatBoard">
                  <div className="headerChatUser">
                    <img className="viewAvatarItem" src={user.avatar} alt="icon avatar"/>
                    <span className="textHeaderChatBoard">{user.fullName}</span>
                  </div>
                  {status === "notStarted" &&
                  <div className="headerChatButton">
                    <button className="button is-success"
                            onClick={() => this.onStartCollaboration(collaboration)}>Start
                      Collaboration
                    </button>
                  </div>
                  }
                  {status === "active" &&
                  <Timer seconds={collaboration.expiresAt.seconds - Timestamp.now().seconds}
                         timeOutCallback={this.reloadPage}/>
                  }
                  {status === "finished" && <span className="tag is-warning is-large">Collaboration Has Finished</span>
                  }
                </div>
                <div className="viewListContentChat">
                  <ChatMessages messages={messages} authUser={user}/>
                  <div style={{float: "left", clear: "both"}}/>
                </div>
                <div className="viewBottom">
                  <input
                    onChange={(e) => this.handleChange(e)}
                    value={inputValue}
                    onKeyPress={this.onKeyboardPress}
                    className="viewInput"
                    placeholder="Type your message..."
                    disabled={status === "finished" || status === 'notStarted'}
                  />
                  <button onClick={() => this.onSendMessage(inputValue)} className="is-primary button is-medium" disabled={status === "finished" || status === 'notStarted'}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = () => ({subscribeToCollaboration, subscribeToProfile, subToMessages});
const mapStateToProps = ({collaboration}) => ({
  collaboration: collaboration.joined,
  joinedPeople: collaboration.joinedPeople,
  messages: collaboration.messages
});

const Collaboration = withAuthorization(withRouter(CollaborationDetail));

export default connect(mapStateToProps, mapDispatchToProps())(Collaboration);

import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {logout} from "../actions";

class Logout extends Component {
  componentDidMount() {
    const {isAuth, user} = this.props.auth;

    if (isAuth) {
      this.props.dispatch(logout(user.uid));
    }
  }

  render() {
    const {isAuth} = this.props.auth;
    return (
      <div className="container">
        <div className="container-wrapper">
          {isAuth && <h1 className="title">Logging out...</h1>}
          {!isAuth && (
            <>
              <h1 className="title">You have been logged out</h1>
              <Link to="/">Take me home!</Link>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default connect(({auth}) => ({auth}))(Logout);
import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const withAuthorization = Component => {
  class WithAuthorization extends React.Component {

    render() {
      const {auth, dispatch, ...rest} = this.props;

      return auth.isAuth ? <Component {...rest}/> : <Redirect to="/login"/>
    }
  }

  const mapStateToProps = ({auth}) => ({auth});

  return connect(mapStateToProps)(WithAuthorization);
}

export default withAuthorization;
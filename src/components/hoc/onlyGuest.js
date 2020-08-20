import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const onlyGuest = Component => {
  class OnlyGuest extends React.Component {

    render() {
      const {auth, dispatch, ...rest} = this.props;

      return auth.isAuth ? <Redirect to="/"/> : <Component {...rest}/>
    }
  }

  const mapStateToProps = ({auth}) => ({auth});

  return connect(mapStateToProps)(OnlyGuest);
}

export default onlyGuest;
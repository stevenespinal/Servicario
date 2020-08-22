import React, {Component} from "react";
import withAuthorization from "../../components/hoc/withAuthorization";
import {fetchUserServices} from "../../actions";
import {connect} from "react-redux";
import ServiceItem from "../../components/service/ServiceItem";

class UserServices extends Component {
  componentDidMount() {
    const {auth: {user}, dispatch} = this.props
    dispatch(fetchUserServices(user.uid));
  }

  render () {
    const {services} = this.props;
    return (
      <div className="container">
        <div className="content-wrapper">
          <h1 className="title">Your Services</h1>
          <div className="columns is-multiline">
            {services.map(service => (
              <div key={service.id} className="column">
                <ServiceItem service={service}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({auth: {user: {services}}}) => ({services});

export default withAuthorization(connect(mapStateToProps)(UserServices));
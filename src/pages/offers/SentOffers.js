import React, {Component} from 'react'
import withAuthorization from '../../components/hoc/withAuthorization'
import ServiceItem from '../../components/service/ServiceItem'
import {fetchSentOffer} from "../../actions";
// import Spinner from "../../components/Spinner";
import {connect} from "react-redux";

class SentOffers extends Component {
  componentDidMount() {
    const {auth: {user}} = this.props;
    this.props.dispatch(fetchSentOffer(user.uid));
  }

  render() {
    const {offers} = this.props;
    return (
      <div className="container">
        <div className="content-wrapper">
          <h1 className="title">Sent Offers</h1>
          <div className="columns">
            <div className="column is-one-third">
              {offers.map(o => (
                <ServiceItem
                  key={o.id}
                  noButton
                  className="offer-card"
                  service={o.service}>
                  <div className="tag is-large">
                    {o.status}
                  </div>
                  <hr/>
                  <div className="service-offer">
                    <div>
                      <span className="label">From User:</span> {o.fromUser.fullName}
                    </div>
                    <div>
                      <span className="label">Note:</span> {o.note}
                    </div>
                    <div>
                      <span className="label">Price:</span> ${o.price}
                    </div>
                    <div>
                      <span className="label">Time:</span> {o.time} hours
                    </div>
                  </div>
                </ServiceItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({offers}) => ({
  offers: offers.sent
});


export default withAuthorization(connect(mapStateToProps)(SentOffers));
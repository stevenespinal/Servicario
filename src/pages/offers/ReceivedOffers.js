import React, {Component} from 'react'
import withAuthorization from '../../components/hoc/withAuthorization'
import ServiceItem from '../../components/service/ServiceItem'
import {fetchReceivedOffer} from "../../actions";
import {connect} from "react-redux";
import {changeOfferStatus} from "../../actions";

class ReceivedOffers extends Component {
  componentDidMount() {
    const {auth: {user}} = this.props;
    this.props.fetchReceivedOffer(user.uid);
  }

  acceptOffer = offerId => {
    this.props.changeOfferStatus(offerId, "accepted");
  }

  declineOffer = offerId => {
    this.props.changeOfferStatus(offerId, "declined");
  }

  statusClass = status => {
    if (status === "pending") {
      return 'is-warning';
    } else if (status === "accepted") {
      return 'is-success';
    } else {
      return 'is-danger';
    }
  }

  render() {
    const {offers} = this.props;

    // if (!offers) return <Spinner/>
    return (
      <div className="container">
        <div className="content-wrapper">
          <h1 className="title">Received Offers</h1>
          <div className="columns">
            <div className="column is-one-third">
              {offers.map((o) => (
                <ServiceItem
                  key={o.id}
                  noButton
                  className="offer-card"
                  service={o.service}>
                  <div className={`tag is-large ${this.statusClass(o.status)}`}>
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
                  {o.status === "pending" && <div>
                    <hr/>
                    <button onClick={() => this.acceptOffer(o.id)} className="button is-success s-m-r">Accept</button>
                    <button onClick={() => this.declineOffer(o.id)} className="button is-danger">Decline</button>
                  </div>}
                </ServiceItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({offers}) => ({
  offers: offers.received
});

const mapDispatchToProps = () => ({
  acceptOffer,
  declineOffer,
  fetchReceivedOffer,
  changeOfferStatus
})

export default withAuthorization(connect(mapStateToProps, mapDispatchToProps())(ReceivedOffers));

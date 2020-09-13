import React, {Component} from 'react'
import withAuthorization from '../../components/hoc/withAuthorization'
import ServiceItem from '../../components/service/ServiceItem'
import {fetchSentOffer, collaborate} from "../../actions";
import {connect} from "react-redux";
import {withToastManager} from "react-toast-notifications";
import {newCollaboration, newMessage} from "../../helpers/offers";
import Spinner from "../../components/Spinner";

class SentOffers extends Component {
  componentDidMount() {
    const {auth: {user}} = this.props;
    this.props.dispatch(fetchSentOffer(user.uid));

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

  createCollaboration = offer => {
    const {auth: {user}, toastManager} = this.props;
    const collaboration = newCollaboration({offer, fromUser: user});
    const msg = newMessage({offer, fromUser: user});
    this.props.collaborate({collaboration, message: msg}).then(() => {
      console.log("collaboration was created");
      toastManager.add("Collaboration was created.", {
        appearance: 'success',
        autoDismiss: true,
        autoDismissTimeout: 3000
      });
    });
  }

  render() {
    const {offers, isFetching} = this.props;
    if (isFetching) {
      return <Spinner/>
    }
    return (
      <div className="container">
        <div className="content-wrapper">
          <h1 className="title">Sent Offers</h1>
          {!isFetching && offers.length === 0 && <span className="tag is-warning is-large">You don't have any sent offers.</span>}
          <div className="columns is-multiline">
            <div className="column is-one-third">
              {offers.map(o => (
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
                      <span className="label">To User:</span> {o.toUser.fullName}
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
                  {o.status === "accepted" && !o.collaborationCreated && <div>
                    <hr/>
                    <button className="button is-dark" onClick={() => this.createCollaboration(o)}>Collaborate</button>
                  </div>}
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
  offers: offers.sent,
  isFetching: offers.isFetching
});

export default withAuthorization(connect(mapStateToProps, {collaborate})(withToastManager(SentOffers)));
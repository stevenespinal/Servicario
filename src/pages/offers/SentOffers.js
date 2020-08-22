import React, {Component} from 'react'
import withAuthorization from '../../components/hoc/withAuthorization'
import ServiceItem from '../../components/service/ServiceItem'
import {fetchSentOffer, collaborate} from "../../actions";
// import Spinner from "../../components/Spinner";
import {connect} from "react-redux";
import {newCollaboration, newMessage} from "../../helpers/offers";

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
    const {auth: {user}} = this.props;
    const collaboration = newCollaboration({offer, fromUser: user});
    const msg = newMessage({offer, fromUser: user});
    console.log("collab", collaboration, "msg", msg);
    collaborate({collaboration, msg}).then(() => {
      console.log("collaboration was created");
    });
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
                  {o.status === "accepted" && <div>
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
  offers: offers.sent
});


export default withAuthorization(connect(mapStateToProps)(SentOffers));
import React, {useState} from "react";
import Modal from "../Modal";
import {createOffer, createRef} from "../../actions";
import {useToasts} from "react-toast-notifications";

const OfferModal = ({service, auth}) => {
  const [offer, setOffer] = useState({
    fromUser: '',
    toUser: '',
    service: '',
    status: "pending",
    price: 0,
    time: 0,
    note: ''
  });
  const {addToast} = useToasts();


  const handleChange = ({target: {name, value}}) => {
    if (name === "time") {
      const price = Math.round(value * service.price * 100) / 100;
      return setOffer({...offer, [name]: value, price});
    }
    return setOffer({...offer, [name]: value});
  }

  const handleSubmit = closeModal => {
    const offerCopy = {...offer};
    offerCopy.fromUser = createRef("profiles", auth.user.uid);
    offerCopy.toUser = createRef("profiles", service.user.id);
    offerCopy.service = createRef("services", service.id);
    offerCopy.time = parseInt(offer.time, 10);
    createOffer(offerCopy).then(() => {
      closeModal();
      addToast(`Your offer has been successfully created.`, {
        appearance: "success", autoDismissTimeout: 3000,
        autoDismiss: true
      });
    }, err => console.error(err));
  }

  const {user} = service;
  // console.log(service);
  return (
    <Modal openButtonText="Create An Offer" onModalSubmit={handleSubmit}>
      <div className="field">
        <input
          className="input is-large"
          onChange={handleChange}
          name="note"
          type="text"
          placeholder="Write some catchy note"
          max="5"
          min="0"
        />
        <p className="help">Note can increase chance of getting the service</p>
      </div>
      <div className="field">
        <input
          className="input is-large"
          onChange={handleChange}
          name="time"
          type="number"
          placeholder="How long you need service for ?"
          max="5"
          min="0"
        />
        <p className="help">Enter time in hours</p>
      </div>
      <div className="service-price has-text-centered">
        <div className="service-price-title">
          {user && `Upon acceptance ${user.fullName} will charge you:`}
        </div>
        <div className="service-price-value">
          <h1 className="title">${offer.price}</h1>
        </div>
      </div>
    </Modal>
  )
};

export default OfferModal;
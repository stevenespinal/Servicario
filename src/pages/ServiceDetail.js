import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {fetchService} from "../actions";
import {useParams} from 'react-router-dom'
import Spinner from "../components/Spinner";
import OfferModal from "../components/service/OfferModal";

const ServiceDetail = ({service, isFetching, fetchService, auth}) => {
  const {id} = useParams();
  const {image, title, description, category, user} = service;

  useEffect(() => {
    fetchService(id);
  }, [fetchService, id]);


  if (isFetching || id !== service.id) return <Spinner/>;

  return (
    <section className="hero is-fullheight is-default is-bold service-detail-page">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="columns is-vcentered">
            <div className="column is-5">
              <figure className="image is-4by3">
                <img src={image} alt="Description"/>
              </figure>
            </div>
            <div className="column is-6 is-offset-1">
              <div className="service-header-container">
                <div className="media service-user">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img className="is-rounded" src={user.avatar} alt="Avatar"/>
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4">{user.fullName}</p>
                    <p className="subtitle is-6">Owner</p>
                  </div>
                </div>
                <div className="service-price">
                  <div className="media service-user">
                    <div className="media-content">
                      <p className="title is-4">${service.price}</p>
                      <p className="subtitle is-6">Per Hour</p>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="title is-2">
                {title}
              </h1>
              <div className="tag is-large service-category">
                {category}
              </div>
              <h2 className="subtitle is-4">
                {description}
              </h2>
              <br/>
              <div className="has-text-centered">
                <OfferModal auth={auth} service={service}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = ({auth, selectedService: {item, isFetching}}) => ({
  service: item,
  isFetching: isFetching,
  auth
})

export default connect(mapStateToProps, {fetchService})(ServiceDetail)
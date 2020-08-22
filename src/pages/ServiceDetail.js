import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {fetchService} from "../actions";
import {useParams} from 'react-router-dom'
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";

const ServiceDetail = ({dispatch, service, isFetching, fetchService}) => {
  const {id} = useParams();
  const {image, title, description} = service;

  useEffect(() => {
    fetchService(id);
  }, [fetchService, id]);


  if (isFetching || id !== service.id) return <Spinner/>;

  return (
    <section className="hero is-fullheight is-default is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="columns is-vcentered">
            <div className="column is-5">
              <figure className="image is-4by3">
                <img src={image} alt="Description"/>
              </figure>
            </div>
            <div className="column is-6 is-offset-1">
              <h1 className="title is-2">
                {title}
              </h1>
              <h2 className="subtitle is-4">
                {description}
              </h2>
              <br/>
              <p className="has-text-centered">
                <Modal openButtonText="Create An Offer"/>
                {/*<a href="/" className="button is-medium is-info is-outlined">*/}
                {/*  Learn more*/}
                {/*</a>*/}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*<div className="hero-foot">*/}
      {/*  <div className="container">*/}
      {/*    <div className="tabs is-centered">*/}
      {/*      <ul>*/}
      {/*        <li><a href="/">And this is the bottom</a></li>*/}
      {/*      </ul>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </section>
  )
}

const mapStateToProps = ({selectedService: {item, isFetching}}) => ({
  service: item,
  isFetching: isFetching
})

export default connect(mapStateToProps, {fetchService})(ServiceDetail)
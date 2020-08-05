import React from 'react'
import {useParams} from 'react-router-dom'

const ServiceDetail = () => {

  const {id} = useParams();


  return (
    <section className="hero is-fullheight is-default is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="columns is-vcentered">
            <div className="column is-5">
              <figure className="image is-4by3">
                <img src="" alt="Description"/>
              </figure>
            </div>
            <div className="column is-6 is-offset-1">
              <h1 className="title is-2">
                Hardcoded Title for Id: {id}
              </h1>
              <h2 className="subtitle is-4">
                Hardcoded Description
              </h2>
              <br/>
              <p className="has-text-centered">
                <a href="/" className="button is-medium is-info is-outlined">
                  Learn more
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-foot">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li><a href="/">And this is the bottom</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceDetail
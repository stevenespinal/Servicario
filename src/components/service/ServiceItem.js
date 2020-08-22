import React from "react";
import {Link} from "react-router-dom";

const ServiceItem = ({service, children, noButton}) => {

  const shortText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  }

  const {id, title, image, description} = service;

  return (
    <div key={id} className="column is-one-third">
      <div className="feature-card is-bordered has-text-centered revealOnScroll delay-1"
           data-animation="fadeInLeft">
        <div className="card-title">
          <h4>{title}</h4>
        </div>
        <div className="card-icon">
          <img
            src={image}
            alt=""/>
        </div>
        <div className="card-text">
          <p>{shortText(description)}</p>
        </div>
        {children && <div className="card-text">
          {children}
        </div>}

        {!noButton && (<div className="card-action">
            <Link to={`/services/${id}`} className="button btn-align-md accent-btn raised">Learn More</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceItem;
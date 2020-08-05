import React, {Component} from 'react'
import {fetchServices} from "../actions";
import {connect} from "react-redux";
import ServiceItem from "../components/service/ServiceItem";
import Hero from "../components/Hero";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchServices());
  }

  renderServices = services => services.map(service => (<ServiceItem service={service} key={service.id}/>));

  render() {
    const {services} = this.props;
    return (
      <div>
        <Hero/>
        <section className="section section-feature-grey is-medium">
          <div className="container">
            <div className="title-wrapper has-text-centered">
              <h2 className="title is-2">Great Power Comes </h2>
              <h3 className="subtitle is-5 is-muted">With great Responsability</h3>
              <div className="divider is-centered"/>
            </div>

            <div className="content-wrapper">
              <div className="columns">
                {this.renderServices(services)}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  services: state.services.items
})

export default connect(mapStateToProps)(Home)
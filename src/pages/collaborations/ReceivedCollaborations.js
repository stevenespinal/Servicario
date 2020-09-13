import React, {Component} from 'react'
import {Link} from "react-router-dom"
import withAuthorization from '../../components/hoc/withAuthorization'
import {fetchCollaborations} from '../../actions';
import moment from 'moment'
import Spinner from "../../components/Spinner";
import {Timestamp} from "../../db";

class Collaborations extends Component {

  state = {
    collaborations: [],
    loading: true
  }

  componentDidMount() {
    const {auth: {user}} = this.props;
    fetchCollaborations(user.uid).then(collaborations => this.setState({collaborations, loading: false}));
  }

  getCollaborationStatusClass = expiresAt => {
    if (!expiresAt) {
      return {
        className: 'is-danger',
        value: 'Not Started'
      };
    }

    if (Timestamp.now().seconds < expiresAt.seconds) {
      return {
        className: 'is-warning',
        value: 'In Progress'
      };
    } else {
      return {
        className: 'is-success',
        value: 'Finished'
      }
    }
  }

  renderCollaborations = collaborations => {
    return collaborations.map(c => {
        const {className, value} = this.getCollaborationStatusClass(c.expiresAt)
        return (
          <article className="post" key={c.id}>
            <h4>{c.title}</h4>
            <div className="media">
              <div className="media-left">
                <p className="image is-32x32">
                  <img src={c.image} alt={c.title}/>
                </p>
              </div>
              <div className="media-content">
                <div className="content">
                  <p>
                    <span>{c.fromUser.name}</span> replied {moment(c.createdAt.toDate()).fromNow()} &nbsp;
                    <span className={`tag ${className}`}>{value}</span>
                  </p>
                </div>
              </div>
              <div className="media-right">
            <span className="has-text-grey-light">
              <Link to={`/collaborations/${c.id}`}>
                <button className="button">Enter</button>
              </Link>
            </span>
              </div>
            </div>
          </article>
        )
      }
    )
  }

  render() {
    const {collaborations, loading} = this.state;

    if (loading) return <Spinner/>
    return (
      <div className="content-wrapper">
        <div className="container">
          <h1 className="title">Collaborations</h1>
          <div className="box content">
            {this.renderCollaborations(collaborations)}
          </div>
        </div>
      </div>
    )
  }
}

export default withAuthorization(Collaborations)
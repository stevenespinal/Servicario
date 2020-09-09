import React, {useState} from "react";
import {createService} from "../../actions";
import withAuthorization from "../../components/hoc/withAuthorization";
import {Redirect} from "react-router-dom";
import {useToasts} from "react-toast-notifications";

const ServiceCreate = ({auth: {user: {uid}}}) => {
  const [redirect, setRedirect] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    category: 'mathematics',
    title: '',
    description: '',
    image: '',
    price: null
  });
  const {addToast} = useToasts();


  const handleChange = e => {
    const {name, value} = e.target;
    setServiceForm({...serviceForm, [name]: value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    createService(serviceForm, uid).then(() => {
      setRedirect(true);
      addToast(`Successfully created service.`, {
        appearance: "success", autoDismissTimeout: 3000,
        autoDismiss: true
      })
    }).catch(error => {
      addToast(error.message, {
        appearance: 'error',
        autoDismissTimeout: 3000,
        autoDismiss: true
      });
    });
  }

  if (redirect) return <Redirect to="/"/>

  return (
    <div className="create-page">
      <div className="container">
        <div className="form-container">
          <h1 className="title">Create Service</h1>
          <form>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select">
                  <select name="category" onChange={handleChange}>
                    <option value="mathematics">Mathematics</option>
                    <option value="programming">Programming</option>
                    <option value="painting">Painting</option>
                    <option value="singing">Singing</option>
                    <option value="english">English</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  onChange={handleChange}
                  name="title"
                  className="input"
                  type="text"
                  placeholder="Your Title"/>
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
            <textarea
              onChange={handleChange}
              className="textarea"
              name="description"
              placeholder="Your Description"/>
              </div>
            </div>
            <div className="field">
              <label className="label">Image Url</label>
              <div className="control">
                <input
                  onChange={handleChange}
                  name="image"
                  className="input"
                  type="text"
                  placeholder="Your Image Url"/>
              </div>
            </div>
            <div className="field">
              <label className="label">Price per Hour</label>
              <div className="control">
                <input
                  name="price"
                  onChange={handleChange}
                  className="input"
                  type="number"
                  placeholder="Your Price"/>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  onClick={handleSubmit} type="button" className="button is-link">Create
                </button>
              </div>
              <div className="control">
                <button className="button is-text">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default withAuthorization(ServiceCreate);
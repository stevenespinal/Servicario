import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import {login} from "../actions";
import {useToasts} from "react-toast-notifications";
import {Redirect} from "react-router-dom";
import onlyGuest from "../components/hoc/onlyGuest";


const Login = () => {
  const [redirect, setRedirect] = useState(false);
  const {addToast} = useToasts();
  const {register, handleSubmit, errors} = useForm();

  const onLogin = data => {
    login(data).then((res) => {
      setRedirect(true);
      addToast(`Successfully logged in.`, {
        appearance: "success", autoDismissTimeout: 3000,
        autoDismiss: true
      })
    }, errorMessage => addToast(errorMessage, {
      appearance: 'error',
      autoDismissTimeout: 3000,
      autoDismiss: true
    }));
  }



  if (redirect) return <Redirect to="/"/>

  return (
    <div className="auth-page">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Login</h3>
          <p className="subtitle has-text-grey">Please login to proceed.</p>
          <div className="box">
            <figure className="avatar">
              <img src="https://placehold.it/128x128" alt="placeholder"/>
            </figure>
            <form onSubmit={handleSubmit(onLogin)}>
              <div className="field">
                <div className="control">
                  <input className="input is-large"
                         type="email"
                         placeholder="Your Email"
                         autoFocus=""
                         name="email"
                         autoComplete="email"
                         ref={register({
                           required: true,
                           pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                         })}
                  />
                  {errors.email &&
                  <div className="form-error">
                    {errors.email.type === "required" && <span className="help is-danger">Email is required</span>}
                    {errors.email.type === "pattern" &&
                    <span className="help is-danger">Email address is not valid</span>}
                  </div>}
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input className="input is-large"
                         type="password"
                         name="password"
                         placeholder="Your Password"
                         autoComplete="current-password"
                         ref={register({required: true})}
                  />
                  {errors.password && <div className="form-error">
                    {errors.password.type === "required" &&
                    <span className="help is-danger">Password is required</span>}
                  </div>}
                </div>
              </div>
              <button
                type="submit"
                className="button is-block is-info is-large is-fullwidth">Sign In
              </button>
            </form>
          </div>
          <p className="has-text-grey">
            <a href="/">Sign In With Google</a>&nbsp;
            <a href="/">Sign Up</a> &nbsp;·&nbsp;
            <a href="/">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default onlyGuest(Login);
/* eslint no-useless-escape: 0 */
import React from "react";
import {useForm} from "react-hook-form";

const RegisterForm = () => {
  const {register, handleSubmit, errors} = useForm();


  const getFormData = data => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(getFormData)}>
      <div className="field">
        <div className="control">
          <input name="email"
                 className="input is-large"
                 type="email"
                 placeholder="Your Email"
                 autoFocus=""
                 autoComplete="email"
                 ref={register({
                   required: true,
                   pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                 })}
          />
          {errors.email && <div className="form-error">
            {errors.email.type === "required" && <span className="help is-danger">Email is required</span>}
            {errors.email.type === "pattern" && <span className="help is-danger">Email address is not valid</span>}
          </div>}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input name="fullName"
                 className="input is-large"
                 type="text"
                 placeholder="Full Name"
                 autoFocus=""
                 ref={register({required: true, minLength: 10})}

          />
          {errors.fullName && <div className="form-error">
            {errors.fullName.type === "required" && <span className="help is-danger">Name is required</span>}
            {errors.fullName.type === "minLength" && <span className="help is-danger">Name is not valid</span>}
          </div>}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input name="avatar"
                 className="input is-large"
                 type="text"
                 placeholder="Avatar"
                 autoFocus=""
                 ref={register({
                   required: true,
                   pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
                 })}
          />
          {errors.avatar && <div className="form-error">
            {errors.avatar.type === "required" && <span className="help is-danger">Avatar is required</span>}
            {errors.avatar.type === "pattern" && <span className="help is-danger">Avatar is not valid</span>}
          </div>}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input name="password"
                 className="input is-large"
                 type="password"
                 placeholder="Your Password"
                 autoComplete="current-password"
                 ref={register({required: true, minLength: 6})}
          />
          {errors.password && <div className="form-error">
            {errors.password.type === "required" && <span className="help is-danger">Password is required</span>}
            {errors.password.type === "minLength" && <span className="help is-danger">Password must be at least 6 characters</span>}
          </div>}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input name="passwordConfirmation"
                 className="input is-large"
                 type="password"
                 placeholder="Repeat Password"
                 autoComplete="current-password"
                 ref={register({required: true, minLength: 6})}
          />
          {errors.passwordConfirmation && <div className="form-error">
            {errors.passwordConfirmation.type === "required" && <span className="help is-danger">Password Confirmation is required</span>}
            {errors.passwordConfirmation.type === "minLength" && <span className="help is-danger">Password must be at least 6 characters</span>}
          </div>}
        </div>
      </div>
      <button
        type="submit"
        className="button is-block is-info is-large is-fullwidth">Register
      </button>
    </form>
  )
};

export default RegisterForm;
import React from "react";

const withAuthorization = Component => {
  class WithAuthorization extends React.Component {

    state = {
      secretData: "Hello World, this is a secret",
      secretNumber: 777
    }

    someFunc() {
      alert("Hello");
    }

    render() {
      return (
        <Component someFunc={this.someFunc} {...this.state}/>
      )
    }
  }

  return WithAuthorization;
}

export default withAuthorization;
import React from "react";
import withAuthorization from "../components/hoc/withAuthorization";
const Secret = (props) => {
  console.log(props);
  return (
    <h1>Secret Page for authenticated users</h1>
  )
}

export default withAuthorization(Secret);
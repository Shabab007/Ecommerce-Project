import React from "react";
import SignIn from "../component/Auth/signin";

const Login = props => {
  console.log(props.history);
  return <SignIn history={props.history} />;
};

export default Login;

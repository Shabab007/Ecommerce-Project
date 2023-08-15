import React, { useState, useContext } from "react";
import { Form } from "./signupStyle";
import { useMutation } from "@apollo/react-hooks";
import { SIGNIN_QUERY } from "../../Queries/mutaion";
import { AuthContext } from "../context/authContext";
const SignIn = props => {
  console.log(props);
  const context = useContext(AuthContext);
  const [Input, setInput] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const inputform = ["email", "password"];
  const [addUser, { loading }] = useMutation(SIGNIN_QUERY, {
    update(proxy, result) {
      // console.log(result.data.signIn);
      context.login(result.data.signIn);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(errors => err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: Input,
  });

  const formSubmit = function (e) {
    e.preventDefault();

    addUser();
  };
  const inputData = function (e) {
    let values = e.target;

    setInput(function (Input) {
      console.log(Input);
      return { ...Input, [values.name]: values.value };
    });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Form onSubmit={formSubmit}>
        <label id="name">Name</label>
        {inputform.map((item, index) => {
          return (
            <input
              name={item}
              onChange={inputData}
              type={item === "email" ? "text" : item}
              placeholder={item === "confpass" ? "confirm password" : item}
              key={index}
            ></input>
          );
        })}
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default SignIn;

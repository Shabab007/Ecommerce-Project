import React, { useState, useContext } from "react";
import { Form } from "./signupStyle";
import { useMutation } from "@apollo/react-hooks";
import { SIGNUP_QUERY } from "../../Queries/mutaion";
import { AuthContext } from "../context/authContext";
const SignUp = props => {
  const context = useContext(AuthContext);
  const [Input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const inputform = ["name", "email", "password", "confirmPassword"];
  const [addUser, { loading }] = useMutation(SIGNUP_QUERY, {
    update(proxy, result) {
      console.log(result.data.signUp.token);
      context.login(result.data.signUp);
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
        <label for="name">Name</label>
        {
          inputform.map((item, index) => {
            if (item === "password" || item === "confirmPassword") {
              return (
                <input
                  name={item}
                  onChange={inputData}
                  type="password"
                  placeholder={item === "confpass" ? "confirm password" : item}
                  key={index}
                ></input>
              );
            }

            return (
              <input
                name={item}
                onChange={inputData}
                type="text"
                placeholder={item}
                key={index}
              ></input>
            );
          })

          /* <input
          onChange={inputData}
          type="text"
          id="name"
          placeholder="name"
        ></input>
        <input type="text" placeholder="email"></input>
        <input type="text" placeholder="password"></input>
        <input type="text" placeholder="confirm password"></input> */
        }
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default SignUp;

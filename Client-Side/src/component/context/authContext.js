import React, { createContext, useReducer, useEffect } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedTok = jwtDecode(localStorage.getItem("jwtToken"));
  if (decodedTok.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    // console.log(decodedTok);
    const data = JSON.parse(localStorage.getItem("userData"));
    // console.log(data);
    initialState.user = data;
  }
}

const AuthContext = createContext({
  user: null,
  login: data => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = userData => {
    localStorage.setItem("jwtToken", userData.token);
    localStorage.setItem("userData", JSON.stringify(userData));

    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userData");
    props.client.resetStore();

    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };

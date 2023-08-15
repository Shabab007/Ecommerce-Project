import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Nav, Title, Addres, Space, Cart } from "./style";
import { AuthContext } from "../context/authContext";
import Search from "../Serachbox/search";

const Navbar = props => {
  const { user, logout } = useContext(AuthContext);
  // console.log(props.children);
  // console.log(user);
  const menubar = user ? (
    user.user.role === "ADMIN" ? (
      <>
        <Nav>
          <Search />
          <div>
            <Link to="/">
              <p>{user.user.name}</p>
            </Link>
          </div>
          <div>
            <Link to="/create">
              <p>Create</p>
            </Link>
          </div>

          <div>
            <Link to="/cart">
              <p>Cart</p>
            </Link>
          </div>

          <div onClick={logout}>
            <p>Logout</p>
          </div>

          <Cart />
        </Nav>

        <Space>
          <Title>CREATIVE</Title>
          <Addres>KALABAGAN,DHAKA</Addres>
        </Space>
      </>
    ) : (
      <>
        <Nav>
          <Search />
          <div>
            <Link to="/">
              <p>{user.user.name}</p>
            </Link>
          </div>
          <div>
            <Link to="/cart">
              <p>Cart</p>
            </Link>
          </div>
          <div>
            <div onClick={logout}>
              <p>Logout</p>
            </div>
          </div>
          <Cart />
        </Nav>
        <Space>
          <Title>CREATIVE</Title>
          <Addres>KALABAGAN,DHAKA</Addres>
        </Space>
      </>
    )
  ) : (
    <>
      <Nav>
        <Search />
        <div>
          <Link to="/">
            <p>Home</p>
          </Link>
        </div>
        <div>
          <Link to="/cart">
            <p>Cart</p>
          </Link>
        </div>
        <div>
          <Link to="/login">
            <p>Login</p>
          </Link>
        </div>
        <div>
          <Link to="/signup">
            <p>signup</p>
          </Link>
        </div>
        <Cart />
      </Nav>
      <Space>
        <Title>CREATIVE</Title>
        <Addres>KALABAGAN,DHAKA</Addres>
      </Space>
    </>
  );

  return menubar;
};

export default Navbar;

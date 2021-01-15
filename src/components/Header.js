import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"
import Logo from "../arg.png"

export const Header = () => {
  return(
    <Navbar bg="light" variant="light" sticky="top">
      <Navbar.Brand href="#home">
        <div style={{ width: 80 }}>
          <img
            alt="logo"
            src={Logo}
            width="100%"
            className="d-inline-block align-top"
          />
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/users">Users</Link>
          <Link to="/books">Books</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
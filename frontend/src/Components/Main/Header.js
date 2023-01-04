import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import { Container, Nav, Navbar, Dropdown , Image} from "react-bootstrap"
import { Bell } from "react-bootstrap-icons"

// Styles
import "../../Styles/Header.css"

// Contexts
import { AuthContext } from '../../Contexts/AuthContext';

// Components
import UserProfileToggle from "../Dropdown/Toggle/UserProfileToggle"

const navigation = [
  { name: 'Rooms', href: '/', current: true }
]

const Header = () => {

  const {logout} = useContext(AuthContext)

  const HandleLogout = async () => {
    await logout()
  }

  return (
    <header className="header">
      <Navbar collapseOnSelect bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">ATS Chat</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {navigation.map(item => (
                <Nav.Link as={Link} to={item.href} key={item.href}>{item.name}</Nav.Link>
              ))}
            </Nav>
            <Nav className="user">
                <Nav.Link as="div">
                  <Bell/>
                </Nav.Link>
                <Dropdown 
                  align={"end"}
                >
                  <Dropdown.Toggle as={UserProfileToggle} id="user-dropdown">
                    <Image roundedCircle src="/assets/imgs/user-profile.webp"></Image>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item as="button" bsPrefix="dropdown-logout" onClick={HandleLogout} >Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header 
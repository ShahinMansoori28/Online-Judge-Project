import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import './style.css';
import { Link } from "react-router-dom";
import MemoryIcon from '@mui/icons-material/Memory';

function Barnav() {
  const [expand, setExpand] = useState(false);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className='navbar navfontfamily'
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <span className='nav_ac navbar-brand' to="/">
            <MemoryIcon style={{ fontSize: '1.5em' }} />
            Online Judge
          </span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            setExpand(expand ? false : "expanded");
          }}
        >
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            {/* <Nav.Item>
                  <Nav.Link
                      as={Link}
                      to="/"
                      onClick={() => setExpand(false)}
                      className='myNavLink'
                  >
                      Home
                  </Nav.Link>
              </Nav.Item> */}

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/"
                onClick={() => setExpand(false)}
                className='myNavLink'
              >
                &nbsp;Problems&nbsp;
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/leaderboard"
                onClick={() => setExpand(false)}
                className='myNavLink'
              >
                &nbsp;LeaderBoard&nbsp;
              </Nav.Link>
            </Nav.Item>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  // return (<div>
  //   <div>
  //     <h1> Online Judge {":)"} </h1>
  //   </div>
  //   <div>
  //     <Link to={`/leaderboard`}>LeaderBoard</Link>
  //   </div>
  // </div>);
}

export default Barnav;

import React from 'react'

import { Link } from "react-router-dom";

// reactstrap components
import {Navbar, Container, NavbarBrand, UncontrolledTooltip, Collapse} from "reactstrap";

function IndexNavbar() {

  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color] = React.useState("navbar-transparent");

  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };

  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };

  const onCollapseExited = () => {
    setCollapseOut("");
  };

  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand  to="/" tag={Link} id="navbar-brand">
            <span>ERC 20 </span>
            Token Exchange
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Designed and Coded by Creative Tim
          </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >


        </Collapse>
      </Container>
    </Navbar>
  )
}

export default IndexNavbar
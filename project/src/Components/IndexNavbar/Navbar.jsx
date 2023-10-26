import React from 'react'

// reactstrap components
import {Navbar, Container, NavbarBrand} from "reactstrap";

function navbar() {
  return (
    <Navbar>
      <Container>
        <div>
          <NavbarBrand>
            <span>ERC 20 </span>
            Token Exchange
          </NavbarBrand>
        </div>
      </Container>
    </Navbar>
  )
}

export default navbar
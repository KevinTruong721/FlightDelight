import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';

import {Link, useNavigate} from 'react-router-dom';

import "./Homepage.css";

import Button from 'react-bootstrap/Button';

function Home () {

  const navigate = useNavigate();

  const navigateFlights = () => {
    navigate('/FlightDetails');
  }


  return (
      <div>
        <div>
          <Navbar bg="primary" variant="dark">
            <Container>
              <Nav className="me-auto">
                <Navbar.Brand as={Link} to = {"/"}>FlightDelight</Navbar.Brand>
                <Nav.Link as={Link} to={"/FlightDetails"} >Flights</Nav.Link>
              </Nav>
              </Container>
          </Navbar>
        </div>

        <div className="homecontainer"> 
        <h1 className="hometext"> TRAVELING SOMEWHERE? </h1>  
         <Button className="homepagebutton" variant="primary" size="lg" onClick={navigateFlights} >
            SEARCH FLIGHTS
          </Button>     
        </div>

      </div>
  
  )
}

export default Home;
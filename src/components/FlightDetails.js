import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './Details.css';
import 'bootstrap/dist/css/bootstrap.css';

import React, { useState, useRef } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import flights from "./flights.json";

import Countries from "./countries.json";
import Currencies from "./currencies.json";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import {Link} from 'react-router-dom';


function FlightDetails () {


  const [show, setShow] = useState(false); 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showModal, setShowModal] = useState(false);


  const [departureCountry, setdepartureCountry] = useState("");
  const [destinationCountry, setdestinationCountry] = useState("");
  
  const[titleCountry1, settitleCountry1] = useState("--Select Country--");
  const[titleCountry2, settitleCountry2] = useState("--Select Country--");

  const [departing_country, setdeparting_country] = useState("");
  const [destination_country, setdestination_country] = useState("");
  const [departing_time, setdeparting_time] = useState("");
  const [arrival_time, setarrival_time] = useState("");
  const [gate, setGate] = useState("");

  const dataGridRef = useRef(null);

  const[currencyTitle, setCurrencyTitle] = useState("CAD");

  var priceCurrency = "Price." + currencyTitle;
  var priceCaption = "Price (" + currencyTitle + ")";

  const dblclick = (e) => {

    const dataGrid = dataGridRef.current.instance;
    setdeparting_country(dataGrid.cellValue(e.rowIndex, "departing_country"));
    setdestination_country(dataGrid.cellValue(e.rowIndex, "destination_country"));
    setdeparting_time(dataGrid.cellValue(e.rowIndex, "departing_time"));
    setarrival_time(dataGrid.cellValue(e.rowIndex, "arrival_time"));
    setGate(dataGrid.cellValue(e.rowIndex, "gate"));
    
    setShowModal(handleShow);

  }

  const filterCountry = () => {
    const dataGrid = dataGridRef.current.instance;
    dataGrid.clearFilter();
    dataGrid.filter([['departing_country', '=', departureCountry], "and", ['destination_country', '=', destinationCountry]]);
  }

  const clearFilterCountry = () => {
    const dataGrid = dataGridRef.current.instance;
    dataGrid.clearFilter();
  }
  
 const ModalContent = (e) => {

    return (
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Flight Information</Modal.Title>
      </Modal.Header>
      <Modal.Body><b>Departing Country: </b> {departing_country}</Modal.Body>
      <Modal.Body><b>Destination Country: </b> {destination_country}</Modal.Body>
      <Modal.Body><b>Departing Time: </b> {departing_time}</Modal.Body>
      <Modal.Body><b>Arrival Time: </b> {arrival_time}</Modal.Body>
      <Modal.Body><b>Gate: </b> {gate}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>     
      </Modal.Footer>
      </Modal>  
    );
  }
 
  return (
    <div className="App">
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


      {show ? <ModalContent/> : null}
      <p margin = {"500px"}></p>

      <div className = "dropdownButtons">
        <div>
          <div class = "countryDropdown1">
            <p>Starting From: </p>
            <DropdownButton title={titleCountry1} style = {{width: '400px'}} variant="outline-dark">
              <div style={{height: "300px", overflowY:"auto"}}>
                {Countries.map(countries1 => (
                  <Dropdown.Item key = {countries1.id} onClick={() => {settitleCountry1(countries1.Country); setdepartureCountry(countries1.Country);}}>{countries1.Country}</Dropdown.Item>
                ))}
              </div>
            </DropdownButton>
          </div>


          <div class = "countryDropdown2">
          <p>Going To: </p>
          <DropdownButton title={titleCountry2} style = {{width: '400px'}} variant="outline-dark">
            <div style={{height: "300px", overflowY:"auto"}}>
            {Countries.map(countries2 => (
                <Dropdown.Item key = {countries2.id} onClick={() => {settitleCountry2(countries2.Country); setdestinationCountry(countries2.Country);}}>    {countries2.Country}
                </Dropdown.Item>
              ))} 
            </div>
          </DropdownButton>
          </div>
        

          <div class = "searchbar">
            <div className = "search">
              <Button variant="primary" size="lg" onClick={filterCountry}>
                Search 
              </Button>   
            </div>

            <div className = "filterSearch">
              <Button variant="primary" size="lg" onClick={clearFilterCountry}>
                Clear Filter
              </Button>   
            </div>
          </div>
        </div>
      </div>
  


      <div> 
      <DataGrid
        showRowLines = {true}
        rowAlternationEnabled = {true}
        ref = {dataGridRef}
        dataSource={flights}
        showBorders={true}
        remoteOperations={true}
        onRowDblClick = {dblclick}
      >
  

        <Column
          dataField="id"
          dataType="Number"
          visible={false}
        />
         <Column
          dataField="departing_country"
          dataType="string"
          visible={false}
        />
        <Column
          dataField="destination_country"
          dataType="string"
          visible={false}
        />
          <Column
          dataField="departing_time"
          dataType="string"
          visible={false}
        />

        <Column
          dataField="arrival_time"
          dataType="string"
          visible={false}
        />

        <Column
          dataField="gate"
          dataType="string"
          visible={false}
        />

        <Column
          dataField="Departure"
          dataType="string"
        />
        <Column
          dataField="Destination"
          dataType="string"
        />
        <Column
          dataField="Departure_Date"
          dataType="date"
        />
        <Column
          dataField="Arrival_Date"
          dataType="date"
        />
        <Column
          dataField="Airline"
          dataType="string"
        />
        <Column
          dataField= {priceCurrency}
          caption = {priceCaption}
          dataType="number"
          format="decimal"
          alignment={'left'}
        />
        
        <Paging defaultPageSize={15} />
        <Pager
          //showPageSizeSelector={true}
          //allowedPageSizes={allowedPageSizes}
        />
      </DataGrid>
      </div>


          <div className = "currencydropdown">
            <div className = "currencytitle"> 
              <p> Currency Exchange: </p>
            </div>
            <div className = "currencysymbols">
            <DropdownButton title={currencyTitle} style = {{width: '400px'}} variant="outline-dark">
              <div style={{height: "300px", overflowY:"auto"}}>
                {Currencies.map(currencies => (
                  <Dropdown.Item key = {currencies.id} onClick={() => {setCurrencyTitle(currencies.currency)}}>{currencies.currency}</Dropdown.Item>
               ))}
              </div>
           </DropdownButton>
           </div>
          </div>
    

    </div>
  );
}

export default FlightDetails;

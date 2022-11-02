import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './components/Home';
import FlightDetails from './components/FlightDetails'

import React from 'react';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}  />
        <Route path= "/FlightDetails" element={<FlightDetails/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

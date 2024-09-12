
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import Services from './Components/Services';
import Appliance from './Components/Appliances';



import VideoCarousel from "./Components/VideoCarousel"
import BecomeSP from "./Pages/BecameSP"
import Home from "./Pages/Home"


function App() {
  return (

    <Router>
      <Navigation /> {/* Place Navigation outside Routes to display on all pages */}
      <Routes>
        <Route path="/" element={<Services />} /> {/* Home route for Services */}
        <Route path="/appliance" element={<Appliance />} /> {/* Route for Appliance */}
        {/* Add more routes as needed */}
      </Routes>
      <Footer /> {/* Place Footer outside Routes to display on all pages */}
    </Router>
  );

    <>
 <BecomeSP/>
 
     <Navigation/> 
    <Home/>
    </>
  

}

export default App;

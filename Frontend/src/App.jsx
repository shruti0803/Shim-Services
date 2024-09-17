
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Services from './Components/Services';
import Appliance from './Components/Appliances';
import Footer from "./Components/Footer"

import Option from "./Components/Option"
import VideoCarousel from "./Components/VideoCarousel"
import BecomeSP from "./Pages/BecameSP"
import Home from "./Pages/Home"
import Beauty from './Components/Beauty';
import BecomeServiceProviderForm from './Pages/BecameSP';
import HouseCleaning from './Components/HouseCleaning';
import Orders from './Pages/Orders';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './Pages/Profile';


function App() {
  return (

    <Router>
      <AuthProvider>
      <Navigation /> 
      <Routes>

        <Route path="/" element={<Home/>} /> 
        <Route path="/appliance" element={<Appliance />} /> 
        <Route path="/beauty" element={<Beauty/>} /> 
        <Route path="/housecleaning" element={<HouseCleaning/>} /> 
        <Route path="/services" element={<Services/>} /> 
        <Route path="/orders" element={<Orders/>} /> 
        <Route path="/becomeSP" element={<BecomeServiceProviderForm/>} /> 
        <Route path="/option" element={<Option/>}/>
        <Route path="/profile" element={<ProfilePage/>} /> 
      </Routes>
      <Footer />
      </AuthProvider> 
    </Router>
  );
}

export default App;

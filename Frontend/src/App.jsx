import Appliance from "./Components/Appliances"
import Beauty from "./Components/Beauty"
import Footer from "./Components/Footer"
import Navigation from "./Components/Navigation"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import VideoCarousel from "./Components/VideoCarousel"
import Home from "./Pages/Home"



function App() {
  
  return (
    <>
 
 <Router>
      <Navigation /> {/* Place Navigation outside Routes to display on all pages */}
      <Routes>
        <Home/>
        <Route path="/" element={<Services />} /> {/* Home route for Services */}
        <Route path="/appliance" element={<Appliance />} /> {/* Route for Appliance */}
        {/* Add more routes as needed */}
      </Routes>
      <Footer /> {/* Place Footer outside Routes to display on all pages */}
    </Router>

    </>
  )
}

export default App

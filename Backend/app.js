import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import { createServer } from 'http'; // Import to create HTTP server
import { Server } from 'socket.io'; // Import socket.io
import {
  getAllServiceProviders,
  addServiceProvider
} from './models/serviceProvider.js';
import {
  getAllCustomers,
  addCustomer,
  updateIsSP
} from './models/customer.js';
import {
  getAllBookings,
  addBooking,
  deleteBooking,
  getBookingsByServiceProvider
} from './models/booking.js';
import { getAllServices, addService } from './models/service.js';
import { getAllServicesForProvider, addNewServiceForProvider } from './models/sp_services.js';
import { getAllCities, addCity } from './models/city.js';
import { addBookingPost } from './models/bookingPost.js';

dotenv.config();


const app = express();
const httpServer = createServer(app); // Create HTTP server
const io = new Server(httpServer, { // Initialize Socket.io with HTTP server
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

// Socket.io connection event
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Example event: notify when a new service provider is added
  socket.on('newServiceProvider', (data) => {
    console.log('New service provider added:', data);
    io.emit('updateServiceProviders', data); // Broadcast the update
  });

  // Additional events can be added here as needed
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Service Provider Routes
app.get('/serviceproviders', (req, res) => {
  getAllServiceProviders((err, results) => {
    if (err) {
      console.error('Error retrieving service providers:', err);
      return res.status(500).json({ error: 'Failed to retrieve service providers' });
    }
    res.json(results);
  });
});

app.post('/serviceproviders', (req, res) => {
  const newProvider = req.body;
  if (!newProvider.SP_Email || !newProvider.SP_PIN || !newProvider.GovernmentID || !newProvider.CityName) {
    return res.status(400).json({ error: 'Missing required fields: SP_Email, SP_PIN, GovernmentID, CityName' });
  }
  addServiceProvider(newProvider, (err, result) => {
    if (err) {
      console.error('Error adding service provider:', err);
      return res.status(500).json({ error: err.error || 'Failed to add service provider' });
    }
    res.status(201).json({ message: 'Service provider added successfully', result });
    io.emit('newServiceProvider', newProvider); // Notify clients about new provider
  });
});

// Customer Routes
app.get('/customers', (req, res) => {
  getAllCustomers((err, results) => {
    if (err) {
      console.error('Error retrieving customers:', err);
      return res.status(500).json({ error: 'Failed to retrieve customers' });
    }
    res.json(results);
  });
});

app.post('/customers', (req, res) => {
  const newCustomer = req.body;
  if (!newCustomer.U_Email) {
    return res.status(400).json({ error: 'Missing required field: email' });
  }
  addCustomer(newCustomer, (err, result) => {
    if (err) {
      console.error('Error adding customer:', err);
      return res.status(500).json({ error: err.error || 'Failed to add customer' });
    }
    res.status(201).json({ message: 'Customer added', result });
  });
});

// Additional routes and middleware continue as per your existing code...

// Start the server using httpServer with socket.io



// Update is_SP for Customer
app.put('/customers/:U_Email', (req, res) => {
  const { U_Email } = req.params;  // Changed userId to U_Email
  const { is_SP } = req.body;

  // Validate request data
  if (!U_Email || typeof is_SP === 'undefined') {
    return res.status(400).json({ error: 'Missing required fields: U_Email or is_SP value' });
  }

  updateIsSP(U_Email, is_SP, (err, result) => {
    if (err) {
      console.error('Error updating customer:', err);
      return res.status(500).json({ error: 'Failed to update customer' });
    }
    res.status(200).json({ message: 'Customer updated successfully', result });
  });
});

// Booking Routes
app.get('/bookings', (req, res) => {
  getAllBookings((err, results) => {
    if (err) {
      console.error('Error retrieving bookings:', err);
      return res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
    res.json(results);
  });
});

app.post('/bookings', (req, res) => {
  const newBooking = req.body;

  // Validate request data
  if (!newBooking.Service_Name || !newBooking.Book_Date || !newBooking.Book_City) {
    return res.status(400).json({ error: 'Missing required fields: Service_Name, Book_Date, Book_City' });
  }

  addBooking(newBooking, (err, result) => {
    if (err) {
      console.error('Error adding booking:', err);
      return res.status(500).json({ error: 'Failed to add booking' });
    }
    res.status(201).json({ message: 'Booking added', result });
  });
});

app.delete('/bookings/:id', (req, res) => {
  const { id } = req.params;

  deleteBooking(id, (err, result) => {
    if (err) {
      console.error('Error deleting booking:', err);
      return res.status(500).json({ error: 'Failed to delete booking' });
    }
    res.status(200).json({ message: 'Booking deleted successfully', result });
  });
});

// Service Routes
app.get('/services', (req, res) => {
  getAllServices((err, results) => {
    if (err) {
      console.error('Error retrieving services:', err);
      return res.status(500).json({ error: 'Failed to retrieve services' });
    }
    res.json(results);
  });
});

app.post('/services', (req, res) => {
  const newService = req.body;

  // Validate request data
  if (!newService.Service_Name || !newService.Service_Category) {
    return res.status(400).json({ error: 'Missing required fields: Service_Name, Service_Category' });
  }

  addService(newService, (err, result) => {
    if (err) {
      console.error('Error adding service:', err);
      return res.status(500).json({ error: 'Failed to add service' });
    }
    res.status(201).json({ message: 'Service added', result });
  });
});

// Start the server
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// City Routes
app.get('/cities', (req, res) => {
  getAllCities((err, results) => {
    if (err) {
      console.error('Error retrieving cities:', err);
      return res.status(500).json({ error: 'Failed to retrieve cities' });
    }
    res.json(results);
  });
});

app.post('/cities', (req, res) => {
  const newCity = req.body;

  // Validate request data
  if (!newCity.City_PIN || !newCity.City_Name || !newCity.City_State || !newCity.City_Country) {
    return res.status(400).json({ error: 'Missing required fields: City_PIN, City_Name, City_State, City_Country' });
  }

  addCity(newCity, (err, result) => {
    if (err) {
      console.error('Error adding city:', err);
      return res.status(500).json({ error: 'Failed to add city' });
    }
    res.status(201).json({ message: 'City added successfully', result });
  });
});

//booking new shruti


app.get('/bookings/sp/:email', (req, res) => {
  const { email } = req.params;
  console.log('Fetching bookings for service provider with email:', email); // Debugging print

  getBookingsByServiceProvider(email, (err, results) => {
      if (err) {
          console.error('Error retrieving bookings for service provider:', err);
          return res.status(500).json({ error: 'Failed to retrieve bookings for service provider' });
      }
      console.log('Retrieved bookings:', results); // Debugging print
      res.json(results);
  });
});


app.get('/sp_services/:spEmail', (req, res) => {
  const { spEmail } = req.params;

  getAllServicesForProvider(spEmail, (err, results) => {
    if (err) {
      console.error('Error retrieving services for provider:', err);
      return res.status(500).json({ error: 'Failed to retrieve services for provider' });
    }
    res.json(results);
  });
});

app.post('/sp_services', (req, res) => {
  const newService = req.body;

  // Validate request data
  if (!newService.SP_Email || !newService.Service_Name || !newService.Service_Category || !newService.Service_Experience) {
    return res.status(400).json({ error: 'Missing required fields: SP_Email, Service_Name, Service_Category, Service_Experience' });
  }

  addNewServiceForProvider(newService, (err, result) => {
    if (err) {
      console.error('Error adding new service:', err);
      return res.status(500).json({ error: err.error || 'Failed to add new service' });
    }
    res.status(201).json({ message: 'Service added successfully', result });
  });
});

app.post('/bookingPost', (req, res) => {
  const bookingData = req.body;

  // Ensure required fields are present
  const requiredFields = [ 'U_Email', 'Book_Status', 'Service_Name', 'Book_Date', 'Book_HouseNo', 'Book_Area', 'Book_City', 'Book_City_PIN', 'Book_State'];
  for (let field of requiredFields) {
    if (!bookingData[field]) {
      return res.status(400).json({ message: `Missing required field: ${field}` });
    }
  }

  // Add booking to the database
  addBookingPost(bookingData, (err, result) => {
    if (err) {
      console.error('Error adding booking:', err);
      return res.status(500).json({ message: err.message });
    }

    res.status(201).json({ message: 'Booking created successfully', bookingId: bookingData.Book_ID });
  });
});





// Fetch orders for a service provider based on email
app.get('/bookings/sp/:email', async (req, res) => {
  try {
    const orders = await Booking.find({ U_Email: req.params.email });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
});

// Accept a booking by Book_ID
// In your route file
// Import the acceptBooking function from your model
import { acceptBooking } from './models/booking.js';

app.post('/bookings/accept-order/:bookId', async (req, res) => {
  const bookId = req.params.bookId;
  const spEmail = req.body.spEmail; // Ensure spEmail is sent in the request body

  // if (isNaN(bookId)) {
  //   return res.status(400).json({ error: 'Invalid bookId' });
  // }

  // if (!spEmail || typeof spEmail !== 'string') {
  //   return res.status(400).json({ error: 'Invalid or missing spEmail' });
  // }

  try {
    const result = await acceptBooking(bookId, spEmail);
    res.json({ message: 'Booking accepted', result });
  } catch (error) {
    if (error.error === 'Booking not found') {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(500).json({ error: 'Error accepting booking', details: error.message });
  }
});



// Cancel a booking by Book_ID
// In your route file
import { cancelBooking } from './models/booking.js';

app.post('/bookings/cancel-order/:bookId', async (req, res) => {
  const bookId = req.params.bookId;

  // Call the cancelBooking function from the model
  cancelBooking(bookId, (err, result) => {
    if (err) {
      if (err.error === 'Booking not found') {
        return res.status(404).json({ error: 'Booking not found' });
      }
      return res.status(500).json({ error: 'Error canceling booking', message: err.message });
    }

    res.json({ message: 'Booking cancelled', result });
  });
});









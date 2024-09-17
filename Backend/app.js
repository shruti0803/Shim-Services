import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // Load environment variables
import { getAllServiceProviders, addServiceProvider } from './models/serviceProvider.js';
import { getAllCustomers, addCustomer } from './models/customer.js';
import { getAllBookings, addBooking } from './models/booking.js';
import { getAllServices, addService } from './models/service.js'; // Import service functions

// Load environment variables
dotenv.config();

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware to enable CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Allow requests from this origin
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));

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

  // Validate request data here if needed
  if (!newProvider.name || !newProvider.category) {
    return res.status(400).json({ error: 'Missing required fields: name, category' });
  }

  addServiceProvider(newProvider, (err, result) => {
    if (err) {
      console.error('Error adding service provider:', err);
      return res.status(500).json({ error: 'Failed to add service provider' });
    }
    res.status(201).json({ message: 'Service provider added', result });
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

  // Validate request data here if needed
  if (!newCustomer.username || !newCustomer.email) {
    return res.status(400).json({ error: 'Missing required fields: username, email' });
  }

  addCustomer(newCustomer, (err, result) => {
    if (err) {
      console.error('Error adding customer:', err);
      return res.status(500).json({ error: 'Failed to add customer' });
    }
    res.status(201).json({ message: 'Customer added', result });
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

  // Validate request data here if needed
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

  // Validate request data here if needed
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

import express from 'express';
import { getAllServiceProviders, addServiceProvider } from './models/serviceProvider.js';
import { getAllCustomers, addCustomer } from './models/customer.js';
import { getAllBookings, addBooking } from './models/booking.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Service Provider Routes
app.get('/serviceproviders', (req, res) => {
  getAllServiceProviders((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve service providers' });
    }
    res.json(results);
  });
});

app.post('/serviceproviders', (req, res) => {
  const newProvider = req.body;

  addServiceProvider(newProvider, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add service provider' });
    }
    res.status(201).json({ message: 'Service provider added', result });
  });
});

// Customer Routes
app.get('/customers', (req, res) => {
  getAllCustomers((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve customers' });
    }
    res.json(results);
  });
});

app.post('/customers', (req, res) => {
  const newCustomer = req.body;

  addCustomer(newCustomer, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add customer' });
    }
    res.status(201).json({ message: 'Customer added', result });
  });
});

// Booking Routes
app.get('/bookings', (req, res) => {
  getAllBookings((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
    res.json(results);
  });
});

app.post('/bookings', (req, res) => {
  const newBooking = req.body;

  addBooking(newBooking, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add booking' });
    }
    res.status(201).json({ message: 'Booking added', result });
  });
});

// Start the server
app.listen(4002, () => {
  console.log('Server is running on port 4002');
});

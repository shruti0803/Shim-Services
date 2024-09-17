import express from 'express';
import { getAllServiceProviders, addServiceProvider } from './models/serviceProvider.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Get all service providers
app.get('/serviceproviders', (req, res) => {
  getAllServiceProviders((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve service providers' });
    }
    res.json(results);
  });
});

// Add a new service provider
app.post('/serviceproviders', (req, res) => {
  const newProvider = req.body;
  
  addServiceProvider(newProvider, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add service provider' });
    }
    res.status(201).json({ message: 'Service provider added', result });
  });
});

// Start the server
app.listen(4002, () => {
  console.log('Server is running on port 4002');
});

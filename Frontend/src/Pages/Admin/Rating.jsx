import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Grid } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import { Star } from '@mui/icons-material';
const Rating = () => {
  const reviewData = [
    {
      id: 'R001',
      rateId: 'R001',
      rateDate: '2024-11-30',
      customerEmail: 'customer1@example.com',
      serviceName: 'Web Development',
      serviceCategory: 'Development',
      spEmail: 'sp1@example.com',
      rating: 5,
      review: 'Excellent service!',
    },
    {
      id: 'R002',
      rateId: 'R002',
      rateDate: '2024-11-28',
      customerEmail: 'customer2@example.com',
      serviceName: 'SEO Optimization',
      serviceCategory: 'Marketing',
      spEmail: 'sp2@example.com',
      rating: 4,
      review: 'Very good, could be improved.',
    },
    {
      id: 'R003',
      rateId: 'R003',
      rateDate: '2024-11-28',
      customerEmail: 'customer2@example.com',
      serviceName: 'Appliance Repair',
      serviceCategory: 'Marketing',
      spEmail: 'sp2@example.com',
      rating: 4,
      review: 'Very good, could be improved.',
    },
    {
      id: 'R004',
      rateId: 'R004',
      rateDate: '2024-11-28',
      customerEmail: 'customer2@example.com',
      serviceName: 'Beauty Service',
      serviceCategory: 'Marketing',
      spEmail: 'sp2@example.com',
      rating: 4,
      review: 'Very good, could be improved.',
    },
    {
      id: 'R005',
      rateId: 'R005',
      rateDate: '2024-11-28',
      customerEmail: 'customer2@example.com',
      serviceName: 'Beauty Service',
      serviceCategory: 'Marketing',
      spEmail: 'sp2@example.com',
      rating: 4,
      review: 'Very good, could be improved.',
    },
    // Add more review data as needed
  ];

  const reviewCount = reviewData.length;
  const starRatings = [5, 4, 3, 2, 1];
  const starCounts = starRatings.map((star) =>
    reviewData.filter((review) => review.rating === star).length
  );

  // Calculate the average rating
  const averageRating = (
    reviewData.reduce((sum, review) => sum + review.rating, 0) / reviewCount
  ).toFixed(1);

  const reviewAnalyticsData = {
    labels: starRatings.map((star) => `${star} Star`),
    datasets: [
      {
        label: 'Number of Reviews',
        data: starCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const services = Array.from(new Set(reviewData.map((review) => review.serviceName)));
  const serviceCounts = services.map(
    (service) =>
      reviewData.filter((review) => review.serviceName === service).length
  );

  const servicesChartData = {
    labels: services,
    datasets: [
      {
        label: 'Number of Reviews by Service',
        data: serviceCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box p={3}>
      {/* Review Analytics */}
      {/* <Typography variant="h5" gutterBottom>
        Review Analytics
      </Typography> */}
      <div className='flex flex-row '>
        
        <div className='w-1/2 flex flex-row bg-yellow-500 text-black p-6 rounded-lg shadow-lg'>
          <div>
          <Typography variant="h6" gutterBottom>
          <span className='font-extrabold text-6xl text-green-800'>{averageRating}
          <Star style={{ color: 'green',fontSize: '3rem' }} /></span> 
        </Typography>
        <Typography variant="h6" gutterBottom>
          <strong>Total Reviews</strong> 
          <div>{reviewCount}</div>
        </Typography>
        
        </div>
        <div className='ml-14 w-1/2'>
        {/* <Typography variant="h6" gutterBottom>
          {/* <strong>Rating Breakdown:</strong> */}
        {/* </Typography> */} 
        <div style={{ width: '100%', marginTop: '10px' }}>
          <Bar
            data={reviewAnalyticsData}
            options={{
              responsive: true,
              indexAxis: 'y', 
              // Vertical orientation for the bar chart
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    display: false, // Hide numbers on the x-axis
                  },
                },
                y: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    display: true, // Display star ratings on the y-axis
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: true,
                },
              },
            }}
            height={200} // Adjust height for a smaller bar graph
          />
        </div>
        </div>

        
        
      </div>

      {/* Reviews by Service Chart */}
      <div className='mx-5 w-1/2 items-end'>
  <Typography variant="h5" gutterBottom>
    Review Statistics
  </Typography>
  <div style={{ width: '100%' }}>
    <Bar
      data={servicesChartData}
      options={{
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false, // Hide the grid lines on the x-axis
            },
            ticks: {
              display: false, // Hide the numbers on the x-axis
            },
            barPercentage: 0.5, // Adjust this to change the width of the bars
            categoryPercentage: 0.5, // Adjust this to control the space between bars
          },
          y: {
            grid: {
              display: false, // Hide the grid lines on the y-axis
            },
            ticks: {
              display: false, // Hide the numbers on the y-axis
            },
          },
        },
        plugins: {
          legend: {
            display: false, // Optionally hide the legend
          },
          tooltip: {
            enabled: true, // Enable tooltips
          },
        },
      }}
      height={100} // Set the height of the bar chart
    />
  </div>
</div>

      </div>

      {/* Reviews Table */}
      <Typography variant="h5" gutterBottom mt={3}>
        Customer Reviews
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={reviewData}
          columns={[
            { field: 'rateId', headerName: 'Rate ID', width: 150 },
            { field: 'rateDate', headerName: 'Rate Date', width: 180 },
            { field: 'customerEmail', headerName: 'Customer Email', width: 180 },
            { field: 'serviceName', headerName: 'Service Name', width: 180 },
            { field: 'serviceCategory', headerName: 'Service Category', width: 180 },
            { field: 'spEmail', headerName: 'SP Email', width: 180 },
            { field: 'rating', headerName: 'Rating', width: 100 },
            { field: 'review', headerName: 'Review', width: 300 },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 15]}
          getRowId={(row) => row.id}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#3f51b5',
              color: 'black',
              fontWeight: 'bold',
      fontSize: '16px',
            },
            '& .MuiDataGrid-cell:hover': {
              backgroundColor: '#e3f2fd',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#e0e0e0',
            },
          }}
        />
      </div>
    </Box>
  );
};

export default Rating;

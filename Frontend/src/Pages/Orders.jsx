import React, { useState, useEffect } from 'react';
import Order from '../Components/Order';
import { useAuth } from '../context/AuthContext';

function Orders() {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useAuth(); // Get the current user from Auth context

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        console.error('No user is logged in.');
        return;
      }

      try {
        // Fetch all bookings without filtering by username
        const response = await fetch('http://localhost:4002/bookings');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        console.log("Current User: ",currentUser);
        console.log("Fetched data",data);
        
        
        // Filter bookings based on the current user's username
        const filteredOrders = data.filter(order => order.C_username === currentUser.C_username);

        console.log("fetched",filteredOrders);
        

        // Map database statuses to display statuses
        const statusMap = {
          'Pending': 'In Progress',
          'Confirmed': 'Scheduled',
          'Completed': 'Completed'
        };

        const mappedOrders = filteredOrders.map(order => ({
          ...order,
          status: statusMap[order.Book_Status] || order.Book_Status, // Update status mapping
        }));

        // Sort orders by status
        const sortedOrders = mappedOrders.sort((a, b) => {
          const statusOrder = { 'In Progress': 1, 'Scheduled': 2, 'Completed': 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        });

        setOrders(sortedOrders);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [currentUser]); // Re-run the effect when currentUser changes

  const handleCancel = (id) => {
    setOrders(prevOrders => prevOrders.filter(order => order.Book_ID !== id));
    alert(`Order ${id} has been canceled.`);
  };

  const handleGetHelp = (id) => {
    alert(`Help has been requested for Order ${id}.`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-6">My Orders</h1>
      
      {/* Sections for In Progress, Scheduled, Completed */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">In Progress</h2>
        {orders.filter(order => order.status === 'In Progress').length > 0 ? (
          orders
            .filter(order => order.status === 'In Progress')
            .map(order => (
              <Order key={order.Book_ID} order={order} onCancel={handleCancel} onHelp={handleGetHelp} />
            ))
        ) : (
          <p>No orders in progress.</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Scheduled</h2>
        {orders.filter(order => order.status === 'Scheduled').length > 0 ? (
          orders
            .filter(order => order.status === 'Scheduled')
            .map(order => (
              <Order key={order.Book_ID} order={order} onCancel={handleCancel} onHelp={handleGetHelp} />
            ))
        ) : (
          <p>No scheduled orders.</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Completed</h2>
        {orders.filter(order => order.status === 'Completed').length > 0 ? (
          orders
            .filter(order => order.status === 'Completed')
            .map(order => (
              <Order key={order.Book_ID} order={order} onCancel={handleCancel} onHelp={handleGetHelp} />
            ))
        ) : (
          <p>No completed orders.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;

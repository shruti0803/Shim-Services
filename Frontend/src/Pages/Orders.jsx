import React, { useState, useEffect } from 'react';
import Order from '../Components/Order';
import { useAuth } from '../context/AuthContext';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [bills, setBills] = useState({});
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

        console.log("Current User: ", currentUser);
        console.log("Fetched data", data);

        // Filter bookings based on the current user's email (ensure case sensitivity is correct)
        const filteredOrders = data.filter(order => order.U_Email === currentUser.U_Email);

        console.log("Filtered orders", filteredOrders);

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

        // Fetch bills for scheduled orders
        await fetchBills(sortedOrders);

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [currentUser]); // Re-run the effect when currentUser changes

  const fetchBills = async (orders) => {
    let billData = {};
  
    for (const order of orders) {
      if (order.status === 'Scheduled') {
        try {
          const billResponse = await fetch(`http://localhost:4002/bills/${order.Book_ID}`);
          
          if (billResponse.ok) {
            const bill = await billResponse.json();
            billData[order.Book_ID] = bill;
          } else if (billResponse.status === 404) {
            // No bill found for this order; skip adding anything to billData
            console.warn(`Bill not found for Book_ID: ${order.Book_ID}`);
          } else {
            console.error(`Failed to fetch bill for Book_ID ${order.Book_ID}: Status ${billResponse.status}`);
          }
        } catch (error) {
          console.error(`Error fetching bill for Book_ID ${order.Book_ID}:`, error);
        }
      }
    }
  
    setBills(billData);
  };
  

  const handleCancel = (id) => {
    setOrders(prevOrders => prevOrders.filter(order => order.Book_ID !== id));
    alert(`Order ${id} has been canceled.`);
  };

  const handleGetHelp = (id) => {
    alert(`Help has been requested for Order ${id}.`);
  };

  const handlePayNow = (orderId) => {
    const bill = bills[orderId];
    if (bill && bill.paymentMethod === 'Online') {
      // Implement the payment process, such as redirecting to a payment gateway
      alert(`Redirecting to payment gateway for order ${orderId}`);
    } else {
      alert(`No online payment available for order ${orderId}`);
    }
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
        <div key={order.Book_ID}>
          <Order order={order} onCancel={handleCancel} onHelp={handleGetHelp} />

          {/* Log bill details to check their values */}
          {console.log("Bill for Order ID:", order.Book_ID, bills[order.Book_ID])}
          {console.log("Bill Mode for Order ID:", order.Book_ID, bills[order.Book_ID]?.Bill_Mode)}

          {/* Access the bill for the current order using order.Book_ID */}
          {bills[order.Book_ID] && bills[order.Book_ID].Bill_Mode === 'online' && (
            <button
              className="bg-blue-500 text-white p-2 rounded mt-4"
              onClick={() => handlePayNow(order.Book_ID)}
            >
              Pay Now
            </button>
          )}
        </div>
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

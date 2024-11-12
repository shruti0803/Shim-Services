import React, { useState, useEffect } from 'react';
import Order from '../Components/Order';
import { useAuth } from '../context/AuthContext';
import { FaTasks, FaCalendarCheck, FaCheckCircle } from 'react-icons/fa';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [bills, setBills] = useState({});
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        console.error('No user is logged in.');
        return;
      }

      try {
        const response = await fetch('http://localhost:4002/bookings');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const filteredOrders = data.filter(order => order.U_Email === currentUser.U_Email);

        const statusMap = {
          'Pending': 'In Progress',
          'Confirmed': 'Scheduled',
          'Completed': 'Completed'
        };

        const mappedOrders = filteredOrders.map(order => ({
          ...order,
          status: statusMap[order.Book_Status] || order.Book_Status,
        }));

        const sortedOrders = mappedOrders.sort((a, b) => {
          const statusOrder = { 'In Progress': 1, 'Scheduled': 2, 'Completed': 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        });

        setOrders(sortedOrders);
        await fetchBills(sortedOrders);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [currentUser]);

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
    if (bill && bill.Bill_Mode === 'online') {
      alert(`Redirecting to payment gateway for order ${orderId}`);
    } else {
      alert(`No online payment available for order ${orderId}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl text-center font-bold mb-8">My Orders</h1>

      <div className="mb-10">
        <h2 className="text-3xl font-semibold mb-6 flex items-center">
          <FaTasks className="mr-2 text-blue-600" /> In Progress
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.filter(order => order.status === 'In Progress').length > 0 ? (
            orders
              .filter(order => order.status === 'In Progress')
              .map(order => (
                <div
                  key={order.Book_ID}
                  className="p-4 border rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <Order order={order} onCancel={handleCancel} onHelp={handleGetHelp} />
                </div>
              ))
          ) : (
            <p>No orders in progress.</p>
          )}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-3xl font-semibold mb-6 flex items-center">
          <FaCalendarCheck className="mr-2 text-green-600" /> Scheduled
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.filter(order => order.status === 'Scheduled').length > 0 ? (
            orders
              .filter(order => order.status === 'Scheduled')
              .map(order => (
                <div
                  key={order.Book_ID}
                  className="p-4 border rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <Order
                    order={order}
                    onCancel={handleCancel}
                    onHelp={handleGetHelp}
                    onPayNow={handlePayNow}
                    payNow={bills[order.Book_ID]?.Bill_Mode === 'online'}
                  />
                </div>
              ))
          ) : (
            <p>No scheduled orders.</p>
          )}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-3xl font-semibold mb-6 flex items-center">
          <FaCheckCircle className="mr-2 text-gray-700" /> Completed
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.filter(order => order.status === 'Completed').length > 0 ? (
            orders
              .filter(order => order.status === 'Completed')
              .map(order => (
                <div
                  key={order.Book_ID}
                  className="p-4 border rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <Order order={order} onCancel={handleCancel} onHelp={handleGetHelp} />
                </div>
              ))
          ) : (
            <p>No completed orders.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;

import React, { useState, useEffect } from 'react';
import Order from '../Components/Order';
import { useAuth } from '../context/AuthContext';
import { FaTasks, FaCalendarCheck, FaCheckCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [bills, setBills] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useAuth();

  const location = useLocation();
  const { selectedStatus } = location.state || {};

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
        console.log("Filtered",data);
        

        const statusMap = {
          'Pending': 'Pending',
          'Confirmed': 'Scheduled',
          'Completed': 'Completed'
        };

        const mappedOrders = filteredOrders.map(order => ({
          ...order,
          status: statusMap[order.Book_Status] || order.Book_Status,
        }));

        setOrders(mappedOrders);
        await fetchBills(mappedOrders);
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

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl text-center font-bold mb-8">{selectedStatus} Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.filter(order => order.status === selectedStatus).length > 0 ? (
          selectedStatus === 'Scheduled' ? (
            orders
              .filter(order => order.status === 'Scheduled')
              .sort((a, b) => {
                const hasOnlinePaymentA = bills[a.Book_ID]?.Bill_Mode === 'online' ? 0 : 1;
                const hasOnlinePaymentB = bills[b.Book_ID]?.Bill_Mode === 'online' ? 0 : 1;
                return hasOnlinePaymentA - hasOnlinePaymentB;
              })
              .map(order => (
                <Order
                  key={order.Book_ID}
                  order={order}
                  onCancel={handleCancel}
                  onHelp={handleGetHelp}
                  onPayNow={handlePayNow}
                  payNow={bills[order.Book_ID]?.Bill_Mode === 'online'}
                />
              ))
          ) : (
            orders
              .filter(order => order.status === selectedStatus)
              .map(order => (
                <Order
                  key={order.Book_ID}
                  order={order}
                  onCancel={handleCancel}
                  onHelp={handleGetHelp}
                  onPayNow={handlePayNow}
                  payNow={bills[order.Book_ID]?.Bill_Mode === 'online'}
                />
              ))
          )
        ) : (
          <p>No orders in this category.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;

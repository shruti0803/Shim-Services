import React, { useState, useEffect } from 'react';
import Order from '../Components/Order';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/db/orders.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const filteredOrders = data.filter(order => order.username === 'raj_kumar');
        const sortedOrders = filteredOrders.sort((a, b) => {
          const statusOrder = { 'In Progress': 1, 'Scheduled': 2, 'Completed': 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
        setOrders(sortedOrders);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  const handleCancel = (id) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    alert(`Order ${id} has been canceled.`);
  };

  const handleGetHelp = (id) => {
    alert(`Help has been requested for Order ${id}.`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-6"> My Orders</h1>
      
      {/* Sections for In Progress, Scheduled, Completed */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">In Progress</h2>
        {orders.filter(order => order.status === 'In Progress').length > 0 ? (
          orders
            .filter(order => order.status === 'In Progress')
            .map(order => (
              <Order key={order.id} order={order} onCancel={handleCancel} onHelp={handleGetHelp} />
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
              <Order key={order.id} order={order} onCancel={handleCancel} onHelp={handleGetHelp} />
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
              <Order key={order.id} order={order} onCancel={handleCancel} onHelp={handleGetHelp} />
            ))
        ) : (
          <p>No completed orders.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;

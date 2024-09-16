import React, { useState } from 'react';
import { FaStar, FaPencilAlt } from 'react-icons/fa'; // For star and pencil icons
import { FiUser } from 'react-icons/fi'; // For avatar icon

const ProfilePage = () => {
  const [ongoingOrders, setOngoingOrders] = useState([
    {
      id: 1,
      title: 'Order 1',
      customerName: 'Alice Smith',
      service: 'Plumbing',
      location: 'Downtown City',
      time: '10:00 AM',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Order 2',
      customerName: 'Bob Johnson',
      service: 'Cleaning',
      location: 'Uptown City',
      time: '02:00 PM',
      status: 'pending',
    },
  ]);

  const [pastOrders] = useState([
    {
      id: 1,
      title: 'Order A',
      customerName: 'Sarah Lee',
      service: 'Electrician',
      location: 'Westside City',
      time: '11:00 AM',
      date: '2024-09-15',
    },
    {
      id: 2,
      title: 'Order B',
      customerName: 'David Miller',
      service: 'Gardening',
      location: 'Eastside City',
      time: '03:00 PM',
      date: '2024-09-10',
    },
  ]);

  const [username, setUsername] = useState('John Doe');
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(4);
  const [profession, setProfession] = useState('Plumber'); // Plumber or Electrician

  const handleOrderAction = (id, action) => {
    setOngoingOrders(orders =>
      orders.map(order =>
        order.id === id ? { ...order, status: action === 'accept' ? 'accepted' : 'declined' } : order
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen font-sans">
      {/* Left section for personal details */}
      <div className="w-full md:w-1/4 p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Personal Details</h2>

        {/* Profile Picture Avatar */}
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
            <FiUser className="text-4xl text-white" />
          </div>
          <div className="ml-4">
            <div className="flex items-center">
              {/* Editable Username */}
              {isEditing ? (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : (
                <p className="text-xl font-semibold text-gray-900">{username}</p>
              )}
              <FaPencilAlt
                onClick={() => setIsEditing(!isEditing)}
                className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
              />
            </div>
            <p className="text-sm text-gray-500">Username</p>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => setRating(index + 1)}
              />
            ))}
          </div>
        </div>

        {/* Profession (Plumber/Electrician) */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Profession</label>
          <p className="text-lg text-gray-900">{profession}</p>
        </div>

        {/* Email, Phone, Location */}
        <div className="mt-4">
          <p className="text-sm"><strong>Email:</strong> john.doe@example.com</p>
          <p className="text-sm"><strong>Phone:</strong> +1234567890</p>
          <p className="text-sm"><strong>Location:</strong> City, Country</p>
        </div>
      </div>

      {/* Right section for orders */}
      <div className="w-full md:w-3/4 p-6">
        {/* Ongoing Orders */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ongoing Orders</h2>
          {ongoingOrders.map(order => (
            <div
              key={order.id}
              className={`p-4 mb-4 border rounded-lg transition-all duration-300 ${
                order.status === 'accepted' ? 'bg-green-100 border-green-500' : 'bg-white'
              }`}
            >
              <p className="text-lg font-medium text-gray-700"><strong>Service:</strong> {order.service}</p>
              <p className="text-md text-gray-600"><strong>Customer Name:</strong> {order.customerName}</p>
              <p className="text-md text-gray-600"><strong>Location:</strong> {order.location}</p>
              <p className="text-md text-gray-600"><strong>Time:</strong> {order.time}</p>
              <p className="text-md text-gray-600"><strong>Status:</strong> {order.status}</p>
              {order.status === 'pending' && (
                <div className="mt-2">
                  <button
                    onClick={() => handleOrderAction(order.id, 'accept')}
                    className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleOrderAction(order.id, 'decline')}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Past Orders */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Past Orders</h2>
          {pastOrders.map(order => (
            <div key={order.id} className="p-4 mb-4 border rounded-lg bg-gray-50 hover:shadow-md transition-all duration-300">
              <p className="text-lg font-medium text-gray-700"><strong>Service:</strong> {order.service}</p>
              <p className="text-md text-gray-600"><strong>Customer Name:</strong> {order.customerName}</p>
              <p className="text-md text-gray-600"><strong>Location:</strong> {order.location}</p>
              <p className="text-md text-gray-600"><strong>Time:</strong> {order.time}</p>
              <p className="text-md text-gray-600"><strong>Date:</strong> {order.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

import React, { useState, useEffect, useRef } from 'react'; 
import axios from 'axios';
import PaymentBySP from './PaymentBySP'; // Import the new component

const SalaryOfSP = ({ SP_Email }) => {
  const [cashTotalCost, setCashTotalCost] = useState(null);
  const [onlineTotalCost, setOnlineTotalCost] = useState(null);
  const [error, setError] = useState('');
  const [cashPaid, setCashPaid] = useState(false); // Track if cash has been paid
  const [showPaymentComponent, setShowPaymentComponent] = useState(false); 
  // State to toggle PaymentBySP visibility

  // const [showPayment, setShowPayment] = useState(false);
  const prevCashTotalCostRef = useRef();
  const prevOnlineTotalCostRef = useRef();

  useEffect(() => {
    const fetchTotalCosts = async () => {
      try {
        const cashResponse = await axios.get('http://localhost:4002/fetchTotalCostForSP', {
          params: {
            SP_Email: SP_Email,
            Bill_Mode: 'cash'
          }
        });

        const onlineResponse = await axios.get('http://localhost:4002/fetchTotalCostForSP', {
          params: {
            SP_Email: SP_Email,
            Bill_Mode: 'online'
          }
        });

        console.log("Cash Salary Response", cashResponse);
        console.log("Online Salary Response", onlineResponse);

        const cashFetchedTotalCost = cashResponse.data.TotalCost;
        const onlineFetchedTotalCost = onlineResponse.data.TotalCost;

        setCashTotalCost(cashFetchedTotalCost);
        setOnlineTotalCost(onlineFetchedTotalCost);

        prevCashTotalCostRef.current = cashFetchedTotalCost;
        prevOnlineTotalCostRef.current = onlineFetchedTotalCost;

      } catch (error) {
        console.error("Error fetching total costs:", error);
        setError("Error fetching total costs");
      }
    };

    fetchTotalCosts();
  }, [SP_Email]);

  // Success handler for PaymentBySP component
  const handlePaymentSuccess = () => {
    setCashPaid(true);
    setError('Cash payment has been processed successfully');
    setShowPaymentComponent(false); // Hide PaymentBySP after successful payment
  };

  // Error handler for PaymentBySP component
  const handlePaymentError = () => {
    setError('Error processing cash payment');
    setShowPaymentComponent(false); // Hide PaymentBySP if payment fails
  };

  const handlePayNow = () => {
    setShowPaymentComponent(true); // Show PaymentBySP component when Pay Now is clicked
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-md">
      <h3 className="text-lg font-semibold flex items-center space-x-2">
        <i className="fas fa-money-bill text-green-500"></i>
        <span>Salary Information</span>
      </h3>

      <p className="font-semibold mt-2">SP Salary (Online): ₹{onlineTotalCost !== null ? onlineTotalCost : 'Loading...'}</p>
      <p className="font-semibold mt-2">Amount you have to pay (Cash): ₹{cashTotalCost !== null ? cashTotalCost : 'Loading...'}</p>

      {cashPaid && <p className="text-green-500 mt-2">Cash payment has been processed successfully.</p>}

      {/* Show the PaymentBySP component when Pay Now is clicked */}
      {/* Render PaymentBySP when the button is clicked */}
      {showPaymentComponent && (
            <PaymentBySP
              
              amount={cashTotalCost}
              
            />
          )}
      {/* Display Pay Now button for cash payment */}
      {!cashPaid && cashTotalCost !== null && !showPaymentComponent && (
        <>
          <button
            onClick={handlePayNow}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Pay Now
          </button>

          
        </>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SalaryOfSP;

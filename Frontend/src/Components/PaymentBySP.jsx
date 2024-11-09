import axios from 'axios';
import React, { useState } from 'react';

function PaymentBySP({ amount, onClose, onPaymentSuccess }) {
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = (amount) => {
    const data = JSON.stringify({ amount: amount * 100, currency: "INR" });
    const config = {
      method: "post",
      url: "http://localhost:4002/orders",
      headers: { 'Content-type': 'application/json' },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log("Order created:", response.data);
        handleRazorPayScreen(response.data.amount);
      })
      .catch((error) => {
        console.error("Error at create order:", error);
      });
  };

  const handleRazorPayScreen = async (amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert('Failed to load Razorpay SDK');
      return;
    }

    const options = {
      key: "rzp_test_iDWZYaECE3rES2",
      amount: amount,
      currency: "INR",
      name: "ShimServices",
      description: "Payment to ShimServices",
      handler: function(response) {
        setResponseId(response.razorpay_payment_id);
        onClose(); // Close the modal on successful payment
        onPaymentSuccess(response.razorpay_payment_id); // Call parent callback with payment ID
      },
      prefill: {
        name: "Shim Services",
        email: "shimservices5@gmail.com"
      },
      theme: {
        color: "#F4C430"
      },
      method: {
        netbanking: true,
        card: true,
        upi: true,
        wallet: true,
        paylater: true
      },
      image: "/img"
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const paymentFetch = (e) => {
    e.preventDefault();
    const paymentId = e.target.paymentId.value;

    axios.get(`http://localhost:4002/payment/${paymentId}`)
      .then((response) => {
        console.log("Payment data fetched:", response.data);
        setResponseState(response.data);
      })
      .catch((error) => {
        console.error("Error fetching payment:", error);
      });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "500px",
          position: "relative",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
      >
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          X
        </button>
        <h1>Payment Details</h1>
        <button className='bg-blue-600 text-white p-2 rounded-md' onClick={() => createRazorpayOrder(amount)}>Pay {amount} INR</button>
        {/* {responseId && <p>Payment ID: {responseId}</p>}
        <h2>Payment Verification Form</h2>
        <form onSubmit={paymentFetch}>
          <input type="text" name="paymentId" placeholder="Enter Payment ID" />
          <button type="submit">Fetch Payment</button>
          {responseState.length !== 0 && (
            <ul>
              <li>Amount: {responseState.amount / 100} INR</li>
              <li>Currency: {responseState.currency}</li>
              <li>Status: {responseState.status}</li>
              <li>Method: {responseState.method}</li>
            </ul>
          )} */}
        {/* </form> */}
      </div>
    </div>
  );
}

export default PaymentBySP;

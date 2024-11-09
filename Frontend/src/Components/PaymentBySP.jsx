import axios from 'axios';
import React, { useState } from 'react';

function PaymentBySP({ amount, setAmountToZero }) {
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
      key: "rzp_test_iDWZYaECE3rES2",  // Replace with your Razorpay key
      amount: amount,
      currency: "INR",
      name: "ShimServices",
      description: "Payment to ShimServices",
      handler: function(response) {
        setResponseId(response.razorpay_payment_id);
        setAmountToZero();  // Set the amount to 0 on successful payment
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
    <div>
      <button onClick={() => createRazorpayOrder(amount)}>Pay {amount} INR</button>
      {responseId && <p>Payment ID: {responseId}</p>}
      <h1>Payment Verification Form</h1>
      <form onSubmit={paymentFetch}>
        <input type="text" name="paymentId" />
        <button type="submit">Fetch Payment</button>
        {responseState.length !== 0 && (
          <ul>
            <li>{responseState.amount / 100}</li>
            <li>{responseState.currency}</li>
            <li>{responseState.status}</li>
            <li>{responseState.method}</li>
          </ul>
        )}
      </form>
    </div>
  );
}

export default PaymentBySP;

import axios from "axios";
import { useEffect, useState } from "react";

import Layout from "@/components/Layout";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    axios.get("/api/orders").then((result) => {
      setOrders(result.data);
    });
  }

  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic text-sm">
        <thead>
          <tr>
            <td>Date</td>
            <td>Paid</td>
            <td>Recipient</td>
            <td>Products</td>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>
                {
                  order.paid ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-green-600">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-600">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  )
                }
              </td>
              <td>
                <ul>
                  <li><strong>{order.userName}</strong>, {order.userEmail}</li>
                  <li>{order.userCity}, {order.userCountry}</li>
                  <li>{order.userStreetAddress}</li>
                  <li><strong>PC</strong> - {order.userPostalCode}</li>
                </ul>
              </td>
              <td>
                <ul>
                  {order.line_items && order.line_items.map((product, index) => (
                    <li key={product.price_data.product_data.name + index}>{product.price_data.product_data.name} x{product.quantity}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
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
      <table className="basic table-auto text-sm">
        <thead>
          <tr>
            <td>Date</td>
            <td>Recipient</td>
            <td>Products</td>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
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
                  {order.line_items && order.line_items.map((product) => (
                    <li>{product.price_data.product_data.name} x{product.quantity}</li>
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
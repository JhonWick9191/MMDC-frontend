import { useEffect, useState } from "react";
import SideBadr from "./SideBarUserProfile";
const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;

export default function BuyProduct() {
  const [orders, setOrders] = useState([]);

  //  Fetch orders when component mounts
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(`${BASE_URL}/orderDetials`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // important for cookies
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, []);

  
  return (
    <div className="p-4">

        <div>
            <SideBadr />
        </div>
      <h1 className="text-xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 mb-4 rounded-lg shadow-sm bg-gray-50"
          >
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{order.totalAmount}
            </p>
            <p>
              <strong>Status:</strong> {order.paymentStatus}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="mt-3">
              <h3 className="font-semibold">Products:</h3>

              {order.products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-3 mt-2 border-b pb-2"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p>Model: {product.model}</p>
                    <p>Price: ₹{product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>

                  <div className="btn">
                    <button>Delete product </button>
                    </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

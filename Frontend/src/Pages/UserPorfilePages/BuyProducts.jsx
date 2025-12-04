import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;

export default function BuyProduct() {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  async function fetchOrders() {
    try {
      const response = await fetch(`${BASE_URL}/orderDetials`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  // Delete product from order handler
  async function deleteProduct(orderId, productId) {
    try {
      const response = await fetch(`${BASE_URL}/deleteProduct`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ orderId, productId }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Product deleted from order");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? data.order : order
          )
        );
      } else {
        alert(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting product");
    }
  }

  // Filter out orders where there are zero products
  const displayedOrders = orders.filter(
    (order) => order.products && order.products.length > 0
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      {displayedOrders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        displayedOrders.map((order) => (
          <div
            key={order._id}
            className=" p-4 mb-4 rounded-lg shadow-sm bg-gray-50"
          >
            <div className="main-wrapper-for-user-order-products">
              {order.products.map((product, index) => (
                <div key={index} className="products-lists-for-user-profile">
                  <div className="images-for-products-under-profile">
                    <img
                      src={product.product_image}
                      alt={product.Product_Name || "Product Image"}
                    />
                  </div>
                  <div className="price-content-user-profile">
                    <p className="font-medium">{product.Product_Name}</p>
                    <p>Model: {product.model_number || "N/A"}</p>
                    <p>Price: ₹{product.Product_price}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                  <div className="btn width-100">
                    <button
                      onClick={() => deleteProduct(order._id, product._id)}
                    >
                      Delete product
                    </button>
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

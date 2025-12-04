import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;

export default function BuyProduct() {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  async function fetchOrders() {
    try {
      const response = await fetch(`${BASE_URL}/allOrderProducts`, {
        method: "GET",
        headers: { "Content-Type": "application/json",
          
         },
        credentials: "include",
      });

      const data = await response.json();
      console.log(data)
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
//   async function deleteProduct(orderId, productId) {
//     try {
//       const response = await fetch(`${BASE_URL}/deleteProduct`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ orderId, productId }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         alert("Product deleted from order");
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderId ? data.order : order
//           )
//         );
//       } else {
//         alert(data.message || "Failed to delete product");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error deleting product");
//     }
//   }

  // Group orders by user email
  const groupedOrders = orders.reduce((acc, order) => {
    const email = order.userEmail || "Unknown User";
    if (!acc[email]) acc[email] = [];
    acc[email].push(order);
    return acc;
  }, {});

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Orders (Grouped by User)</h1>

      {Object.keys(groupedOrders).length === 0 ? (
        <p>No orders found</p>
      ) : (
        Object.entries(groupedOrders).map(([email, userOrders]) => (
          <div
            key={email}
            className="border mb-6 p-4 rounded-lg bg-white shadow-md"
          >
            <h2 className="text-lg font-semibold mb-3 text-blue-600">
              📧 {email}
            </h2>

            {userOrders.map((order) => (
              <div
                key={order._id}
                className="border p-3 mb-4 rounded-md bg-gray-50"
              >
                <div className="main-wrapper-for-user-order-products">
                  {order.products.map((product, index) => (
                    <div
                      key={index}
                      className="products-lists-for-user-profile flex items-center gap-4 mb-2"
                    >
                      <div className="images-for-products-under-profile w-24 h-24 overflow-hidden rounded-md">
                        <img
                          src={product.product_image}
                          alt={product.Product_Name || "Product Image"}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <div className="price-content-user-profile flex-1">
                        <p className="font-medium">{product.Product_Name}</p>
                        <p>Model: {product.model_number || "N/A"}</p>
                        <p>Price: ₹{product.Product_price}</p>
                        <p>Quantity: {product.quantity}</p>
                      </div>

                      {/* <div className="btn">
                        <button
                          onClick={() => deleteProduct(order._id, product._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete Product
                        </button>
                      </div> */}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

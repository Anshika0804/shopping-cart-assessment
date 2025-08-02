import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch('http://localhost:8080/carts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch cart');
        }

        const data = await res.json();
        setCart(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) return <p className="p-6 text-lg">Loading cart...</p>;
  if (error) return <p className="p-6 text-red-500 text-lg">Error: {error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaShoppingCart className="text-blue-500" /> Your Cart
      </h2>

      {(!cart || cart.Items?.length === 0) ? (
        <div className="flex flex-col items-center justify-center p-10 border rounded-lg bg-gray-50 text-gray-500 shadow-inner">
          <FaShoppingCart className="text-5xl mb-3" />
          <p className="text-lg">Your cart is empty</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.Items.map((item) => (
            <div
              key={item.ID}
              className="border rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {item.Name}
                  </p>
                  <p className="text-gray-500">{item.Description}</p>
                </div>
                <p className="text-green-600 text-lg font-bold">
                  ₹ {item.Price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {/* Checkout Button */}
          <div className="text-right mt-6">
            <a
              href="/checkout"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-lg shadow"
            >
              Proceed to Checkout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

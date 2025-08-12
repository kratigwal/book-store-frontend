import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
      setCart(res.data.data);
      const totalAmount = res.data.data.reduce((sum, item) => sum + item.price, 0);
      setTotal(totalAmount);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/remove-from-cart/${bookid}`,
        {},
        { headers }
      );
      alert(response.data.message);
      fetchCart();
    } catch (err) {
      alert("Failed to delete item");
    }
  };

  const PlaceOrder = async () => {
    try {
      const response = await axios.post("http://localhost:1000/api/v1/place-order", { order: Cart }, { headers });
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-zinc-900 px-12 h-screen py-8 overflow-auto'>
      {!Cart && <div className='w-full h-full flex items-center justify-center'><Loader /></div>}

      {Cart && Cart.length === 0 && (
        <div className='h-screen flex items-center justify-center flex-col'>
          <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>Empty Cart</h1>
        </div>
      )}

      {Cart && Cart.length > 0 && (
        <>
          <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>Your Cart</h1>
          {Cart.map((items, i) => (
            <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={i}>
              <div className='flex w-full md:w-auto'>
                <img
                  src={
                    items.url?.startsWith("http") ? items.url : `http://localhost:1000${items.url}`
                  }
                  alt={items.title}
                  className='w-24 h-32 object-cover rounded mr-4'
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/100x150?text=No+Image";
                  }}
                />

                <div>
                  <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>{items.title}</h1>
                  <p className='text-normal text-zinc-300 mt-2'>{items.desc.slice(0, 100)}...</p>
                </div>
              </div>

              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-zinc-100 text-3xl font-semibold'>Rs.{items.price}</h2>
                <button
                  className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'
                  onClick={() => deleteItem(items._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {Cart && Cart.length > 0 && (
        <div className='mt-4 w-full flex items-center justify-end'>
          <div className='p-4 bg-zinc-800 rounded'>
            <h1 className='text-3xl text-zinc-200 font-semibold'>Total Amount</h1>
            <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
              <h2>{Cart.length} books</h2>
              <h2>Rs. {total}</h2>
            </div>
            <div className='w-full mt-3'>
              <button
                className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200'
                onClick={PlaceOrder}
              >
                Place your order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;





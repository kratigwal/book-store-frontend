import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import {Link , useNavigate, useParams} from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import UpdateBook from '../../pages/UpdateBook';

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`https://book-store-backend-2m9y.onrender.com/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch book data', error);
        setLoading(false);
      }
    };
    fetch();
  }, [id]);
   const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  };
  const handleFavourite = async ()=>{
    const response = await axios.put("https://book-store-backend-2m9y.onrender.com/api/v1/add-book-to-favourite",{},{headers});
    alert(response.data.message);
  }
  const handleCart = async ()=>{
    const response = await axios.put("https://book-store-backend-2m9y.onrender.com/api/v1/add-to-cart",{},{headers});
    alert(response.data.message);
  };

  const removeFromCart = async (bookid) => {
  try {
    const response = await axios.put(
      `https://book-store-backend-2m9y.onrender.com/api/v1/remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    alert(response.data.message); // ✅ This shows "Book removed from cart"
    fetchCart(); // re-fetch updated cart items
  } catch (error) {
    alert("Failed to remove book from cart");
  }
};


  const deleteBook = async () =>{
    const response = await axios.delete(
      "https://book-store-backend-2m9y.onrender.com/api/v1/delete-book",
      {headers}
    );
    alert(response.data.message);
    navigate("/all-books");
  };
  if (loading || !data) {
    return (
      <div className='h-screen bg-zinc-900 flex items-center justify-center my-8'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8'>
      {/* Left Side: Image and Buttons */}
      <div className='w-full lg:w-3/6'>
        <div className='flex flex-col lg:flex-row justify-around bg-zinc-800 p-6 sm:p-10 lg:p-12 rounded'>
          {/* Book Image */}
          <img
            src={data.url}
            alt='Book'
            className='w-full max-w-[400px] h-auto rounded object-cover'
          />

          {/* Buttons - Centered Vertically with Image */}
          {(isLoggedIn && (role === "user" || role === "admin")) && (
            <div className='flex flex-col gap-4 justify-center items-center lg:ms-8 mt-8 lg:mt-0'>
              {role === "user" && (
                <>
                  <button className='bg-white text-red-500 rounded-full text-3xl p-3 flex items-center justify-center' onClick={handleFavourite}>
                    <FaHeart />
                    <span className='ms-4 block lg:hidden'>Favourites</span>
                  </button>
                  <button className='bg-blue-500 text-white rounded-full text-3xl p-3 flex items-center justify-center ' onClick={handleCart}>
                    <FaShoppingCart />
                    <span className='ms-4 block lg:hidden'>Add to cart</span>
                  </button>
                </>
              )}

              {role === "admin" && (
                <>
                  <Link
                   to={`/updateBook/${id}`}
                  className='bg-white text-black rounded-full text-3xl p-3 flex items-center justify-center'>
                    <FaEdit />
                    <span className='ms-4 block lg:hidden'>Edit</span>
                  </Link>
                  <button className='bg-white text-red-500 rounded-full text-3xl p-3 flex items-center justify-center' onClick={deleteBook}>
                    <MdDelete />
                    <span className='ms-4 block lg:hidden'>Delete Book</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Book Details */}
      <div className='w-full lg:w-3/6 p-4'>
        <h1 className='text-4xl text-zinc-300 font-semibold'>{data.title}</h1>
        <p className='text-zinc-400 mt-1'>by {data.author}</p>
        <p className='text-zinc-500 mt-4 text-xl'>{data.desc}</p>
        <p className='flex mt-4 items-center gap-2 text-zinc-400'>
          <GrLanguage /> {data.language}
        </p>
        <p className='mt-4 text-zinc-100 text-3xl font-semibold'>
          Price : ₹ {data.price}
        </p>
      </div>
    </div>
  );
};

export default ViewBookDetails;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { FaCheck, FaUserLarge } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { IoOpenOutline } from 'react-icons/io5';
import SeeUserData from './SeeUserData';

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState();
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: '' });
  const [refresh, setRefresh] = useState(false);
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('https://book-store-backend-2m9y.onrender.com/api/v1/get-all-orders', { headers });
        setAllOrders(response.data.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetch();
  }, [refresh]);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = allOrders[i]._id;
    try {
      const response = await axios.put(
        `https://book-store-backend-2m9y.onrender.com/api/v1/update-status/${id}`,
        values,
        { headers }
      );
      alert(response.data.message);
      setOptions(-1);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Update failed:', error.response?.data || error);
    }
  };

  return (
    <>
      {!allOrders ? (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">All Orders</h1>

          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-2 flex gap-2">
            <div className="w-[3%] text-center">Sr.</div>
            <div className="w-[40%] md:w-[22%]">Books</div>
            <div className="w-0 md:w-[45%] hidden md:block">Description</div>
            <div className="w-[17%] md:w-[9%]">Price</div>
            <div className="w-[30%] md:w-[16%]">Status</div>
            <div className="w-[10%] md:w-[5%]">
              <FaUserLarge />
            </div>
          </div>

          {allOrders.map((items, i) => (
            <div
              key={i}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900"
            >
              <div className="w-[3%] text-center">{i + 1}</div>

              <div className="w-[40%] md:w-[22%]">
                {items.book ? (
                  <Link to={`/view-book-details/${items.book._id}`} className="hover:text-blue-300">

                    {items.book.title}
                  </Link>
                ) : (
                  <span className="text-red-400">[Deleted Book]</span>
                )}
              </div>

              <div className="w-0 md:w-[45%] hidden md:block">
                <h1>{items.book?.desc?.slice(0, 50) || "No description"} ...</h1>
              </div>

              <div className="w-[17%] md:w-[9%]">
                <h1>Rs {items.book?.price || "N/A"}</h1>
              </div>

              <div className="w-[30%] md:w-[16%]">
                <button
                  className="hover:scale-105 transition-all duration-300"
                  onClick={() => setOptions(i)}
                >
                  {items.status === 'order placed' ? (
                    <div className="text-green-500">{items.status}</div>
                  ) : items.status === 'Canceled' ? (
                    <div className="text-red-500">{items.status}</div>
                  ) : (
                    <div className="text-green-500">{items.status}</div>
                  )}
                </button>

                <div className={`${options === i ? 'block' : 'hidden'} flex mt-4`}>
                  <select
                    name="status"
                    className="bg-gray-800"
                    onChange={change}
                    value={values.status}
                  >
                    {['order placed', 'out for delivery', 'Delivered', 'Canceled'].map(
                      (status, idx) => (
                        <option value={status} key={idx}>
                          {status}
                        </option>
                      )
                    )}
                  </select>
                  <button
                    className="text-green-500 hover:text-pink-600 mx-2"
                    onClick={() => submitChanges(i)}
                  >
                    <FaCheck />
                  </button>
                </div>
              </div>

              <div className="w-[10%] md:w-[5%]">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setuserDiv("fixed");
                    setuserDivData(items.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;

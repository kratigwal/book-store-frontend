import React, { useState, useEffect } from 'react';
import axios from "axios";
import Loader from "../Loader/Loader";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://book-store-backend-2m9y.onrender.com/api/v1/get-user-information",
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address });
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };
    fetch();
  }, []);

  const submitAddress = async () => {
    try {
      const response = await axios.put(
        "https://book-store-backend-2m9y.onrender.com/api/v1/update-address",
        value,
        { headers }
      );
      alert(response.data.message);
    } catch (err) {
      alert("Failed to update address");
      console.error(err);
    }
  };

  return (
    <>
      {!profileData ? (
        <div className='w-full h-full flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <div className='h-full p-4 text-zinc-100 pt-20'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Settings
          </h1>

          <div className='flex flex-col md:flex-row gap-12'>
            <div className='w-full md:w-1/2'>
              <label>Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {profileData.username}
              </p>
            </div>
            <div className='w-full md:w-1/2'>
              <label>Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {profileData.email}
              </p>
            </div>
          </div>

          <div className='mt-6 flex flex-col'>
            <label>Address</label>
            <textarea
              className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
              rows="5"
              name="address"
              placeholder='Enter your address'
              value={value.address}
              onChange={handleChange}
            />
          </div>

          <div className='mt-6 flex justify-end'>
            <button
              className='bg-yellow-500 text-zinc-900 font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition-all duration-300'
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;

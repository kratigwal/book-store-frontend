import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import Loader from "../components/Loader/Loader";
import { Outlet } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://book-store-backend-2m9y.onrender.com/api/v1/get-user-information",
        { headers }
      );
      setProfile(response.data);
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 md:px-12 py-6 min-h-screen bg-zinc-900 text-white">
      {!profile ? (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full md:w-[260px]">
            <Sidebar data={profile} />
          </div>
          <div className="flex-1 overflow-x-hidden">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

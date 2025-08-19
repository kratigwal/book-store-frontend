import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const avatarUrl = data?.avatar?.includes("http")
    ? data.avatar
    : data?.avatar
    ? `https://book-store-backend-2m9y.onrender.com/${data.avatar}`
    : "https://via.placeholder.com/100";

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const isUser = role?.toLowerCase() === "user";
  const isAdmin = role?.toLowerCase() === "admin";

  return (
    <div className="bg-zinc-800 text-white w-full h-screen p-6 rounded-lg flex flex-col">
      {/* TOP: User Info */}
      <div className="flex flex-col items-center">
        <img
          src={avatarUrl}
          alt="avatar"
          className="h-24 w-24 rounded-full object-cover"
        />
        <h2 className="mt-4 text-xl font-semibold text-center">
          {data?.username || "Username"}
        </h2>
        <p className="text-sm text-zinc-400 text-center">
          {data?.email || "user@example.com"}
        </p>
      </div>

      <hr className="my-6 border-zinc-600" />

      {/* USER Links */}
      {isUser && (
        <nav className="flex flex-col gap-3">
          <Link to="/profile" className="text-center py-2 rounded hover:bg-zinc-700 transition">Favourites</Link>
          <Link to="/profile/orderHistory" className="text-center py-2 rounded hover:bg-zinc-700 transition">Order History</Link>
          <Link to="/profile/settings" className="text-center py-2 rounded hover:bg-zinc-700 transition">Settings</Link>
        </nav>
      )}

      {/* Spacer + Center Admin Section */}
      {isAdmin && (
        <div className="flex-1 flex flex-col justify-center items-center gap-4">
          <Link
            to="/profile"
            className="py-2 px-6 w-[70%] text-center rounded bg-black hover:bg-white hover:text-black transition"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className="py-2 px-6 w-[70%] text-center rounded bg-black hover:bg-white hover:text-black transition"
          >
            Add Book
          </Link>
        </div>
      )}

      {/* Logout */}
      <div className="pt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 rounded bg-black hover:bg-white hover:text-black transition-all duration-300"
        >
          Log Out <FaArrowRightFromBracket />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

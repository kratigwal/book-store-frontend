import React, { useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';

// Pages
import Home from './pages/Home';
import AllBooks from './pages/AllBooks';
import AddBook from './pages/AddBook';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

// Nested Profile Pages
import Favourites from './components/Profile/Favourites'; 
import UserOrderHistory from './components/Profile/UserOrderHistory';
import Settings from './components/Profile/Settings';
import AllOrders from './pages/AllOrders';
import UpdateBook from './pages/UpdateBook';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFirstLoad = useRef(true);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (id && token && role) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(role));
    }

    if (
      window.location.pathname.startsWith("/profile") &&
      !token &&
      isFirstLoad.current
    ) {
      isFirstLoad.current = false;
      navigate("/");
    }
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />

          {/* Nested Profile Routes */}
          <Route path="/profile" element={<Profile />}>
           {role === "user" ?  <Route index element={<Favourites />} /> : ( <Route index element={<AllOrders />} /> )}
           {role === "admin" &&    <Route path="/profile/add-book" element={<AddBook />} />}
          
            <Route path="orderHistory" element={<UserOrderHistory />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/updateBook/:id" element={<UpdateBook />} />
          <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        </Routes>
      </div>

      <Footer  />
    </div>
  );
};

export default App;


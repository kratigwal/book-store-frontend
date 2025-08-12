import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
 const Links = [
  { title: "Home", link: "/" },
  { title: "All Books", link: "/all-books" },
  { title: "Cart", link: "/cart" },
  { title: "Profile", link: "/profile" },
  { title: "Admin Profile", link: "/profile" }
];



  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state)=> state.auth.role);
  const filteredLinks = isLoggedIn ? Links : Links.slice(0, 2);

  const [mobilenav, setmobilenav] = useState("hidden");

  useEffect(() => {
    setmobilenav("hidden");
  }, [isLoggedIn]);

  if(isLoggedIn == true && role === "user"){
    Links.splice(4,1)
  }
  if(isLoggedIn == true && role === "admin"){
    Links.splice(3,1)
  }

  return (
    <>
      <nav className='z-50 relative bg-zinc-800 text-white px-8 py-2 flex items-center justify-between'>
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src='https://cdn-icons-png.flaticon.com/128/10433/10433049.png'
            alt='image'
          />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </Link>

        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {filteredLinks.map((items) => (
  <div key={items.title} className='flex items-center justify-center'>

           {items.title === "Profile" || items.title === "Admin Profile" ? <Link
            to={items.link}
            className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          key={items.title}

          >
            {items.title}{""}
          </Link> : <Link
            to={items.link}
            onClick={() => setmobilenav("hidden")}
            className="hover:text-blue-500 transition-all duration-300"
           key={items.title}

          >
            {items.title}
          </Link>}
          </div>
            ))}
          </div>

          {!isLoggedIn && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/Login"
                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                SignUp
              </Link>
            </div>
          )}

          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() =>
              mobilenav === "hidden" ? setmobilenav("block") : setmobilenav("hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`${mobilenav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
       {filteredLinks.map((items) => (
  <Link
    key={items.title}
    to={items.link}
    onClick={() => setmobilenav("hidden")}
    className="text-white text-3xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300"
  >

            {items.title}
          </Link>
        ))}

        {!isLoggedIn && (
          <>
            <Link
              to="/Login"
              onClick={() => setmobilenav("hidden")}
              className="px-6 py-2 mb-8 text-3xl font-semibold border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/SignUp"
              onClick={() => setmobilenav("hidden")}
              className="px-6 py-2 mb-8 text-2xl font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;

import React from 'react';
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);
  return (
    <>
     {role === "user" && <div className='w-full flex lg:hidden items-center justify-between mt-4'>
      <Link
                to="/profile"
                className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300"
              >
                Favourites
              </Link>
              <Link
                to="/profile/orderHistory"
                className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300"
              >
                Order History
              </Link>
              <Link
                to="/profile/settings"
                className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300"
              >
                Settings
              </Link>
    </div> }
 {role === "admin" && (
  <div className='w-full flex lg:hidden items-center justify-between mt-4'>
    <Link
      to="/profile/all-orders"
      className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300"
    >
      All Orders
    </Link>
    <Link
      to="/profile/add-book"
      className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300"
    >
      Add Book
    </Link>
  </div>
)}

    
    </>
  )
}

export default MobileNav

// import React from 'react';
// import { Link } from "react-router-dom";
// import { useSelector } from 'react-redux';

// const MobileNav = () => {
//   const role = useSelector((state) => state.auth.role);

//   const navLinks = role === "user"
//     ? [
//         { to: "/profile", label: "Favourites" },
//         { to: "/profile/orderHistory", label: "Order History" },
//         { to: "/profile/settings", label: "Settings" }
//       ]
//     : role === "admin"
//     ? [
//         { to: "/profile", label: "All Orders" },
//         { to: "/profile/add-book", label: "Add Book" }
//       ]
//     : [];

//   return (
//     <>
//       {navLinks.length > 0 && (
//         <div className="w-full flex flex-col gap-2 lg:hidden mt-4 px-4">
//           {navLinks.map((link, index) => (
//             <Link
//               key={index}
//               to={link.to}
//               className="text-zinc-100 font-semibold py-2 text-center bg-zinc-800 hover:bg-zinc-900 rounded transition-all duration-300"
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default MobileNav;

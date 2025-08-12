// // // import React, { useEffect, useState } from 'react';
// // // import axios from "axios";
// // // import BookCard from "../BookCard/BookCard"
// // // const Favourites = () => {
// // //  const [favouriteBooks, setfavouriteBooks] = useState([]); 

// // //   const headers = {
// // //     id: localStorage.getItem("id"),
// // //     authorization: `Bearer ${localStorage.getItem("token")}`,
// // //   };
// // //   useEffect(() => {
// // //     const fetch = async ()=>{
// // //       const response = await axios.get(
// // //         "http://localhost:1000/api/v1/get-favourite-books",
// // //         {headers}
// // //       );
// // //       setfavouriteBooks(response.data.data);
// // //     };
// // //    fetch();
// // //   },[]);

// // //   return(
// // //     <>
// // //     {favouriteBooks.length === 0 && (<div className='text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center w-full bg-'>No Favourite Books
// // //     </div>
// // //      )}

// // //     <div className=' grid grid-cols-4 gap-4'>
// // //     {favouriteBooks && 
// // //     favouriteBooks.map((items,i)=>(
// // //     <div key={i}>
// // //       <BookCard data={items} favourite={true}/>
// // //     </div>
// // //     ))}
// // //   </div>
// // //     </>
// // // )};

// // // export default Favourites;

// // import React, { useEffect, useState } from 'react';
// // import axios from "axios";
// // import BookCard from "../BookCard/BookCard";

// // const Favourites = () => {
// //   const [favouriteBooks, setFavouriteBooks] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const headers = {
// //     id: localStorage.getItem("id"),
// //     authorization: `Bearer ${localStorage.getItem("token")}`,
// //   };

// //   useEffect(() => {
// //     const fetch = async () => {
// //       try {
// //         const response = await axios.get(
// //           "http://localhost:1000/api/v1/get-favourite-books",
// //           { headers }
// //         );
// //         setFavouriteBooks(response.data.data || []);
// //       } catch (error) {
// //         console.error("Error fetching favourite books", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetch();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="min-h-[60vh] flex items-center justify-center text-white text-xl">
// //         Loading...
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-zinc-900 text-white px-4 sm:px-6 md:px-12 py-6 min-h-screen">
// //       {favouriteBooks.length === 0 ? (
// //         <div className="text-center text-zinc-500 text-2xl sm:text-3xl font-semibold min-h-[50vh] flex items-center justify-center">
// //           No Favourite Books
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //           {favouriteBooks.map((item, i) => (
// //             <div key={i}>
// //               <BookCard data={item} favourite={true} />
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Favourites;

// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import BookCard from "../BookCard/BookCard";
// import Loader from "../Loader/Loader";

// const Favourites = () => {
//   const [favouriteBooks, setFavouriteBooks] = useState();

//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };

//   const fetchData = async () => {
//     try {
//       const res = await axios.get("http://localhost:1000/api/v1/get-favourite-books", { headers });
//       setFavouriteBooks(res.data.data);
//     } catch (error) {
//       console.log("Error fetching favourite books", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // ✅ Updated function (no full fetch again)
//   const removeFromFavourites = async (bookId) => {
//     try {
//       const res = await axios.put(`http://localhost:1000/api/v1/remove-from-favourites/${bookId}`, {}, { headers });
//       alert(res.data.message);

//       // ✅ Remove the book directly from state
//       setFavouriteBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
//     } catch (error) {
//       console.log("Error removing from favourites", error);
//     }
//   };

//   return (
//     <div className="bg-zinc-900 min-h-screen px-8 py-8">
//       {!favouriteBooks ? (
//         <div className="flex items-center justify-center h-[80vh]">
//           <Loader />
//         </div>
//       ) : favouriteBooks.length === 0 ? (
//         <div className="flex items-center justify-center h-[80vh]">
//           <h1 className="text-5xl font-semibold text-zinc-400 text-center">No Favourite Books</h1>
//         </div>
//       ) : (
//         <>
//           <h1 className="text-5xl font-semibold text-zinc-500 mb-8">Your Favourites</h1>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {favouriteBooks.map((book, i) => (
//               <BookCard
//                 key={i}
//                 data={book}
//                 favourite={true}
//                 onRemove={removeFromFavourites} // 👈 Pass book ID handler
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Favourites;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState(null);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    try {
      const res = await axios.get(
        'http://localhost:1000/api/v1/get-favourite-books',
        { headers }
      );
      setFavouriteBooks(res.data.data);
    } catch (err) {
      console.log('Error fetching favourites:', err);
    }
  };

  // ✅ This is the key logic: update UI instantly
  const handleRemove = (bookId) => {
    setFavouriteBooks((prevBooks) =>
      prevBooks.filter((book) => book._id !== bookId)
    );
  };

  if (!favouriteBooks) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 min-h-screen px-8 py-8">
      {favouriteBooks.length === 0 ? (
        <div className="flex items-center justify-center h-[80vh]">
          <h1 className="text-5xl text-zinc-400 font-semibold text-center">
            No Favourite Book
          </h1>
        </div>
      ) : (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Favourites
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favouriteBooks.map((book) => (
              <BookCard
                key={book._id}
                data={book}
                favourite={true}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favourites;

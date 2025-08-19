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
        'https://book-store-backend-2m9y.onrender.com/api/v1/get-favourite-books',
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

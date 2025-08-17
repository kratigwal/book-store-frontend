import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';

const AllBooks = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://book-store-backend-2m9y.onrender.com/api/v1/get-all-books");
        console.log("Fetched books:", response.data.data);
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="bg-zinc-900 min-h-screen px-4 sm:px-8 py-8">
      <h4 className="text-3xl text-yellow-100 font-semibold mb-6 text-center sm:text-left">
        All Books
      </h4>

      {loading && (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      )}

      {error && (
        <p className="text-red-400 text-center mt-4">{error}</p>
      )}

      {!loading && data?.length === 0 && !error && (
        <p className="text-white text-center mt-8">No books available.</p>
      )}

      {!loading && data?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item) => (
            <BookCard key={item._id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;

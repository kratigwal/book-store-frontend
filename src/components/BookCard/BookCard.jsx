
import React from 'react';
import { GrLanguage } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({ data, favourite, onRemove }) => {
  const handleRemoveBook = async () => {
    try {
      const headers = {
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`,
        bookid: data._id,
      };

      const res = await axios.put(
        'https://book-store-backend-2m9y.onrender.com/api/v1/remove-book-from-favourite',
        {},
        { headers }
      );

      alert(res.data.message);

      // ✅ Notify parent to remove from UI
      if (onRemove) {
        onRemove(data._id);
      }
    } catch (err) {
      console.log('Remove Error:', err);
      alert('Failed to remove from favourites');
    }
  };

  if (!data) return null;

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-800 rounded p-4 flex flex-col">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[25vh]" />
          </div>
          <h2 className="mt-4 text-xl text-white font-semibold">{data.title}</h2>
          <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
          <p>
            <GrLanguage className="me-3" /> {data.language}
          </p>
          <p className="mt-2 text-zinc-200 font-semibold">₹{data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
          onClick={handleRemoveBook}
        >
          Remove from favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;

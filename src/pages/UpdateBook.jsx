import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBook = () => {
  const [Data, setData] = useState({
    url: '',
    title: '',
    author: '',
    price: '',
    desc: '',
    language: '',
  });

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: id,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === '' ||
        Data.title === '' ||
        Data.author === '' ||
        Data.price === '' ||
        Data.desc === '' ||
        Data.language === ''
      ) {
        alert('All fields are required');
      } else {
        const response = await axios.put(
          'http://localhost:1000/api/v1/update-book',
          Data,
          { headers }
        );

        alert(response.data.message);
        navigate('/all-books');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Update failed');
      navigate(`/view-book-details/${id}`);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch book data', error);
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <div className="text-zinc-300 text-xl p-4">Loading...</div>;

  return (
    <div className='bg-zinc-900 min-h-screen p-4'>
      <h1 className='text-3xl md:text-5xl font-semibold text-zinc-200 mb-8'>
        Update Book
      </h1>
      <div className='p-4 bg-zinc-800 rounded'>
        <div>
          <label className='text-zinc-400'>Image</label>
          <input
            type='text'
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='URL of image'
            name='url'
            value={Data.url}
            onChange={change}
          />
        </div>

        <div className='mt-4'>
          <label className='text-zinc-400'>Title of Book</label>
          <input
            type='text'
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='Title of book'
            name='title'
            value={Data.title}
            onChange={change}
          />
        </div>

        <div className='mt-4'>
          <label className='text-zinc-400'>Author of Book</label>
          <input
            type='text'
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='Author of book'
            name='author'
            value={Data.author}
            onChange={change}
          />
        </div>

        <div className='mt-4 flex gap-4'>
          <div className='w-3/6'>
            <label className='text-zinc-400'>Language</label>
            <input
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='Language of book'
              name='language'
              value={Data.language}
              onChange={change}
            />
          </div>

          <div className='w-3/6'>
            <label className='text-zinc-400'>Price</label>
            <input
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='Price of book'
              name='price'
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>

        <div className='mt-4'>
          <label className='text-zinc-400'>Description of Book</label>
          <textarea
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            rows='5'
            placeholder='Description of book'
            name='desc'
            value={Data.desc}
            onChange={change}
          />
        </div>

        <button
          className='mt-4 px-4 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all'
          onClick={submit}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;

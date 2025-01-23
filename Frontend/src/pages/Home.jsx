import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table'); // Default to 'table'

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5555/books');
        setBooks(response.data.data || []);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-200 min-h-screen">
      {/* Toggle View Buttons */}
      <div className="flex justify-center items-center gap-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            showType === 'table' ? 'bg-sky-600 text-white' : 'bg-sky-300 hover:bg-sky-600'
          }`}
          onClick={() => setShowType('table')}
        >
          Table View
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            showType === 'card' ? 'bg-sky-600 text-white' : 'bg-sky-300 hover:bg-sky-600'
          }`}
          onClick={() => setShowType('card')}
        >
          Card View
        </button>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Books List</h1>
        <Link
          to="/books/create"
          className="flex items-center gap-2 bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-all"
        >
          <MdOutlineAddBox className="text-2xl" />
          <span className="hidden sm:inline-block">Add New Book</span>
        </Link>
      </div>

      {/* Content Section */}
      {loading ? (
        <Spinner />
      ) : books.length > 0 ? (
        showType === 'table' ? (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <BooksTable books={books} />
          </div>
        ) : (
          <BooksCard books={books} />
        )
      ) : (
        <div className="text-center text-gray-600 mt-12">
          <h2 className="text-2xl font-semibold">No books found</h2>
          <p className="text-gray-500 mt-2">
            Click <Link to="/books/create" className="text-blue-600 underline">here</Link> to add a new book.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;

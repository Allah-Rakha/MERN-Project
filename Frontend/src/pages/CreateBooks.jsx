import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Initialize Snackbar
  const navigate = useNavigate();

  const handleSaveBook = async () => {
    const newBook = { title, author, publishYear };

    try {
      setLoading(true);
      await axios.post('http://localhost:5555/books', newBook);
      enqueueSnackbar('Book saved successfully!', { variant: 'success' }); // Show success notification
      navigate('/'); // Redirect to home after saving
    } catch (error) {
      enqueueSnackbar('Failed to save the book. Please try again.', { variant: 'error' }); // Show error notification
      console.log('Error saving book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Back Button */}
      <BackButton />
      
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-800 text-center my-6">Create Book</h1>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center my-8">
          <Spinner />
        </div>
      )}

      {/* Form Section */}
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold text-gray-600 mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        {/* Author Field */}
        <div className="mb-4">
          <label htmlFor="author" className="block text-lg font-semibold text-gray-600 mb-2">
            Author
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        {/* Publish Year Field */}
        <div className="mb-6">
          <label htmlFor="publishYear" className="block text-lg font-semibold text-gray-600 mb-2">
            Publish Year
          </label>
          <input
            id="publishYear"
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSaveBook}
          className="w-full bg-indigo-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;

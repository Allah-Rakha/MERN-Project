import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar(); // Hook for showing snackbars

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        const { title, author, publishYear } = response.data;
        setTitle(title);
        setAuthor(author);
        setPublishYear(publishYear);
       
      } catch (error) {
        enqueueSnackbar('Failed to fetch book details.', { variant: 'error' });
        console.log('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, enqueueSnackbar]);

  const handleEditBook = async () => {
    const updatedBook = { title, author, publishYear };

    try {
      setLoading(true);
      await axios.put(`http://localhost:5555/books/${id}`, updatedBook);
      enqueueSnackbar('Book updated successfully.', { variant: 'success' });
      navigate('/'); // Redirect to the home page after saving
    } catch (error) {
      enqueueSnackbar('Failed to update the book.', { variant: 'error' });
      console.log('Error updating book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Back Button */}
      <BackButton />
      
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-800 text-center my-6">Edit Book</h1>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center mt-12">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
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
            onClick={handleEditBook}
            className="w-full bg-indigo-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBook;

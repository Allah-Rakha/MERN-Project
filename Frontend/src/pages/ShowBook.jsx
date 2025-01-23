import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`).then((response) => {
      setBook(response.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-200 min-h-screen">
      <BackButton />
      <h1 className="text-4xl font-semibold text-gray-800 my-6 text-center">Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Id:</span>
            <span className="text-gray-600">{book._id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Title:</span>
            <span className="text-gray-600">{book.title}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Author:</span>
            <span className="text-gray-600">{book.author}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Publish Year:</span>
            <span className="text-gray-600">{book.publishYear}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Create Time:</span>
            <span className="text-gray-600">{new Date(book.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Last Update Time:</span>
            <span className="text-gray-600">{new Date(book.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowBook;

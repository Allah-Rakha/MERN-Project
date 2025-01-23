import React, { useState } from "react";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import BookModel from "./BookModel"; // Keep original name

const BookSingleCard = ({ book }) => {
  const [showModel, setShowModel] = useState(false);

  return (
    <>
      <div
        key={book._id}
        className="bg-gradient-to-br from-indigo-100 via-blue-200 to-indigo-300 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out relative h-full"
      >
        {/* Badge for Publish Year */}
        <div className="absolute top-4 left-4 bg-indigo-500 text-white text-xs px-3 py-1 rounded-full z-10">
          {book.publishYear}
        </div>

        {/* Book Title and Author */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-indigo-800 transition-colors duration-300">
            {book.title}
          </h2>
          <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
            <BiUserCircle className="text-indigo-500" />
            {book.author}
          </p>
        </div>

        {/* Eye Icon to Expand Card */}
        <BiShow
          className="text-3xl text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModel(true)}
          title="View Details"
        />

        {/* Action Buttons */}
        <div className="flex justify-between items-center text-xl mt-4 relative z-10">
          <Link
            to={`/books/${book._id}`}
            className="text-green-600 hover:text-green-400 transition-colors"
            title="View Details"
          >
            <BsInfoCircle />
          </Link>
          <Link
            to={`/books/edit/${book._id}`}
            className="text-yellow-600 hover:text-yellow-400 transition-colors"
            title="Edit Book"
          >
            <AiOutlineEdit />
          </Link>
          <Link
            to={`/books/delete/${book._id}`}
            className="text-red-600 hover:text-red-400 transition-colors"
            title="Delete Book"
          >
            <MdOutlineDelete />
          </Link>
        </div>
      </div>

      {/* Full-Screen Modal */}
      {showModel && <BookModel book={book} onClose={() => setShowModel(false)} />}
    </>
  );
};

export default BookSingleCard;

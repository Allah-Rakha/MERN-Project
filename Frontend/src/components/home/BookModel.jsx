import { AiOutlineClose } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

const BookModel = ({ book, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()} // Prevent modal close on inner clicks
        className="w-[90%] max-w-3xl bg-gradient-to-br from-indigo-100 via-blue-200 to-indigo-300 rounded-2xl shadow-xl p-8 relative"
      >
        {/* Close Button */}
        <AiOutlineClose
          className="absolute top-4 right-4 text-3xl text-red-600 cursor-pointer hover:text-red-800"
          onClick={onClose}
          title="Close"
        />

        {/* Book Details */}
        <div className="mt-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h2>
          <p className="text-lg text-gray-700 flex items-center gap-2 mb-4">
            <BiUserCircle className="text-indigo-500" />
            Author: {book.author}
          </p>
          <p className="text-md text-gray-600 mb-4">
            Published Year: <span className="font-semibold">{book.publishYear}</span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Description:</span> {book.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookModel;

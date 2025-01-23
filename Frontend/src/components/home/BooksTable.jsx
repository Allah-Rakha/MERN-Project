import React from 'react'
import { Link } from 'react-router-dom';
import { AiFillDelete, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
const BooksTable = ({books}) => {
  return (
    <table className="w-full text-left table-auto">
    <thead>
      <tr className="bg-blue-300 text-gray-800">
        <th className="py-3 px-4 text-center">#</th>
        <th className="py-3 px-4 text-left">Title</th>
        <th className="py-3 px-4 text-left hidden sm:table-cell">Author</th>
        <th className="py-3 px-4 text-left hidden sm:table-cell">Publish Year</th>
        <th className="py-3 px-4 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {books.map((book, index) => (
        <tr
          key={book._id}
          className="hover:bg-gray-100 transition-colors ease-in-out duration-200"
        >
          <td className="py-3 px-4 text-center font-medium">{index + 1}</td>
          <td className="py-3 px-4">{book.title}</td>
          <td className="py-3 px-4 hidden sm:table-cell">{book.author}</td>
          <td className="py-3 px-4 hidden sm:table-cell">{book.publishYear}</td>
          <td className="py-3 px-4 text-center">
            <div className="flex justify-center gap-x-4">
              <Link
                to={`/books/${book._id}`}
                className="text-green-700 hover:text-green-500"
                title="View Details"
              >
                <BsInfoCircle className="text-xl" />
              </Link>
              <Link
                to={`/books/edit/${book._id}`}
                className="text-yellow-600 hover:text-yellow-400"
                title="Edit Book"
              >
                <AiOutlineEdit className="text-xl" />
              </Link>
             <Link to={`/books/delete/${book._id}`}>
             <AiOutlineDelete className='text-2xl text-red-600'/>
             </Link>
             
              
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default BooksTable

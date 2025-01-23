import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack"; // Import useSnackbar from notistack
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar(); // Initialize Snackbar

  const handleDeleteBook = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5555/books/${id}`);
      
      // Show success notification
      enqueueSnackbar("Book deleted successfully!", { variant: "success" });
      
      navigate("/"); // Redirect to home after successful deletion
    } catch (error) {
      setLoading(false);
      
      // Show error notification
      enqueueSnackbar("Failed to delete the book. Please try again.", { variant: "error" });
      
      console.error("Error deleting book:", error); // Log the error for debugging
    } finally {
      setLoading(false); // Ensure loading state is always reset
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
        <button
          onClick={handleDeleteBook}
          className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Deleting..." : "Yes, Delete it"}
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;

import React, { useEffect, useState,} from 'react';
import BackButton from '../components/BackButton';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';


const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:2727/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e)
      })
  }, []);

  return (
    <div className="px-3 py-1 my-2 mx-3 ">
      <BackButton/>
      <h1 className="text-3xl my-4">Book Details</h1>
      {
        loading ? (
          <Spinner/>
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-2xl w-fit p-4">
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Id</span>
              <span>{book._id}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Title</span>
              <span>{book.title}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Author</span>
              <span>{book.author}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Publish Year</span>
              <span>{book.publishYear}</span>
            </div>
          </div>
      )}
    </div>
  )
}

export default ShowBook
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:2727/books')
            .then((res) => {
                setBooks(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);
    console.log(books);
    return (
        <div className='p-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8 mx-5'>Book list</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-600 text-4xl px-1 hover:text-sky-400' />
                </Link>
            </div>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <table className='w-full border-separate border-spacing-2'>
                        <thead>
                            <tr>
                                <th className='py-2 border border-gray-400 rounded-full bg-gray-700 text-gray-200'>No.</th>
                                <th className='py-2 border border-gray-400 rounded-full bg-gray-700 text-gray-200'>Title</th>
                                <th className='py-2 border border-gray-400 rounded-full bg-gray-700 text-gray-200 max-md:hidden'>Author</th>
                                <th className='py-2 border border-gray-400 rounded-full bg-gray-700 text-gray-200 max-md:hidden'>Publish Year</th>
                                <th className='py-2 border border-gray-400 rounded-full bg-gray-700 text-gray-200'>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books.map((book, index) => (<tr key={book._id} className='h-2'>
                                    <td className='py-2 border border-slate-700 rounded-lg text-center'>
                                        {index + 1}
                                    </td>
                                    <td className='border border-slate-700 rounded-lg text-center'>
                                        {book.title}
                                    </td>
                                    <td className='border border-slate-700 rounded-lg text-center'>
                                        {book.author}
                                    </td>
                                    <td className='border border-slate-700 rounded-lg text-center'>
                                        {book.publishYear}
                                    </td>
                                    <td className='border border-slate-700 rounded-lg text-center'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/books/details/${book._id}`}>
                                                <BsInfoCircle className='text-2xl text-green-800 hover:text-green-400' />
                                            </Link>
                                            <Link to={`/books/edit/${book._id}`}>
                                                <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-400' />
                                            </Link>
                                            <Link to={`/books/delete/${book._id}`}>
                                                <MdOutlineDelete className='text-2xl text-red-500 hover:text-red-300' />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>))
                            }
                        </tbody>
                    </table>
                )

            }
        </div>
    )
}

export default Home
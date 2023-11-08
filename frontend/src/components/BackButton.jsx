import {Link} from 'react-router-dom';
import {BsArrowLeft} from 'react-icons/bs';

const BackButton = ({destination = '/'}) => {
  return (
    <div className="flex">
        <Link to={destination} className="rounded-xl hover:bg-sky-300 bg-sky-950 p-2">
            <BsArrowLeft className='text-gray-50 text-2xl'/>
        </Link>
    </div>
  )
}

export default BackButton
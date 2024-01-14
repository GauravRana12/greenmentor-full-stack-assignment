import React, { useEffect, useState } from 'react'
import { getDate } from '../Utils/date';

const Task = ({person}) => {
    const [date,setDate]=useState({});
    
    useEffect(()=>{
   var  now= getDate(person.createdAt);
   setDate(now)
    },[])
  return (
    <li key={person.title} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none object-cover rounded-full bg-gray-50" src={person.profileImg ? person.profileImg: 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'} alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-lg font-semibold leading-6 text-gray-900">{person.title}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{date?.day} {date?.month} 2024</p>
              <p className="text-sm w-2/3 font-semibold leading-6 text-gray-900">{person.description}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <img className='w-72 object-cover' src={person.image ? person.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYYxjR90jrgz5hZpXstGCLXr6yilVixSh9egomMTuSg69IuIQV48_RRdT_cdNx1JN75yM&usqp=CAU"} alt='image' />
             
             
             
          </div>
        </li>
  )
}

export default Task
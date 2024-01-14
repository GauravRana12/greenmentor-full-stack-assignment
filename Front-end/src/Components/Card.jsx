import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetallTask } from '../Redux/TaskReducer/TaskAction';
import Task from './Task';


const Card = () => {
 
  const state=useSelector((state)=>state.Taskreducer.totalTask);
  const dispatch=useDispatch();
  console.log(state);
  useEffect(()=>{
    dispatch(GetallTask);
  },[])
  return (
    <div className='lg:m-20 sm:m-0  lg:p-10 sm:p-0'>
        <h1 className="text-3xl font-bold mb-4 text-blue-800 font-serif">Dashboard</h1>
        <ul role="list" className="divide-y divide-gray-400">
      {state?.reverse().map((person) => (
        <Task person={person} />
      ))}
    </ul>
    </div>
  )
}

export default Card
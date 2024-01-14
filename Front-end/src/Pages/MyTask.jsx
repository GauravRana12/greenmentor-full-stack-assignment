import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteingTask, getMyonly } from "../Redux/TaskReducer/TaskAction";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
const MyTask = () => {
  const state = useSelector((state) => state.Taskreducer.myTask);
  const dispatch = useDispatch();
  console.log(state);
  useEffect(() => {
    dispatch(getMyonly);
  }, []);
  const styles = {
    width: "23px",
    height: "23px",
  };
  const styles2 = {
    width: "20px",
    height: "20px",
  };
  const deleteTask = (taskId) => {
    dispatch(deleteingTask(taskId));
  };
  const navigate = useNavigate();

  return (
    <div className="lg:m-20 sm:m-0 ">
      <h1 className="text-3xl font-bold mb-4 text-blue-800 font-serif">
        My Task
      </h1>
      <ul role="list" className="divide-y divide-gray-400">
        {state?.reverse().map((person) => (
          <li key={person.title} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={
                  person.profileImg
                    ? person.profileImg
                    : "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                }
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-lg font-semibold leading-6 text-gray-900">
                  {person.title}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  14 Jan 2024
                </p>
                <p className="text-sm lg:w-2/3 md:w-full font-semibold leading-6 text-gray-900">
                  {person.description}
                </p>
              </div>
              <Link to={`/edit/${person?._id}`} className="cursor-pointer">
                <FaEdit style={styles2} />
              </Link>
              <p
                onClick={() => deleteTask(person._id)}
                className="cursor-pointer"
              >
                <MdDeleteOutline style={styles} />
              </p>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <img
                className="w-72"
                src={
                  person.image
                    ? person.image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYYxjR90jrgz5hZpXstGCLXr6yilVixSh9egomMTuSg69IuIQV48_RRdT_cdNx1JN75yM&usqp=CAU"
                }
                alt="is"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTask;

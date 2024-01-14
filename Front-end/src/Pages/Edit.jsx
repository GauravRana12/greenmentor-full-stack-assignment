import React, { useEffect, useState } from "react";
import { uploadImage } from "../Utils/Firebase";
import { MdDeleteOutline } from "react-icons/md";
import { Alert } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getSingle, patchingTask, postTask } from "../Redux/TaskReducer/TaskAction";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  var { id } = useParams();
  console.log("getting",id);
  const notify = (msg) => toast.success(msg);
  const state=useSelector((state)=>state.Taskreducer.singletask)
  console.log(state);
  const [title, setTitle] = useState( "");
  const [description, setDescription] = useState( "");
  const [imageUrl, setImageUrl] = useState( "");
  const [imgLoading, setImgLoading] = useState(false);

  const handleImageChange = (e) => {
    setImgLoading(true);
    uploadImage(e.target.files[0])
      .then((downloadURL) => {
        setImageUrl(downloadURL);

        setImgLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setImgLoading(false);
      });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const taskSubmit = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    var tasks;
    if (imageUrl) {
      tasks = {
        title,
        description,
        image: imageUrl,
      };
    } else {
      tasks = {
        title,
        description,
      };
    }
    dispatch(patchingTask(tasks,id));
    notify("Task Updated successfully");
  };

  useEffect(
    () => {
        
      dispatch(getSingle(id));
      
      setTimeout(() => {
        setImageUrl(state?.image)
        setTitle(state.title)
        setDescription(state.description)
      }, 1000);
        
      setTimeout(() => {
        setImageUrl(state?.image)
        setTitle(state.title)
        setDescription(state.description)
      }, 2000);
      setTimeout(() => {
        setImageUrl(state?.image)
        setTitle(state.title)
        setDescription(state.description)
      }, 3500);
        
      

    },
    [id,dispatch]
  );

  return (
    <div>
      <>
        <Toaster />
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Write your task
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                </div>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div></div>
            </form>
          </div>
        </div>
      </>
      <label className="block text-center text-sm font-medium leading-6 text-gray-900">
        Image(optional)
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          {!imageUrl ? (
            <svg
              className="mx-auto h-12 w-12 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clip-rule="evenodd"
              />
            </svg>
          ) : (
            <MdDeleteOutline
              onClick={() => setImageUrl("")}
              cursor={"pointer"}
              style={{
                width: "25px",
                height: "25px",
              }}
            />
          )}
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            {imgLoading ? (
              <p>Loading...</p>
            ) : !imageUrl ? (
              <>
                {" "}
                <label
                  for="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                </label>
                <input
                  onChange={handleImageChange}
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                />
              </>
            ) : (
              <img
                className="max-w-sm min-w-sm max-h-52 min-h-52 "
                src={imageUrl}
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={taskSubmit}
        className="flex w-full  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Update
      </button>
    </div>
  );
};

export default Edit;

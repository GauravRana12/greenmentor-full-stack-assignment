import React, { useState } from 'react'
import { uploadImage } from '../Utils/Firebase';
import { Image } from '@chakra-ui/react';

const Create = () => {
  const [imageUrl, setImageUrl] = useState("");
 const [imgLoading,setImgLoading]=useState(false);
  const handleImageChange = (e) => {
    
    setImageUrl(true);
    uploadImage(e.target.files[0])
      .then((downloadURL) => {
        setImageUrl(downloadURL);

        // console.log(downloadURL);
        setImgLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setImgLoading(false);
      });
    // setImageUrl(url);
  };
  return (
    <div>
    <div class="mt-4 flex text-sm leading-6 text-gray-600">
                      {!imageUrl ? (
                        <>
                          {" "}
                          <label
                            for="file-upload"
                            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                          </label>
                          <input
                            onChange={handleImageChange}
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            class="sr-only"
                          />
                        </>
                      ) : (
                        <Image
                          alt='img'
                          src={imageUrl}
                        />
                      )}
                    </div>
    </div>
  )
}

export default Create
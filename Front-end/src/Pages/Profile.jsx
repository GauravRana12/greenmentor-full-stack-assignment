import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { uploadImage } from '../Utils/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginUser, updateUser } from '../Redux/LoginReducer/loginAction';
const Profile = () => {
  const state=useSelector((state)=>state.LoginReducer.userData);
  const [imageUrl, setImageUrl] = useState(" ");
  const [name,setName]=useState(" ");
  const [email,setEmail]=useState(" ");
  const [location,setLocation]=useState(" ");
  const [organization,setOrganization]=useState(" ");
  const [phone,setPhone]=useState(" ");
  const [lastname,setLastname]=useState(" ");
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
const dispatch=useDispatch();
  useEffect(()=>{
    const token=localStorage.getItem('token')
dispatch(getLoginUser(token))

 setTimeout(() => {
  setImageUrl(state?.image);
  setLocation(state?.location);
  setPhone(state?.phone);
  setLastname(state?.lastname);
  setOrganization(state?.organization);
  setEmail(state.email);
  setName(state.name);

 }, 1500);

  },[])

const updateDetails=(event)=>{
  event.preventDefault();
  const input={
    name,
    email,
    location,
    lastname,
    image:imageUrl,
    organization,
    phone
  }
  dispatch(updateUser(input,state?._id));
}

  return (
    <div>
			<div class="container-xl px-4 mt-4">
    
    
    <hr class="mt-0 mb-4"/>
    <div class="row">
        <div class="col-xl-4">
            
            <div class="card mb-4 mb-xl-0">
                <div class="card-header">Profile Picture</div>
                <div class="card-body text-center">
                    
                    <img class="img-account-profile object-cover rounded-circle mb-2" src={imageUrl ? imageUrl:"https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" } alt=""/>
                    
                    <div class="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                    
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
                </div>
            </div>
        </div>
        <div class="col-xl-8">
            
            <div class="card mb-4">
                <div class="card-header">Account Details</div>
                <div class="card-body">
                    <form>
                        
                        
                        
                        <div class="row gx-3 mb-3">
                            
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputFirstName">First name</label>
                                <input class="form-control" onChange={(e)=>setName(e.target.value)} id="inputFirstName" type="text" placeholder="Enter your first name" value={name}/>
                            </div>
                            
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputLastName">Last name</label>
                                <input class="form-control" id="inputLastName"  onChange={(e)=>setLastname(e.target.value)} type="text" placeholder="Enter your last name" value={lastname}/>
                            </div>
                        </div>
                        
                        <div class="row gx-3 mb-3">
                            
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputOrgName">Organization name</label>
                                <input class="form-control" id="inputOrgName" type="text"  onChange={(e)=>setOrganization(e.target.value)} placeholder="Enter your organization name" value={organization}/>
                            </div>
                            
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputLocation">Location</label>
                                <input class="form-control" id="inputLocation" type="text"  onChange={(e)=>setLocation(e.target.value)} placeholder="Enter your location" value={location} />
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label class="small mb-1" for="inputEmailAddress">Email address</label>
                            <input class="form-control" id="inputEmailAddress" type="email"  onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email address" value={email}/>
                        </div>
                        
                        <div class="row gx-3 mb-3">
                            
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputPhone">Phone number</label>
                                <input class="form-control" id="inputPhone" type="tel"  onChange={(e)=>setPhone(e.target.value)} placeholder="Enter your phone number" value={phone} />
                            </div>
                            
                            
                        </div>
                        
                        <button onClick={updateDetails} class="btn btn-primary" type="button">Save changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
		</div>
  )
}

export default Profile
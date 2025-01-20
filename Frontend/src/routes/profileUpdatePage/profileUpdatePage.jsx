import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import {useNavigate} from 'react-router-dom'
import UploadWidget from "../uploadWidget/UploadWidget";

function ProfileUpdatePage() {

  const {currentUser,updateUser} = useContext(AuthContext)
  const [error,setError] = useState("")
  const [avatar,setAvatar]  = useState([])

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;




  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    e.preventDefault()

    const formData = new FormData(e.target)

    //used {get} in login page : can be done using this too
    const {username,email,password} = Object.fromEntries(formData)

    try {
      const response = await apiRequest.put(`/user/${currentUser.id}`,{username,email,password,avatar:[0]})
      updateUser(response.data)
      navigate("/profile  ")
      // console.log(response.data);
      
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password"/>
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={ avatar[0] ||  currentUser.avatar  || "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="" className="avatar" />
        <UploadWidget  uwConfig={{
          // cloudName:"",
          cloudName:cloudName,
          // uploadPreset:"",
          uploadPreset:uploadPreset,
          multiple:false,
          maxImageFileASize:2000000,
          folder:"avatars"
        }}
        setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;

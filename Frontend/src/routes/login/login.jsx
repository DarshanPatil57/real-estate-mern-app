import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function Login() {
  const [error,setError] = useState()
  const [isloading,setIsLoading] = useState(false)

  const navigate = useNavigate()
  const handleSubmit = async (e)=>{
    e.preventDefault()
    setIsLoading(true)
    setError("")
    const formData = new FormData(e.target)

    const username = formData.get("username")
    const password = formData.get("password")

    try {
      const response = await apiRequest.post("/auth/login",{
        username,password
      })
      // console.log(response.data);

      localStorage.setItem("user",JSON.stringify(response.data))

      if(response.status === 200){
        navigate("/")
      }
      

    } catch (error) {
      console.log(error);
       setError(error.response.data.message)
    } finally{
      setIsLoading(false)
    }

  }
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" required type="text" placeholder="Username" />
          <input name="password" required type="password" placeholder="Password" />
          <button disabled={isloading}>Login</button>
          {error &&  <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;

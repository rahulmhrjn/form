import React, {useState} from 'react';
import loginImg from "../assets/image.jpg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { useAuth } from '../context/auth';


const Login = () => {
const [workemailaddress, setWorkemailaddress] = useState("");
const [password, setPassword] = useState("");
const [auth, setAuth] = useAuth();
const navigate = useNavigate();

// form function
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { workemailaddress, password});
        if(res && res.data.success){
            toast.success(res && res.data.message)
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token,
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate("/homepage");
        } else{
            toast.error(res && res.data.message)
        }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    }
};


  return (

<div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>

<div className='flex flex-col justify-center'>
    <form className='max-w-[400px] w-full mx-auto' onSubmit={handleSubmit}>
        <h2 className='text-4xl font-bold text-left'>Login to your account</h2>

        <div class="flex">
  <button class="flex-1 border border-solid border-1 border-black mt-6 m-1 "><p className='text-sm'>Sign in with Google</p></button>
  <div class="contents">
    <button class="flex-1 border border-solid border-1 border-black mt-6 m-1 h-10"><p className='text-sm'>Sign in with Microsoft</p></button>
    </div>
    </div>

    <p className='text-sm mt-5'>Or-------------------------------------------------</p>
    

        <div className='flex flex-col py-4'>
            <label>Email Address</label>
            <input className='mt-2 p-2 border border-solid border-1 border-black' type='text' value={workemailaddress} onChange={(e) => setWorkemailaddress(e.target.value)} placeholder='' required/>
        </div>


        <div className='flex flex-col py-2'>
            <label>Password</label>
            <input className='mt-2 p-2 border border-solid border-1 border-black' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='' required/>
        </div>

        <p className='text-sm text-right'>Forgot Password? <span className='text-sm text-purple-800 cursor-pointer font-semibold'>Reset Password</span></p>    


        <button className='w-full my-2 py-2 bg-indigo-700 text-white'>Log in</button>

        <div className='w-full'>
            <p className='text-sm text-center my-2'>Don't have account? <span className='text-sm text-purple-800 cursor-pointer font-semibold'><Link to="/register">Sign Up</Link></span></p>

        </div>
    </form>
</div>
<div className='hidden sm:block'>
<img className='w-full h-full object-cover' src={loginImg} alt="" />
</div>
</div>
 
  )
}

export default Login
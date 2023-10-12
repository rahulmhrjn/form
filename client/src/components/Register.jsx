import React, {useState} from 'react';
import image1 from "../assets/image1.jpg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';

const Register = () => {
const [firstname, setFirstname] = useState("");
const [lastname, setLastname] = useState("");
const [companyname, setCompanyname] = useState("");
const [workemailaddress, setWorkemailaddress] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

// form function
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {firstname, lastname, companyname, workemailaddress, password});
        if(res && res.data.success){
            toast.success(res && res.data.message)
            navigate("/login");
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
            <h2 className='text-4xl font-bold text-left'>See Facilade in action</h2>
            <div className='flex flex-col py-2'>
                <label>First Name</label>
                <input className='mt-2 p-2 border border-solid border-1 border-black' type='text' value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder=''required/>

                <label className='mt-4'>Last Name</label>
                <input className='mt-2 p-2 border border-solid border-1 border-black' type='text' value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder=''required/>
            </div>

            <div className='flex flex-col py-3'>
                <label>Company Name</label>
                <input className='mt-2 p-2 border border-solid border-1 border-black' type='text' value={companyname} onChange={(e) => setCompanyname(e.target.value)} placeholder='' required/>
            </div>

            <div className='flex flex-col py-4'>
                <label>Work Email Address</label>
                <input className='mt-2 p-2 border border-solid border-1 border-black' type='text' value={workemailaddress} onChange={(e) => setWorkemailaddress(e.target.value)} placeholder='' required/>
            </div>


            <div className='flex flex-col py-2'>
                <label>Password</label>
                <input className='mt-2 p-2 border border-solid border-1 border-black' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='' required/>
            </div>
            
            <button className='w-full my-2 py-2 bg-indigo-700 text-white'>Sign Up</button>

            <p className='text-xs text-center mt-2'>We guarantee 100% privacy. Your information will be shared</p>


            <div className='w-full'>
                <p className='text-sm text-center my-2'>Already have an account? <span className='text-sm text-purple-800 cursor-pointer font-semibold'> <Link to="/login">Log In</Link></span></p>

            </div>
        </form>
    </div>
    <div className='hidden sm:block'>
    <img className='w-full h-full object-cover' src={image1} alt="" />
    </div>
</div>


  )
}

export default Register
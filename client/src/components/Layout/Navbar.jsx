import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth, user:null, token:"",
    })
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
    <div className='navbar flex justify-between items-center h-20 mx-auto px-4'>
      <h1 className='w-full text-3xl font-bold text-black'>REACT.</h1>
      <ul className='hidden md:flex'>
        {
          !auth.user ? (<>
          <li className='p-4'><Link to="/login">Login</Link></li>
        <li className='p-4'><Link to="/register">Register</Link></li>
          </>) : (<>
            <li className='p-4'><Link onClick={handleLogout} to="/login">Logout</Link></li>
          </>)
        }
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'navbar fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 text-white bg-black ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-white m-4'>REACT.</h1>
        {
          !auth.user ? (<>
          <li className='p-4 border-b border-gray-600'><Link to="/login">Login</Link></li>
          <li className='p-4 border-b border-gray-600'><Link to="/register">Register</Link></li>
          </>) : (<>
            <li className='p-4 border-b border-gray-600'><Link onClick={handleLogout} to="/login">Logout</Link></li>
          </>)
        }
          
          
          
  
      </ul>
    </div>
    </>
  );
};

export default Navbar;
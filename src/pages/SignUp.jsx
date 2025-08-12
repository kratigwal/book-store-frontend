import axios from 'axios';
import React, { useState } from 'react'
import { FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'

const SignUp= () => {
 
      const [Values , setValue] = useState({
        username:"",
        email:"",
        password:"",
        address:"",
       });

       const navigate = useNavigate();

       const change = (e) => {
        const {name , value} = e.target;
        setValue({...Values,[name]:value})
       }

       const submit = async () => {
        console.log('clicked');
        try{

             if(Values.username === "" || Values.email === "" || Values.password === "" || Values.address === ""){
              alert("All fields are required");
            }
             if(Values.password.trim().length <= 5){
             alert("Password must be 5 characters or greater");

             }
           else{
            const response = await axios.post("http://localhost:1000/api/v1/sign-up", Values);
            alert(response.data.message);
            navigate("/Login");
              
            }
        }catch(err){
           alert(err.response.data.message);
        }
       }

  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
       <p className='text-zinc-200 text-xl'> Sign Up</p>


       <div className='mt-4'>
              <label htmlFor='' className='text-zinc-400'>User Name</label>
              <input type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='Username'
              name='username'
              required 
              value={Values.username}
              onChange={change}
              />
        </div>


        <div className='mt-4'>
        
              <label htmlFor='' className='text-zinc-400'>Email</label>
              <input type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='xyz@gmail.com'
              name='email'
              required 
               value={Values.email}
              onChange={change}

              />
         </div>


       <div className='mt-4'>
        
              <label htmlFor='' className='text-zinc-400'>Password</label>
              <input type='password'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='password'
              name='password'
              required 
               value={Values.password}
              onChange={change}
              />
       </div>


       <div className='mt-4'>
        
              <label htmlFor='' className='text-zinc-400'>Address</label>
              <textarea
              rows="5"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='address'
              name='address'
              required 
               value={Values.address}
              onChange={change}
              />
       </div> 


       <div className='mt-4'>
        <button className='w-full bg-blue-700 text-white font-semibold py-2 rounded hover:bg-blue-500 transition-all duration-300' 
        onClick={submit} > SignUp</button>
       </div> 
       <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'> Or </p>
      <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
  Already have an account? &nbsp;

       <Link to="/login" className='hover:text-blue-500'> 
      <u>LogIn</u>
      </Link>
       </p>
     
      </div>
    </div>
  )
}

export default SignUp;
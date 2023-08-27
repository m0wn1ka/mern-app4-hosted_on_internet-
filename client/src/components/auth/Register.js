
import React , {Fragment,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {Link,Navigate} from 'react-router-dom';
import  {useNavigate}  from 'react-router-dom';

import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import { REGISTER_FAIL,REGISTER_SUCCESS } from '../../features/auth/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:'',
    password2:''
  });
  const {name,email,password,password2}=formData;
  const onChange=  e=>setFormData({...formData,[e.target.name]:e.target.value});
  const sendRegister=async e =>{
const newUser={name,email,password};
      try{
        const config={
          headers:{ 'Content-Type':'application/json'}
        }
        const body=JSON.stringify(newUser);
        const res=await axios.post('http://127.0.0.1:3001/users',body,config);
        console.log(res.data);
        dispatch(REGISTER_SUCCESS(),res.data)
        localStorage.setItem('token',res.data.token)
       
          navigate("/")
        
      }catch(err){
        console.error(err);
        dispatch(REGISTER_FAIL)
        localStorage.removeItem('token')
      }
  }
  const onSubmit= async e=>{
    e.preventDefault();
    if(password!==password2){
     console.log("unnn mathced passwords",'danger');
    }
    else{
      // register({name,email,password});
      sendRegister()
      console.log("successfuluyy registerd from register  authm component")
      
       
    }
  }

 
  return (
    <Fragment>
    <h1 className ="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form"  onSubmit={e=>onSubmit(e)}  >
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" 
           value={name}
            onChange={(e)=>onChange(e) }
             required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email"  value={email}
            onChange={(e)=>onChange(e) } />
         
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e)=>onChange(e) }
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={(e)=>onChange(e) }
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  )
}

export default Register;
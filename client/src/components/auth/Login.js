
import React , {Fragment,useState} from 'react';
import {useSelector} from "react-redux"
import {Link,Navigate} from 'react-router-dom';
import  {useNavigate}  from 'react-router-dom';

import {  useDispatch } from 'react-redux'
import axios from 'axios';
import { useLocation} from "react-router-dom"
import { LOGIN_FAIL,LOGIN_SUCCESS,LOAD_USER } from '../../features/auth/authSlice';
const Login = (props) => {
  const user = useSelector((state) => state.auth)
  const navigate = useNavigate();

  const [allowrRedirct,setAllowRedirect]=useState(null);
  
  let location = useLocation();
    const dispatch = useDispatch()
  const [formData,setFormData]=useState({
    
    email:'',
    password:'',
   
  });
  const onChange=  e=>setFormData({...formData,[e.target.name]:e.target.value})
  const onSubmit= async e=>{
    
    e.preventDefault(); 
    try{
        const config={
            headers:{ 'Content-Type':'application/json'}
          }
          const body=JSON.stringify({email,password});
          const res=await axios.post('http://127.0.0.1:3001/auth',body,config);
          console.log(res.data);
          
          
          const token1=res.data.token
         const trash= await dispatch(LOGIN_SUCCESS(),res.data)
          
     
          localStorage.setItem('token',res.data.token)
          navigate("/")
          
          

       
    }catch(err){
        console.log(err)
        dispatch(LOGIN_FAIL)
        localStorage.removeItem('token')
    }
    
     
    }
  
  const {name,email,password}=formData;
  
  return (
    <Fragment>
    <h1 className ="large text-primary">Loginn </h1>
      <p className="lead"><i className="fas fa-user"></i> logginnn Your Account</p>
      <form className="form"  onSubmit={e=>onSubmit(e)}  >
        
      
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
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        need have an account? <Link to="/Register">sign up</Link>
      </p>
    </Fragment>
  )
}



export default Login
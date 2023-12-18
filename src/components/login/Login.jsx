import React, { useContext, useState } from 'react'
import './login.css'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const {route ,setLogin ,setEmp ,setLoader}=useContext(AppContext)
    const [email ,setEmail]=useState("")
    const [pass ,setPass]=useState("")
    const history=useNavigate()

    const handleEmail =(e)=>{
        setEmail(e.target.value)
    }

    const handlePass =(e)=>{
        setPass(e.target.value)
    }
    // const handleLogin = async (event) => {
    //     event.preventDefault();
    //     setLoader(true)
      
      
    //     const formData = new FormData();
    //     formData.append('email', email);
    //     formData.append('password', pass);
    //     try {
    //       const response = await fetch(`${route}/auth/login`, {
    //         method: 'POST',
    //         body: formData,
    //       })
    //       .then(res=>res.json())
    //       console.log(response)
    //       setLoader(false)
    //       if (response.status=="Success") {
    //        sessionStorage.setItem("token",response.token)
    //        sessionStorage.setItem("login",true)
    //        setLogin(true)
    //        history("المقالات")
    //       } else {
    //     toast.error("هناك خطأ بكلمة السر أو الأيميل حاول مرة أخري")
        
    //       }
    //     } catch (error) {
    //       console.error(error);
        
    //     }
    //   };

    const handleLogin = async (event) => {
      event.preventDefault();
      setLoader(true)
    
      const formData = new FormData();
      formData.append('id', email);
      formData.append('password', pass);
      try {
        const response = await fetch(`${route}/auth/login`, {
          method: 'POST',
          body: formData,
        })
        .then(res=>res.json())
        console.log(response)
         setLoader(false)
        if (response.status=="Success" && response.user.role === 1) {
         
          sessionStorage.setItem("login",true)
          sessionStorage.setItem("token",response.token)
      
          sessionStorage.setItem("userName",response.user.name)
          sessionStorage.setItem("id",response.user.id)
          sessionStorage.setItem("email",response.user.email)
        
          history("/المنتجات")
          setLogin(true)
        } 
       else if (response.status=="Success" && response.user.role === 2) {
         
          sessionStorage.setItem("login",true)
          sessionStorage.setItem("emp",true)
          sessionStorage.setItem("token",response.token)
      
          sessionStorage.setItem("userName",response.user.name)
          sessionStorage.setItem("id",response.user.id)
          sessionStorage.setItem("email",response.user.email)
        
          history("/المنتجات")
          setEmp(true)
          setLogin(true)
        } 
        
        else {
       toast.error(response.error)
         }
      } catch (error) {
        console.error(error);
      
      }
    };
  return (
   <div className="login">
    <div className="container">
    <form class="form" onSubmit={handleLogin}>
تسجيل الدخول
    <input value={email} onChange={handleEmail} type="text" class="input" placeholder="Email" />
    <input value={pass} onChange={handlePass} type="text" class="input" placeholder="Password" /> 
    <button type='submit'>Submit</button>
</form>
    </div>
   </div>
  )
}

export default Login

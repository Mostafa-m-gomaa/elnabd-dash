import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import './password.css'
const Password = () => {
    const {route ,setLoader ,filesRoute}=useContext(AppContext)
    const [password,setPassword]=useState("")
    const param =useParams()


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true)
        try {
          const response = await fetch(`${route}/admin/changeUserPassword/${param.userId}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
              "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({
                new_password : password
            }),
          })
          .then(res=>res.json());
          setLoader(false)
          console.log(response)
          if (response.status=="success") {
      console.log(response)
      toast.success(response.msg)
   
          } else {
            console.log(response)
            toast.error("هناك خطأ")
          }
        } catch (error) {
       
         
        }
      };
  return (
<div className="password">
    <div className="container">
        <h2>تغيير كلمة السر</h2>
        <label htmlFor="">
            كلمة السر الجديدة
            <input type="text" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleSubmit}>تغيير</button>
        </label>
    </div>
</div>
  )
}

export default Password

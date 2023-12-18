import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import '../Transactions/Transactions.css'


const Vertival = () => {
    const {route ,emp ,setLoader ,filesRoute}=useContext(AppContext)
    const [password,setPassword]=useState("")
    const [hori,setHori]=useState([])
    const [week,setWeek]=useState("")
    const search =()=>{
      setLoader(true)
      fetch(`${route}/transactions/v/${week}`,{
        headers :{
  "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
  },
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        setLoader(false)
        if(data.data){
      setWeek(data.weekNumber)
      setHori(data.data)
        }
      })
    }
    useEffect(()=>{
      fetch(`${route}/transactions/v`,{
        headers :{
  "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
  },
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data.data){
      setWeek(data.weekNumber)
      setHori(data.data)
        }
      })
    },[])

  return (
  <div className="trans">
{emp ? <div>غير مسموح لك بالطلاع علي هذه البيانات</div> :     <div className="container">
      <h2>التحويلات العمودية</h2>
      <label htmlFor="" className='hori-search'>
        ابحث بالاسبوع
        <input  value={week} onChange={(e)=>setWeek(e.target.value)} />
        <button onClick={search}>بحث</button>
      </label>
    <div className="hori">
      {hori.map((arr,index)=>{
        return(
          <div className="period" key={index}>
         <div>amount : {arr.amount}</div>
         <div>from : {arr.sender}</div>
         <div>to: {arr.receiver}</div>
          </div>
        )
      })}

    </div>
    </div>}
  </div>    
  )
}

export default Vertival

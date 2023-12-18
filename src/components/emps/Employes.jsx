import '../categories/categories.css'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Emps = () => {
  const {route ,setLoader ,filesRoute}=useContext(AppContext)
  const [title,setTitle]=useState("")
  const [refresh ,setRefresh]=useState(false)
  const [users,setUsers]=useState([])
  const [showConfirm ,setShowConfirm]=useState(false)
  const [catId,setCatId]=useState("")
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true)

    
    try {
      const response = await fetch(`${route}/auth/createEmployee`, {
        method: 'POST',
        body: JSON.stringify({
            name ,email, password
        }),
        headers:{
          "Authorization" :`Bearer ${sessionStorage.getItem("token")}` ,
            "Content-Type": "application/json"
        }
      })
      .then(res=>res.json());
      setLoader(false)
      if (response.status=="Success") {
  console.log(response)
  toast.success("تمت الأضافة")
  setRefresh(!refresh)
      } 
      else if(response.errors){
toast.error(response.errors.error)
      }
      else {
        console.log(response)
        toast.error("هناك خطأ")
      }
    } catch (error) {
   
     
    }
  };
  const deleteButton =(id)=>{
    setShowConfirm(true)
    setCatId(id)
  }

  const deleteCateg =()=>{
    setLoader(true)
    setShowConfirm(false)
    fetch(`${route}/mcateg/${catId}`,{
      method :"DELETE" ,
      headers :{
        "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setLoader(false)
      if(data.status === "success"){
toast.success("تم الحذف بنجاح")
setRefresh(!refresh)
      }
      else{
        toast.error("لم يتم الحذف")
      }
    })
  }


  useEffect(()=>{
    fetch(`${route}/admin/getBoard`,{
      headers :{
"Authorization" :`Bearer ${sessionStorage.getItem("token")}`
},
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
      if(data.data){
      
        setUsers(data.data)
      }
    })
  },[refresh])

  return (
<div className="categs">
{showConfirm ?   <div className="confirm">
    <div>هل انت متاكد انك تريد حذف هذا ؟</div>
    <div className="btns">
      <button onClick={deleteCateg} className='yes' >Yes</button>
      <button onClick={() => setShowConfirm(false)} className='no'>No</button>
    </div>
  </div> :null}
    <div className="container">
    <div className="add">
          <h1>أضافة موظف</h1>
          <form action="" onSubmit={handleSubmit} >
          <label htmlFor="">
            <input type="text" onChange={(e)=>setName(e.target.value)} />
الاسم
          </label>
          <label htmlFor="">
            <input type="text" onChange={(e)=>setEmail(e.target.value)} />
            الايميل
          </label>
          <label htmlFor="">
            <input type="text" onChange={(e)=>setPassword(e.target.value)} />
            كلمة السر
          </label>
   
       
  


  
            <button type='submit'>أضافة</button>
          </form>

         
        </div>
       <div className="all-categs">
        <h1>الموظفين</h1>
    
        <div className="in-all-categ">
          {users.map((user,index)=>{
            return(
              <div className="user-card" key={index}>
                <div>{user.name} : الاسم</div>
                <div>{user.email} : الايميل</div>
                <div>{user.role === 1 ? "admin" : "employee"} </div>
                {/* <button onClick={() => deleteButton(art.id)}>Delete</button> */}
              </div>
            )
          })}
        </div>

       </div>
    </div>
</div>
  )
}

export default Emps

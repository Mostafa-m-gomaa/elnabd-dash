import './categories.css'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Categories = () => {
  const {route ,setLoader ,filesRoute}=useContext(AppContext)
  const [title,setTitle]=useState("")
  const [refresh ,setRefresh]=useState(false)
  const [users,setUsers]=useState([])
  const [showConfirm ,setShowConfirm]=useState(false)
  const [catId,setCatId]=useState("")
  const [name,setName]=useState("")
  const [current,setCurrent]=useState(1)
  const [total,setTotal]=useState(0)

  const clickButton=(row)=>{
setRefresh(!refresh)
if(row == "next" && current !== total){
  setCurrent(current+1)
}
if(row == "prev" && current !== 1){
  setCurrent(current-1)
}
  }
  const changePage = (e) => {
    if (parseInt(e.target.value) > total || parseInt(e.target.value) < 1) {
      toast.error("لا يوجد هذه الصفحة");
    } else {
      setCurrent(e.target.value);
      setRefresh(!refresh);
    }
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true)

    const formData = new FormData();
    formData.append('title', title);
    try {
      const response = await fetch(`${route}/mcateg`, {
        method: 'POST',
        body: formData,
        headers:{
          "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
        }
      })
      .then(res=>res.json());
      setLoader(false)
      if (response.status=="success") {
  console.log(response)
  toast.success("تمت الأضافة")
  setRefresh(!refresh)
      } else {
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

  const punish = (id)=>{
    setLoader(true)
    fetch(`${route}/admin/punishUser/${id}`,{
      method:"PUT" ,
      headers :{
"Authorization" :`Bearer ${sessionStorage.getItem("token")}`
},
    })
    .then(res=>res.json())
    .then(data=>{console.log(data)
      setLoader(false)
    if(data.status == "success"){
      toast.success(data.msg)
      setRefresh(!refresh)
    }
    else if(data.status == "faild"){
      toast.error(data.msg)
    }
    })
  }
  const unPunish = (id)=>{
    setLoader(true)
    fetch(`${route}/admin/unPunishUser/${id}`,{
      method:"PUT" ,
      headers :{
"Authorization" :`Bearer ${sessionStorage.getItem("token")}`
},
    })
    .then(res=>res.json())
    .then(data=>{console.log(data)
      setLoader(false)
    if(data.status == "success"){
      toast.success(data.msg)
      setRefresh(!refresh)
    }
   else if(data.status == "faild"){
      toast.error(data.msg)
    }
    })
  }
  const search = ()=>{
    setLoader(true)
    fetch(`${route}/admin/searchUser/${name}`,{
      headers :{
"Authorization" :`Bearer ${sessionStorage.getItem("token")}`
},
    })
    .then(res=>res.json())
    .then(data=>{console.log(data)
      setLoader(false)
      if(data.data.length === 0){
        toast.error("لا يوجد وكالات بهذا الاسم")
      }
      if(data.data.length > 0 && data.data){
        setUsers(data.data)
      }
    })
  }

  useEffect(()=>{
    setLoader(true)
    fetch(`${route}/admin/allUsers?page=${current}`,{
      headers :{
    

"Authorization" :`Bearer ${sessionStorage.getItem("token")}`
},
    })
    .then(res=>res.json())
    .then(data=>{
      setLoader(false)
      console.log(data)
      setTotal(data.data.last_page)
      if(data.data.data){
        // console.log(data.data.data)
        setUsers(data.data.data)
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
       <div className="all-categs">
        <h1>الوكالات</h1>
        <label htmlFor="">
          البحث فالوكالات بالاسم
          <input type="text" placeholder='اكتب هنا' onChange={(e)=>setName(e.target.value)} />
          <button onClick={search}>بحث</button>
        </label>
        <div className="in-all-categ">
          {users.map((user,index)=>{
            return(
              <div className="user-card" key={index}>
                <div>{user.name} : الاسم</div>
                <div>{user.id} : الوكالة</div>
                <div>{user.black_list ? <div className='punished'>x</div>: null }</div>
                <div>{user.left_children} : الوكالات علي اليسار</div>
                <div>{user.right_children} : الوكالات علي اليمين </div>
                <div>{user.total_points} : الرصيد</div>
                <div className="btns">
                <Link to={`/edit/${user.id}`}>تعديل </Link>
                <Link to={`/password/${user.id}`}>تعديل كلمة السر </Link>
                <Link to={`/bankPass/${user.id}`}>كلمة سر الخزنة </Link>
                <Link to={`/qasima/${user.id}`}> طباعة القسيمة</Link>
                {/* <Link to={`/trans/${user.id}`}>كشف التحويلات</Link> */}
                <button onClick={()=>punish(user.id)}>عقاب </button>
                <button onClick={()=>unPunish(user.id)}>فك العقاب </button>
               
                </div>
              </div>
            )
          })}
        </div>
<label htmlFor="" className="pagination"> 
<button onClick={()=>clickButton("prev")}>&lt;</button>
<input type="number" value={current} onChange={changePage} />
<div> / {total}</div>
<button onClick={()=>clickButton("next")}>&gt;</button>
</label>
       </div>
    </div>
</div>
  )
}

export default Categories

import './news.css'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
const News = () => {
    const {route ,setLoader ,filesRoute}=useContext(AppContext)
    const [news,setNews]=useState([])
    const [newKey,setNewKey]=useState("")
    const [refresh ,setRefresh]=useState(false)
    const [showConfirm ,setShowConfirm]=useState(false)
    const [artId,setArtId]=useState("")
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true)
    
        const formData = new FormData();
        formData.append('new', newKey);
        try {
          const response = await fetch(`${route}/news`, {
            method: 'POST',
        
            headers:{
              "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            },
            body: formData,
          })
          .then(res=>res.json());
          setLoader(false)
          console.log(response)
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
        setArtId(id)
      }

      const deleteArt =()=>{
        setLoader(true)
        setShowConfirm(false)
        fetch(`${route}/news/${artId}`,{
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
        fetch(`${route}/news`,{
          headers :{
           "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
    },
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.data){
         
           setNews(data.data)
          }
        })
      },[refresh])
  return (
    <div className="news">
        {showConfirm ?   <div className="confirm">
    <div>هل انت متاكد انك تريد حذف هذا ؟</div>
    <div className="btns">
      <button onClick={deleteArt} className='yes' >Yes</button>
      <button onClick={() => setShowConfirm(false)} className='no'>No</button>
    </div>
  </div> :null}
        <div className="container">
            <h2>add news </h2>
            <div className="add-new">
    <form onSubmit={handleSubmit}>
        <label htmlFor="">
            اكتب الخبر
            <input type="text" onChange={(e)=>setNewKey(e.target.value)} />
            <button type='submit'>Add</button>
        </label>
    </form>
            </div>
            <div className="all-news">
<h2>كل الاخبار</h2>
<div className="in-all-news">
    {news.map((ne,index)=>{
        return(
            <div className="new" key={index}> 
            <div>{ne.new}</div>
            <button onClick={()=>deleteButton(ne.id)}>delete</button>
            </div>
        )
    })}
</div>
            </div>
        </div>
    </div>
  )
}

export default News
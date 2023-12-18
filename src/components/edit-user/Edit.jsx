import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import './edit.css'

const Edit = () => {
    const {route ,setLoader,filesRoute}=useContext(AppContext)
    const param =useParams()
    const [show,setShow]=useState(false)
    const [name ,setName]=useState("")
    const [nickName ,setNickName]=useState("")
    const [fatherName ,setFatherName]=useState("")
    const [motherName ,setMotherName]=useState("")
    const [email ,setEmail]=useState("")
    const [gender,setGender]=useState("")
    const [phone,setPhone]=useState("")
    const [inheritor,setInheritor]=useState("")
    const [natNumber,setNatNumber]=useState("")
    const [qid,setQid]=useState("")
    const [amana,setAmana]=useState("")
    const [birthCountry,setBirthCountry]=useState("")
    const [birthCity,setBirthCity]=useState("")
    const [birthStreet,setBirthStreet]=useState("")
    const [birthDay,setBirthDay]=useState("")
    const [birthMonth,setBirthMonth]=useState("")
    const [birthYear,setBirthYear]=useState("")
    const [mDay,setMDay]=useState("")
    const [mMonth,setMMonth]=useState("")
    const [mYear,setMYear]=useState("")
    const [addressCountry,setAddressCountry]=useState("")
    const [addressCity,setAddressCity]=useState("")
    const [addressStreet,setAddressStreet]=useState("")
    const [shippingStreet,setShippingStreet]=useState("")
    const [shippingCountry,setShippingCountry]=useState("")
    const [shippingCity,setShippingCity]=useState("")
    const [idFron,setIdFront]=useState(null)
    const [idBack,setIdBack]=useState(null)
    const [health,setHealth]=useState(null)
    const[bocket,setBocket]=useState("")
    const [productId,setProductId]=useState("")
    const [product,setProduct]=useState([])

    const clickProduct =(id)=>{
        setProductId(id)
        setShow(false)
    }

    const handleFront = (event) => {
        const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setIdFront(file);
    } else {
      setIdFront(null);
    }
    };

    const handleBack = (event) => {
        const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setIdBack(file);
    } else {
      setIdBack(null);
    }
    };
    const handleHealth = (event) => {
        const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setHealth(file);
    } else {
      setHealth(null);
    }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true)
    
        const formData = new FormData();
        if(name){
            formData.append('name', name);
        }
        if(nickName){
            formData.append('nickname', nickName);
        }
        if(fatherName){
             formData.append('father_name', fatherName);
        }
        if(motherName){
            formData.append('mother_name', motherName);
            }
            if(gender){
                formData.append('gender',gender);
            }
            if(email){
                formData.append('email', email);
            }
            if(phone){
                formData.append('phone', phone);
            }
            if(inheritor){
                formData.append('inheritor', inheritor);
            }
            if(natNumber){
                formData.append('national_number', natNumber);
            }
            if(qid){
                formData.append('qid', qid);
            }
            if(amana){
                formData.append('amana', amana);
            }
            if(birthCountry){
                formData.append('birth_country', birthCountry);
            }
            if(birthCity){
                formData.append('birth_city', birthCity);
            }
            if(birthStreet){
                formData.append('birth_street', birthStreet);
            }
            if(birthDay){
                formData.append('b_day', birthDay);
            }
            if(birthMonth){
                formData.append('b_month', birthMonth);
            }
            if(birthYear){
                formData.append('b_year', birthYear);
            }
            if(mDay){
                formData.append('m_day', mDay);
            }
            if(mMonth){
                formData.append('m_month', mMonth);
            }
            if(mYear){
                formData.append('m_year', mYear);
            }
            if(addressCountry){
                formData.append('address_country', addressCountry);
            }
            if(addressCity){
                formData.append('address_city', addressCity);
            }
            if(addressStreet){
                formData.append('address_street', addressStreet);
            }
            if(shippingCountry){
                formData.append('shipping_country', shippingCountry);
            }
            if(shippingCity){
                formData.append('shipping_city', shippingCity);
            }
            if(shippingStreet){
                formData.append('shipping_street', shippingStreet);
            }
            if(idFron){
                formData.append('identity_front', idFron);
            }
            if(idBack){
                formData.append('identity_back', idBack);
            }
            if(health){
                formData.append('healthDoc', health);
            }
            if(productId){
                formData.append('product_id', productId);
            }
            if(bocket){
                formData.append('bocket_password', bocket);
            }
      
    
     
        try {
          const response = await fetch(`${route}/market/updateUser/${param.userId}`, {
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
      toast.success("تم التعديل")
   


          } 
          else  if(response.error === "Token expired"){
            toast.error("قم بتسجيل الخروج و ادخل مرة اخري")
          }
          else  if(response.error){
            toast.error(response.error)
          }
          else  if(response.status === "faild"){
            toast.error(response.msg)
          }
          else {
            console.log(response)
            toast.error("هناك خطأ")
          }
        } catch (error) {
       
        }
      };

    useEffect(()=>{
        fetch(`${route}/admin/getUser/${param.userId}`,{
          headers :{
    "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
    },
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.data){
            console.log(data.data)
            setName(data.data.name)
           
          }
        })
      },[])
      useEffect(()=>{
        fetch(`${route}/product`)
        .then(res=>res.json())
        .then(data=>{
          if(data.data){
            console.log(data.data)
            setProduct(data.data)
          }
        })
      },[])
  return (
    <div className="edit">
         {show ?<div className="products">
        <div className="lay" onClick={()=>setShow(false)} ></div>
        <div className="in-prods">
            {product.map((pr,index)=>{
                return(
                    <div className="pr-card" onClick={()=>clickProduct(pr.id)} key={index}>
                        <div className="title">{pr.title}</div>
                        {pr.images.map((img,index)=>{
                            if(index === 0){

                                return(
                                    <img src={`${filesRoute}/${img.image}`} />
                                )
                            }
                        })}
                        <div className="desc">{pr.desc}</div>
                        <div className="price">{pr.price}</div>
                    </div>
                )
            })}
        </div>

    </div> : null}
        <div className="container">
            <h2>تعديل</h2>
        <form action="" onSubmit={handleSubmit} >
            <label htmlFor="">
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" />
                الاسم
            </label>
            <label htmlFor="">
                <input value={nickName} onChange={(e)=>setNickName(e.target.value)} type="text" />
                النسبة
            </label>
            <label  htmlFor="">
                <input value={fatherName} onChange={(e)=>setFatherName(e.target.value)} type="text" />
                اسم الاب
            </label>
            <label htmlFor="">
                <input value={motherName} onChange={(e)=>setMotherName(e.target.value)} type="text" />
                اسم الام
            </label>
            <label htmlFor="">
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" />
                الايميل
            </label>
            <label htmlFor="">
                <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="text" />
                رقم الهاتف
            </label>
            <label htmlFor="">
               <select name="" id="" onChange={(e)=>setGender(e.target.value)}>
                <option value="">اختر</option>
                <option value="male">ذكر</option>
                <option value="female">أنثي</option>
               </select>
                الجنس
            </label>
            <label htmlFor="">
                <input value={inheritor} onChange={(e)=>setInheritor(e.target.value)} type="text" />
                الوريث
            </label>
            <label htmlFor="">
                <input value={natNumber} onChange={(e)=>setNatNumber(e.target.value)} type="text" />
                الرقم القومي
            </label>
            <label htmlFor="">
                <input value={qid} onChange={(e)=>setQid(e.target.value)} type="text" />
                القيد
            </label>
            <label htmlFor="">
                <input value={amana} onChange={(e)=>setAmana(e.target.value)} type="text" />
                الأمانة
            </label>
            <label htmlFor="">
                <input value={birthCountry} onChange={(e)=>setBirthCountry(e.target.value)} type="text" />
                بلد المنشأ
            </label>
            <label htmlFor="">
                <input value={birthCity} onChange={(e)=>setBirthCity(e.target.value)} type="text" />
                مدينة المنشأ
            </label>
            <label htmlFor="">
                <input value={birthStreet} onChange={(e)=>setBirthStreet(e.target.value)} type="text" />
                شارع المنشأ
            </label>
            <div className="birth-day">
                تاريخ الميلاد
            <div className="inpts">
            <input value={birthDay} onChange={(e)=>setBirthDay(e.target.value)} type="number" placeholder='اليوم' />
                <input value={birthMonth} onChange={(e)=>setBirthMonth(e.target.value)} type="number" placeholder='الشهر'  />
                <input value={birthYear} onChange={(e)=>setBirthYear(e.target.value)} type="number" placeholder='السنة'  />
            </div>
            </div>
            <div className="birth-day">
                تاريخ المنح
            <div className="inpts">
            <input value={mDay} onChange={(e)=>setMDay(e.target.value)} type="number" placeholder='اليوم' />
                <input value={mMonth} onChange={(e)=>setMMonth(e.target.value)} type="number" placeholder='الشهر'  />
                <input value={mYear} onChange={(e)=>setMYear(e.target.value)} type="number" placeholder='السنة'  />
            </div>
            </div>
            <label htmlFor="">
                <input value={addressCountry} onChange={(e)=>setAddressCountry(e.target.value)}  type="text" />
                بلد الاقامة
            </label>
            <label htmlFor="">
                <input value={addressCity} onChange={(e)=>setAddressCity(e.target.value)} type="text" />
                مدينة الاقامة
            </label>
         
            <label htmlFor="">
                <input value={addressStreet} onChange={(e)=>setAddressStreet(e.target.value)} type="text" />
شارع الاقامة            </label>
            <label htmlFor="">
                <input value={shippingCountry} onChange={(e)=>setShippingCountry(e.target.value)} type="text" />
                بلد لشحن
            </label>
            <label htmlFor="">
                <input value={shippingCity} onChange={(e)=>setShippingCity(e.target.value)} type="text" />
                مدينة الشحن
            </label>
            <label htmlFor="">
                <input value={shippingStreet} onChange={(e)=>setShippingStreet(e.target.value)} type="text" />
                شارع الشحن
            </label>
            <label htmlFor="">
                <input type="file" onChange={handleFront} />
               صورة الهوية الأمامية
            </label>
            <label htmlFor="">
                <input type="file" onChange={handleBack} />
                صورة الهوية الخلفيه
            </label>
            <label htmlFor="">
                <input type="file" onChange={handleHealth} />
               صورة الضمان الصحي 
            </label>
   
            <div className="choose" onClick={()=>setShow(true)}>اختر المنتج</div>
            <button type='submit'>تعديل</button>
        </form>

        </div>
    </div>
  )
}

export default Edit

import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import './qasima.css'
import { font } from './alfont_com_arial-1-normal';
import './alfont_com_arial-1.ttf'
import { jsPDF } from "jspdf";
import logo from '../../assets/images/logo.png'
const Qasima = () => {
    const {route ,setLoader ,filesRoute}=useContext(AppContext)
    const [user,setUser]=useState({})
    const [det,setDet]=useState({})
    const [prod,setProd]=useState({})
    const param =useParams()

    const exportReport =  () => {
          const doc = new jsPDF({
            orientation: 'portrait', // 'portrait' or 'landscape' orientation
            unit: 'mm', // Measurement unit (millimeters)
            format: ['280', '300'], // Page size defined by width and height
          });
          doc.addFileToVFS('alfont_com_arial-1.ttf', font);
          doc.addFont('alfont_com_arial-1.ttf', 'alfont_com_arial-1', 'normal');
          doc.setFont("alfont_com_arial-1");
          doc.addImage(logo, 'JPEG' ,8,10,270,130)
          doc.text("قسمية شراء", 125, 30);
          doc.text(`${user.id} `, 125, 50);
          doc.text(`الاسم : ${user.name} `, 170, 50);
          doc.text(`اسم الاب : ${user.father_name} `, 170, 65);
          doc.text(` الرقم القومي : ${det.national_number} `, 170, 80);
          doc.text(` رقم الهاتف : ${det.phone} `, 170, 95);
          doc.text(` المنتج : ${prod.title}`, 170, 110);
    doc.save("mypddf.pdf");};

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
            setUser(data.data)
          }
          if(data.data.details){
            setDet(data.data.details)
          }
          if(data.data.product){
            setProd(data.data.product)
          }
        })
      },[])
  return (
  <div className="qasima">
    <div className="container">
        <h2>قسيمة </h2>
        <div className="in-qasima">
            <div>{user.name} : الاسم</div>
            <div>{user.father_name} : اسم الاب</div>
            <div>{user.nickname} : النسبة</div>
            <div>{user.mother_name} : اسم الام</div>
            <div>{user.id} : الوكالة</div>
            <div>{det.phone} : رقم الهاتف</div>
            <div>{user.email} : الايميل</div>
            <div>{det.address_city} : مدينة السكن</div>
            <div>{det.address_country} : بلد السكن</div>
            <div>{det.address_street} : شارع السكن</div>
            <div>{det.amana} : الامانة</div>
            <div>{det.birth_city} : تاريخ الميلاد</div>
            <div>{det.birth_country} : بلد المنشأ</div>
            <div>{det.birth_street} : شارع المنشأ</div>
            <div>{det.birthday} : تاريخ الميلاد</div>
            <div>{det.created_at} : تم الانشاء</div>
            <div>{det.gender} : النوع</div>
            <div>{det.inheritor} : الوريث</div>
            <div>{det.man7_history} : تاريخ المنح</div>
            <div>{det.national_number} : الرقم القومي</div>
            <div>{det.qid} : القيد</div>
            <div>{det.shipping_city} : مدينة الشحن</div>
            <div>{det.shipping_country} : بلد الشحن</div>
            <div>{det.shipping_street} : شارع الشحن </div>
            <div>{prod.title} : المنتج المطلوب</div>
            <img src={`${filesRoute}/${det.identity_front}`} alt="" />
            <img src={`${filesRoute}/${det.identity_back}`} alt="" />
            <img src={`${filesRoute}/${det.healthDoc}`} alt="" />

        </div>
            <button onClick={exportReport}>طباعة القسيمة</button>
    </div>
  </div>
  )
}

export default Qasima

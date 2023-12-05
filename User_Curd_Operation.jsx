import React, { useEffect, useState } from 'react'
import './User_curd_operation_CSS.css'
import { Header } from './Header/Header'
import { Operation_Screen } from './Operation_Screen/Operation_Screen'
export const User_Curd_Operation = () => {

  const [data,setdata]=useState([]);
  let deletealldata=[];
  const[selectallrow,setselectallrow]=useState(false);
  const [search,setsearch]=useState("");
  const[start,setstart]=useState(true);
  useEffect(()=>{
    if(start){setstart(false);
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json").then(res=>res.json()).then(d=>setdata(d));
    }
  });

  

  return (
    <div className='Main_curd_div_panel'>
          <Header  deletealldata={deletealldata} search={search} setsearch={setsearch}  selectallrow={selectallrow} setdata={setdata} data={data}/>
          <Operation_Screen data={data} setdata={setdata} deletealldata={deletealldata} search={search} selectallrow={selectallrow} setselectallrow={setselectallrow}/>
          
</div>
  )
}

import React, { useEffect } from 'react'
import './Header_CSS.css'
import delete_icon from '../Images/delete_icon.png'
export const Header = ({search,setsearch,deletealldata,selectallrow,setdata, data}) => {
 useEffect(()=>{
  console.log(deletealldata);
 })

function setdeletealldata(){

  setdata(data.filter((x)=>{
   if(!deletealldata.includes(x.id)) return x;
  }));

}
  return (
    <div className='Header_panel'>
          <div className='header_align'>
                    <h2>Team Database</h2>
                    <input type="search" name="search" id="search" placeholder='Search' value={search} onChange={(e)=>setsearch(e.target.value)} />
          </div>
          <div className='operation_'>
          <img src={delete_icon} width={'25px'} height={'25px'} onClick={()=>{setdeletealldata()}}></img> <font>Delete All</font>
          </div>

    </div>
  )
}

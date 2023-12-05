import React, { useEffect, useState } from 'react'
import './Operation_Screen_CSS.css'
import update_icon from '../Images/update_icon.png'
import delete_icon from '../Images/delete_icon_blue_color.png'
import left_icon from '../Images/left_icon.png'
import right_icon from '../Images/right_icon.png'
export const Operation_Screen = ({data,setdata,deletealldata,search,selectallrow,setselectallrow}) => {
          const [page_no,setpageno]=useState(1);
          const[start_index,setstart_index]=useState(1);
          const[end_index,setend_index]=useState(10);
          const[update_handle,setupdatehandle]=useState(false);
         const[id_update,setid_update]=useState(0);
         const[name_update,setnameupdate]=useState("");
         const[email,setemailupdate]=useState("");
         const[role,setroleupdate]=useState("");
         const[perticular_row_delete,setperticularrow_delete]=useState(false);
      
     
      
         


function next_page(){
          if(page_no+1<=parseInt(data.length/10)+1){
                    setpageno(page_no+1);
                    setstart_index(start_index+10);
                    setend_index(end_index+10);
          }
          
}
function pervious_page(){
          if(page_no-1!=0){
                    setpageno(page_no-1);
                    setstart_index(start_index-10);
                    setend_index(end_index-10);
          }
}


function handle_delete(e){
          setdata(data.filter((x)=>x.id!==e.id));
        }

        async function handlealldelete(){ 
          if(selectallrow){setselectallrow(false);
            const checkboxes=document.querySelectorAll(".checkbox");
            checkboxes.forEach(element => {
              element.checked=false;
              data.map((x)=>{
                deletealldata.splice(deletealldata.indexOf(x.id), 1);
              });
            });
          }
          else {setselectallrow(true);
            const checkboxes=document.querySelectorAll(".checkbox");
            checkboxes.forEach(element => {
              element.checked=true;

            });
            await data.map((x)=>{deletealldata.push(x.id); });
          }
          
}

function handle_update(e){
  setupdatehandle(false);
  setid_update(0);
  setupdatehandle(true);
  setid_update(e.id);
 
}

async function save_update(e){
  setupdatehandle(false);
   setid_update(0);
    await setdata(data.filter((x)=>{
            if(x.id==id_update){
                x.name=(name_update.trim())?name_update:e.name;
                x.email=(email.trim())?email:e.email;
                x.role=(role.trim())?role:e.role; 
                return x
          } 
      return x
    }));
    setnameupdate("");
    setemailupdate("");
    setroleupdate("");
  
}
      function handleperticulardelete(e){
        //seleteing a perticular row data and save it in deleteall data
        setperticularrow_delete(!perticular_row_delete);
        if(document.getElementById(`selectrow${e.id}`).checked==true){
          document.getElementById(`selectrow${e.id}`).checked=true;
          deletealldata.push(e.id);
        }else {
          document.getElementById(`selectrow${e.id}`).checked=false;
          deletealldata.splice(deletealldata.indexOf(e.id), 1);
        }
       
      }    

  return (
    <div>
          <table className='data_table' >
                    <thead>
                              <th>
                              <input type="checkbox" name="selectall" id="selectall" onClick={handlealldelete}/>
                              <font> Selected</font>
                              </th>
                              <th><font className='change_color'>Id</font></th>
                              <th><font className='change_color'>Name</font></th>
                              <th><font className='change_color'>Email</font></th>
                              <th><font className='change_color'>Role</font></th>
                    </thead>
                    <tbody>
                              
                              {
                              
                              (search!="")?
                              data
                              .filter((x)=>x.name.toLowerCase().includes(search.toLowerCase()))
                              .map((x)=>{
                                        return(
                                          <tr key={x.id}>
                                              <td><input type="checkbox" name="selectrow" className={'checkbox'}  id={`selectrow${x.id}`} onClick={()=>handleperticulardelete(x)}/></td>
                                           {(update_handle && x.id==id_update)?
                                          <><td>{x.id}</td>
                                          <td><input type="text"   value={(name_update)?name_update:x.name}id='row_input' onChange={(e)=>{setnameupdate(e.target.value)}}/></td>
                                          <td><input type="text"   value={(email)?email:x.email}id='row_input'onChange={(e)=>{setemailupdate(e.target.value)}}/></td>
                                          <td><input type="text"   value={(role)?role:x.role}id='row_input'onChange={(e)=>{setroleupdate(e.target.value)}}/></td>
                                          </>
                                          :<><td>{x.id}</td>
                                          <td>{x.name}</td>
                                          <td>{x.email}</td>
                                          <td>{x.role}</td>
                                          </>
                                          }
                                        <td>
                                        <img src={update_icon} width={'30px'} height={'30px'}  onClick={()=>handle_update(x)}></img>
                                                <img src={delete_icon} width={'30px'} height={'30px'}  onClick={()=>handle_delete(x)}></img>
                                               {(update_handle && x.id==id_update)?<button onClick={()=>save_update(x)}>Save</button>:<></>}
                                          </td>
                                </tr>
                                        )})
                              :
                              data
                              .filter((x)=>{if((x.id<=end_index && x.id>=start_index))return x})
                              .map((x)=>{
                                        return(
                                                  <tr key={x.id}>
                                                            <td><input type="checkbox" name="selectrow" className={'checkbox'}  id={`selectrow${x.id}`} onClick={()=>handleperticulardelete(x)}/></td>
                                                            {(update_handle && x.id==id_update)?
                                                            <><td>{x.id}</td>
                                                            <td><input type="text"   value={(name_update)?name_update:x.name}id='row_input' onChange={(e)=>{setnameupdate(e.target.value)}}/></td>
                                                            <td><input type="text"   value={(email)?email:x.email}id='row_input'onChange={(e)=>{setemailupdate(e.target.value)}}/></td>
                                                            <td><input type="text"   value={(role)?role:x.role}id='row_input'onChange={(e)=>{setroleupdate(e.target.value)}}/></td>
                                                            </>
                                                            :<><td>{x.id}</td>
                                                            <td>{x.name}</td>
                                                            <td>{x.email}</td>
                                                            <td>{x.role}</td>
                                                            </>
                                                            }
                                                          <td>
                                                          <img src={update_icon} width={'30px'} height={'30px'}  onClick={()=>handle_update(x)}></img>
                                                                  <img src={delete_icon} width={'30px'} height={'30px'}  onClick={()=>handle_delete(x)}></img>
                                                                 {(update_handle && x.id==id_update)?<button onClick={()=>save_update(x)}>Save</button>:<></>}
                                                            </td>
                                                  </tr>
                                        )})}
                    </tbody>
          </table>
          

          <div className='naviation_panel'>
                    <div className='navigation_button'>
                    <img src={left_icon} alt=""  width={'30px'} height={'30px'} onClick={pervious_page}/>
                    {page_no}
                    <img src={right_icon}  width={'30px'} height={'30px'} onClick={next_page} ></img></div>
          </div>


    </div>
  )
}

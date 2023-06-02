import React, { useTransition } from 'react'
import { useEffect, useState } from 'react'
import './assignment.css'
import axios from 'axios'
import { type } from '@testing-library/user-event/dist/type'
import logo_edit from '../../image/edit.png'
import logo_delete from '../../image/delete.png'
import logo_edit2 from '../../image/edit-text.png'
import logo_comment from '../../image/comment.png'
import logo_add_workspace from '../../image/add.png'
const Assignment = () => {
    const [listofWorkspace,setListWorkspace] = useState([])
    const [listofWork,setListWork] = useState([])
    const [showPriority,setShowPriority] = useState(false)
    const [showButtonEdit,setShowButtonEdit] = useState(false)
    const [workSpaceId, setWorkSpaceId] = useState(0);
    const [workId, setworkId] = useState(0);
    const [formAddWork,setformAddWork] = useState(false);
    const [formChangeWorkspace, setFormChangeWorkspace] = useState(false);
    // const [PriorityRes, setPriorityRes] = useState(1);
    const [listofId,setListOfId] = useState([]);
    const input_name_element = document.querySelector('.input_name input');
    const input_description_element = document.querySelector('.input_description input');
    const due_date_element = document.querySelector('.due_date input');
    const l = 100;
    const arr = Array(l).fill(false);
    var count = -1;
    useEffect(()=>{
        axios.get(`http://localhost:8080/api/workspace?user_id=1`)
            .then((response)=>{
                setListWorkspace(response.data.data)
                
            })
        axios.get("http://localhost:8080/api/work")
            .then((response)=>{
                setListWork(response.data)
            })
        
    }, [])
    function openFormAddTask(a){
      setformAddWork(!formAddWork)
      setWorkSpaceId(a);
      setShowPriority(false)
      setShowButtonEdit(false)
    }
   
    function handleDelete(work_id){
      const newListWork = [];
      for(let i=0;i<listofWork.length;i++){
        if(listofWork[i].id!==work_id){
          newListWork.push(listofWork[i]);
        }
      }
      setListWork(newListWork);
      const id = work_id
      axios.delete(`http://localhost:8080/api/work/${work_id}`)
      .then((response)=>{
        alert("delete success");
        console.log(response)
      })
      .catch((error)=>{
        alert("fail really fail")
      });
      
    }
    function handleEdit_workspace(workspace_id){
      setWorkSpaceId(workspace_id);
      setFormChangeWorkspace(!formChangeWorkspace);
      const input_element = document.querySelector(".input_rename_workspace");
      for(let i = 0;i<listofWorkspace.length;i++){
        if(listofWorkspace[i].id ===workspace_id){
          input_element.value = listofWorkspace[i].name;
        }
      }
    }
    function cancel_rename_workspace(){
     
      setFormChangeWorkspace(!formChangeWorkspace)
    }
    function handleDelete_workspace(workspace_id){
      const newlistOfWorkspace = [];
      for(let i=0;i<listofWorkspace.length;i++){
        if(listofWorkspace[i].id !== workspace_id){
          newlistOfWorkspace.push(listofWorkspace[i]);
        }
      }
      setListWorkspace(newlistOfWorkspace);
      axios.delete(`http://localhost:8080/api/workspace/${workspace_id}`)
      .then((response)=>{
        console.log(response);
      })
      .catch((error)=>{
        console.log(error);
      })
    }
    function handleEdit(work_id){
      setformAddWork(true);
      setShowButtonEdit(true);
      setworkId(work_id)
      for(let i=0;i<listofWork.length;i++){
        if(listofWork[i].id ===work_id){
          document.querySelector('.input_name input').value = listofWork[i].name;
          document.querySelector('.input_description input').value = listofWork[i].description;
          document.querySelector('.due_date input').value = listofWork[i].due_date.slice(0, 16);
          
        }
      }
      
    }
    function handle_show_work(a){
      const workSpace_element = document.getElementById(a);
      
      if(arr[a]){
        arr[a] = false;
        workSpace_element.style.display = "none";
      }
      else{
        arr[a] = true;
        workSpace_element.style.display = "block"
      }
     // workSpace_element.style.display = arr[a].toString();
      
    }
    function saveEditWorkspace(workspace_id){
      
      const newlistofworkspace = listofWorkspace;
      const name = document.querySelector(".input_rename_workspace").value;
      for(let i = 0;i<listofWorkspace.length;i++){
        if(listofWorkspace[i].id == workspace_id){
          newlistofworkspace[i].name = name;
        }
      }
      
     
      setListWorkspace(newlistofworkspace);
      const updateWorkspace = {
        id: workspace_id,
        name: name,
        
      }
      setFormChangeWorkspace(!formChangeWorkspace)
      axios.put(`http://localhost:8080/api/workspace/${workspace_id}`,updateWorkspace)
          .then((response)=>{
            console.log(response);
          })
          .catch((error)=>{
            console.log("error edit")
          })
    }
    function saveEdit(work_id){
      const newListWork = listofWork;
      
      let name,description,due_date,workspace_id,isDone;
      for(let i=0;i<listofWork.length;i++){
        if(listofWork[i].id === work_id){
          console.log("mai dinh cong")
           
          newListWork[i].name = input_name_element.value;
          name = input_name_element.value;
          newListWork[i].description = input_description_element.value;
          description = input_description_element.value;
          newListWork[i].due_date = due_date_element.value;
          due_date = due_date_element.value;
          newListWork[i].workspace_id = listofWork[i].workspace_id;
          workspace_id = listofWork[i].workspace_id;
          newListWork[i].isDone = listofWork[i].isDone;
          isDone = listofWork[i].isDone;
          
          break;
        }
      }
        
        setListWork(newListWork);
        
        setformAddWork(false)
        const updateWork = {
          id: work_id,
          name: name,
          // description: newListWork[cnt].description,
          due_date: due_date,
          isDone: isDone,
          
          // description: newListWork[cnt].description,
          workspace_id:workspace_id,
         
        }
        
        axios.put(`http://localhost:8080/api/work/${work_id}`,updateWork)
          .then((response)=>{
            console.log(response);
          })
          .catch((error)=>{
            console.log("error edit")
          })
      
    }
    const onSubmit = (event)=>{
      event.preventDefault();
      // checkPriority();
      // setShowPriority(false)
      const {name, description,dueDate} = event.target;     
      axios.post("http://localhost:8080/api/work", {
        name: name.value,
        description:description.value,
        due_date: dueDate.value,
        workspace_id: workSpaceId
    })
      
      .then((response) => {
        console.log(response);
    });
   // window.location.href = "http://localhost:3000/trangchu/assignment"
   const newWork = {
    //id: Math.random(), // generate a unique ID for the new work
    name: name.value,
    description: description.value,
    due_date: dueDate.value,
    workspace_id: workSpaceId,
    isDone: false
  };
    
    const newListOfWorks = [...listofWork, newWork];
    setListWork(newListOfWorks);
    openFormAddTask();
    document.querySelector('.input_name input').value = "";
    document.querySelector('.input_description input').value = "";
    document.querySelector('.due_date input').value = "";
    // openFormPriority(false)
  }
  const onSubmit_workspace = (event)=>{
    event.preventDefault();
    const {name} = event.target;
    axios.post("http://localhost:8080/api/workspace", {
        name: name.value,
        user_id: 1,
    })
      
      .then((response) => {
        console.log(response);
    });
    const new_workspace = {
      name: name.value,
      user_id: 1
    }
    const newlistOfWorkspace = [...listofWorkspace,new_workspace];
    setListWorkspace(newlistOfWorkspace);
  }
  return (
  <div className='container_workspace'>
    <div className='icon_add_workspace'>
      <div> <img src={logo_add_workspace}></img></div>
      
      <div className='form_add_workspace'>
        <form onSubmit={onSubmit_workspace} method='post'>
          <div className='input_name_workspace'>
            <input required name='name' type='text' placeholder='enter the name of workspace'/>
          </div>
          <div className='button_add_workspace'>
            <button>Add workspace</button>
          </div>
        </form>
      </div>
    </div>
    
    <div className='workspace_screen'>
      {
        listofWorkspace.map((value1,key)=>{
            return (
                <div   className='workspace_item'>
                  <div onClick={()=>handle_show_work(value1.id)} className='div_workspace_name' >
                    <div className='div_p_workspace_name'>
                      <p className='workspace_name'>{value1.name}</p>
                      
                    </div>
                    <div className='workspace_item_listen'>
                      <div className='workspace_item_edit' onClick={()=>{handleEdit_workspace(value1.id)}}>
                        <img src = {logo_edit2}></img>
                      </div>
                      <div className='workspace_item_delete' onClick={()=>{handleDelete_workspace(value1.id)}}>
                        <img src = {logo_delete}></img>
                      </div>
                    </div>
                    
                  </div>
                  <div id={value1.id} className='div_work_item' style={{display:"none"}}>{listofWork.map((value2,key)=>{
                    if(value2.workspace_id === value1.id)
                      return (
                        //neu có sai thì tại xóa value.id
                        <div  id = 'a' className='work_item'> 
                          <div>
                            <button className="task_checkbox"  >
                              <svg width="24" height="18" aria-checked="false"><path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path></svg>
                            </button>
                          </div>
                          <div><p className='work_name'>{value2.name}</p></div>
                          <div className='work_item_listen'>
                            <div className='work_item_edit' onClick={()=>{handleEdit(value2.id)}}>
                              <img src = {logo_edit2}></img>
                            </div>
                            <div className='work_item_delete' onClick={()=>{handleDelete(value2.id)}}>
                              <img src = {logo_delete}></img>
                            </div>
                            <div className='work_item_comment'>
                              <img src = {logo_comment}></img>
                            </div>
                            
                          </div>
                        </div>
                        )
                  })}
                  
                  </div> 
                  <div  id= {value1.id} className='add_task'>
                    <div className='div_button_add_task' onClick={()=>openFormAddTask(value1.id)}>
                      <button type="button" data-add-task-navigation-element="true" className="button_add_task">
                        <span className="icon_add" aria-hidden="true"><svg width="13" height="13"><path d="M6 6V.5a.5.5 0 011 0V6h5.5a.5.5 0 110 1H7v5.5a.5.5 0 11-1 0V7H.5a.5.5 0 010-1H6z" fill="currentColor" fillRule="evenodd"></path></svg>
                      </span>Add task</button>
                    </div>
                    
                  </div>   
                </div>
                
            )
        })
      }
    </div>
    <div style={{ display: formAddWork ? "block" : "none" }} className='form_add_task' >
      <form onSubmit={onSubmit} method='post'>
        <div className='form_header'>
          <div className='input_name'>
            <input required name='name' type='text' placeholder='Task name'></input>
          </div>
          <div className='input_description'>
            <input required name='description' type='text' placeholder='Description'></input>
          </div>
          <div className='set_infor'>
            <div  className='due_date'>

            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="no_due_date"><path fill="currentColor" d="M12 2a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h8zm0 1H4a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1zm-1.25 7a.75.75 0 110 1.5.75.75 0 010-1.5zm.75-5a.5.5 0 110 1h-7a.5.5 0 010-1h7z"></path></svg>
                              <p>Due date</p> */}
              <input required name='dueDate' type='datetime-local' />
            </div>
            {/* <div className='priority' onClick={openFormPriority}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="Gw1i-E3" data-icon-name="priority-icon" data-priority="4"><path fillRule="evenodd" clipRule="evenodd" d="M2 3a.5.5 0 01.276-.447C3.025 2.179 4.096 2 5.5 2c.901 0 1.485.135 2.658.526C9.235 2.885 9.735 3 10.5 3c1.263 0 2.192-.155 2.776-.447A.5.5 0 0114 3v6.5a.5.5 0 01-.276.447c-.749.375-1.82.553-3.224.553-.901 0-1.485-.135-2.658-.526C6.765 9.615 6.265 9.5 5.5 9.5c-1.08 0-1.915.113-2.5.329V13.5a.5.5 0 01-1 0V3zm1 5.779v-5.45C3.585 3.113 4.42 3 5.5 3c.765 0 1.265.115 2.342.474C9.015 3.865 9.599 4 10.5 4c1.002 0 1.834-.09 2.5-.279v5.45c-.585.216-1.42.329-2.5.329-.765 0-1.265-.115-2.342-.474C6.985 8.635 6.401 8.5 5.5 8.5c-1.001 0-1.834.09-2.5.279z" fill="currentColor"></path></svg>
                              <p>Priority</p>
            </div> */}
          </div>
        </div>
        <div className='form_footer'>
          <div className='Cancel'>
            <button type='reset' onClick={openFormAddTask}>Cancel</button>
          </div>
          <div className='add_work' style = {{display:showButtonEdit?"none":"block"}}>
            <button type='submit'>Add Work</button>
          </div>
          <div className='save_edit_work' style={{display: showButtonEdit? "block":"none"}} onClick={()=>{saveEdit(workId)}}>
            <button type="button">Save</button>
          </div>
        </div>
        </form>
      </div>
      <div style={{display: formChangeWorkspace?"block": "none"}} className='form_change_workspace'>
          <form method='post'>
            <div className='title_rename'>
              <p>Rename workspace</p>
            </div>
            <div className='rename_workspace'>
              <input className='input_rename_workspace' />
            </div>
            <div className='button_workspace_rename'>
              <div className='save_rename_workspace'>
                <button type='button' onClick={()=>saveEditWorkspace(workSpaceId)} className='button_rename_workspace'>Rename</button>
              </div>
              <div className='cancel_rename_workspace'>
               <button type='reset' onClick={cancel_rename_workspace}>Cancel</button>
              </div>
            </div>
            
          </form>
      </div>
  </div>
  )
}

export default Assignment

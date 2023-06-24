import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './work.css'
import icon_exit from "../../image/cross.png"
import _ from 'lodash';
const Work = () => {
  const {workspace_id} = useParams();
  const [listWork,setListWork] = useState([])
  const [showFormDeleteWorkspace, setShowDeleteWorkspace] = useState(false)
  const [showFormChangeWorkspace, setShowFormChangeWorkspace] = useState(false);
  const [showFormDeleteWork,setShowFormDeleteWork] = useState(false);
  const [showFormChangeWork, setShowFormChangeWork] = useState(false);
  const [selectWork,setSelectWork] = useState('');//take the id of the work that we want to change or delete
  const [showFormAddWork,setShowFormAddWork] = useState(false);
  const [showSort, setShowSort] = useState(false);

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/work?workspace_id=${workspace_id}`)
        .then((response)=>{
            setListWork(response.data.data)
        })
    
},[])
const handle_prevent_spread = (event)=>{
  event.stopPropagation();
}
const Handel_HideDelete = ()=>{
  setShowDeleteWorkspace(false)
  setShowFormDeleteWork(false);
}
const handle_showDeleteWorkspace = ()=>{
  setShowDeleteWorkspace(true)
}
const handle_showDeleteWork = (work_id)=>{
  setShowFormDeleteWork(true)
  setSelectWork(work_id)
}
const handle_showChangeWork = (work_id,work_name,work_date)=>{
  for(let i = 0;i<listWork.length;i++){
    if(listWork[i].id === work_id){
      document.querySelector(".form_changeWork .input2_name input").value = listWork[i].name;
      document.querySelector(".form_changeWork .due_date2 input").value = listWork[i].due_date.slice(0,16)
    }
  }
  // const element_nameWork = document.querySelector(".form_changeWork .input2_name input");
  // const element_dateWork = document.querySelector(".form_changeWork .due_date2 input").slice(0, 16);
  // element_nameWork.value = work_name;
  // element_dateWork.value = work_date;
  setSelectWork(work_id)
  setShowFormChangeWork(true)
}
const handle_hideChangeWork = ()=>{
  setShowFormChangeWork(false);
}
function cancel_rename_workspace(){
     
  setShowFormChangeWorkspace(false);
}
const showChangeWorkspace = ()=>{
  setShowFormChangeWorkspace(true)
}
const handel_deleteWorkspace = ()=>{
  axios.delete(`http://localhost:8080/api/workspace/${workspace_id}`)
      .then((response)=>{
        console.log(response);
      })
      .catch((error)=>{
        console.log(error);
      })
      window.location = "http://localhost:3000/trangchu"
}
const handle_SaveEditWork = (event)=>{
  const work_id = selectWork;
  const work_name = document.querySelector(".form_changeWork .input2_name input").value 
  const work_date = document.querySelector(".form_changeWork .due_date2 input").value
  const newListWork = listWork;
  let isDone;
  for(let i = 0;i<listWork.length;i++){
    if(listWork[i].id === work_id){
      newListWork[i].name = work_name;
      newListWork[i].due_date = work_date;
      isDone= listWork[i].completed;
      break;
    }
  }
  setListWork(newListWork);
  const updateWork = {
    id: work_id,
    name:work_name,
    due_date: work_date,
    completed: isDone,
    workspace_id:workspace_id
  }
  
  axios.put(`http://localhost:8080/api/work/${work_id}`,updateWork)
  .then((response)=>{
    console.log(response);
  })
  .catch((error)=>{
    console.log("error edit")
  })
  setShowFormChangeWork(false)
}
const handle_showFormAddWork = ()=>{
  setShowFormAddWork(true)
}
const handle_hideFormAddWork = ()=>{
  setShowFormAddWork(false);
}
function saveEditWorkspace(workspace_id){

  const name = document.querySelector(".input_rename_workspace").value;
  const updateWorkspace = {
    id: workspace_id,
    name: name,
    
  }
  setShowFormChangeWorkspace(false);
  axios.put(`http://localhost:8080/api/workspace/${workspace_id}`,updateWorkspace)
      .then((response)=>{
        console.log(response);
      })
      .catch((error)=>{
        console.log("error edit")
      })
}
const handleAddWork = (event)=>{
  event.preventDefault();
  const {name, description,dueDate} = event.target;     
      axios.post("http://localhost:8080/api/work", {
        name: name.value,
        due_date: dueDate.value,
        workspace_id: workspace_id
    })
      
      .then((response) => {
        console.log(response);
    });
   // window.location.href = "http://localhost:3000/trangchu/assignment"
   const newWork = {
    //id: Math.random(), // generate a unique ID for the new work
    name: name.value,
    
    due_date: dueDate.value,
    workspace_id: workspace_id,
    isDone: false
  };
    
    const newListOfWorks = [...listWork, newWork];
    setListWork(newListOfWorks);

    document.querySelector('.input_name input').value = "";
    document.querySelector('.input_description input').value = "";
    document.querySelector('.due_date input').value = "";
    handle_hideFormAddWork();
    // openFormPriority(false)
}
function handleDeleteWork(work_id){
  const newListWork = [];
  for(let i=0;i<listWork.length;i++){
    if(listWork[i].id!==work_id){
      newListWork.push(listWork[i]);
    }
  }
  setListWork(newListWork);
 
  axios.delete(`http://localhost:8080/api/work/${work_id}`)
  .then((response)=>{
    setShowFormDeleteWork(false);
    console.log(response)
  })
  .catch((error)=>{
    alert("fail really fail")
  });
  
}

const openShowSort = (event)=>{
  event.stopPropagation();
  setShowSort(true);
}
const hideShowSort = ()=>{
  setShowSort(false);
}
function compareDueDate(task1, task2) {
  const date1 = new Date(task1.due_date);
  const date2 = new Date(task2.due_date);
  
  return date1 - date2;
}
const sortToDue_date = ()=>{
  
  
  const sortWork = [...listWork].sort(compareDueDate)
  setListWork(sortWork)
  setShowSort(false)
}
function compareName(task1,task2){
  const name1 = task1.name;
  const name2 = task2.name;
  return name1.localeCompare(name2);
}
const sortToName = ()=>{
  const sortWork = [...listWork].sort(compareName);
  setListWork(sortWork)
  setShowSort(false)
}
  return (
    <div className='work_in_workspace_container' onClick={hideShowSort}>
      <div className='work_header'>
        <div className='sortWork'>
          <div className='to_sort' onClick={openShowSort}>
            <div className='hmmm'><svg class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.35 7.35L5 4.71V16.5a.5.5 0 001 0V4.7l2.65 2.65a.5.5 0 00.7-.7l-3.49-3.5A.5.5 0 005.5 3a.5.5 0 00-.39.18L1.65 6.65a.5.5 0 10.7.7zm15.3 5.3L15 15.29V3.5a.5.5 0 00-1 0v11.8l-2.65-2.65a.5.5 0 00-.7.7l3.49 3.5a.5.5 0 00.36.15.5.5 0 00.39-.18l3.46-3.47a.5.5 0 10-.7-.7z" fill="currentColor"></path></svg></div>
            <div className='hnnn'><p>Sort</p></div>
          </div>
          
          <div className='chooseSort' style={{display:showSort?"block":"none"}} onClick={handle_prevent_spread}>
            <div className='sort_title'><p>Sort by</p></div>
            <div className='sort_Due_date' onClick={sortToDue_date}>
              <div className='icon_dueDate hmmm'><svg class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" focusable="false"><path d="M7 11a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm4-5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h9a2.5 2.5 0 002.5-2.5v-9zM4 7h12v7.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 014 14.5V7zm1.5-3h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4z" fill="currentColor"></path></svg></div>
              <div className='hnnn'><p>Due Date</p></div>
            </div>
            <div className='sort_alphabet' onClick={sortToName}>
              <div className='icon_alphabet hmmm'><svg class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" focusable="false"><path d="M2.35 7.35L5 4.71V16.5a.5.5 0 001 0V4.7l2.65 2.65a.5.5 0 00.7-.7l-3.49-3.5A.5.5 0 005.5 3a.5.5 0 00-.39.18L1.65 6.65a.5.5 0 10.7.7zm15.3 5.3L15 15.29V3.5a.5.5 0 00-1 0v11.8l-2.65-2.65a.5.5 0 00-.7.7l3.49 3.5a.5.5 0 00.36.15.5.5 0 00.39-.18l3.46-3.47a.5.5 0 10-.7-.7z" fill="currentColor"></path></svg></div>
              <div className='hnnn'><p>Alphabetically</p></div>
            </div>
          </div>
        </div>
        <div className='work_title'>
          <h2>name_workspace</h2>  
        </div>
        
          
        <div className='work_header_right1'>
          
          <div className='work_header_edit' onClick={showChangeWorkspace}>
            
            <div className='hmmm'><svg width="24" height="24"><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z"></path><path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z"></path></g></svg></div>  
            <div className='hnnn'><p>Edit</p></div>
          </div>
          <div className='work_header_delete' onClick={handle_showDeleteWorkspace}>
            
            <div className='hmmm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 008 19.5h8a1.5 1.5 0 001.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0014 3.5h-4A1.5 1.5 0 008.5 5v1.5z"></path></g></svg></div>  
            <div className='hnnn'><p>Delete</p></div>
          </div>
        </div>
      </div>
      <div className='work_content'>
        {
          listWork.map((value1, key) => {
          return (
            <div  className='work_item' >
              <div className='check_box_work'>
                <button className="work_checkbox"  >
                  <svg width="24" height="18" aria-checked="false"><path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path></svg>
                </button>
              </div>
              <div className='work_infor'>
                <div className='name_work_item'>
                  <p>{value1.name}</p>
                </div>
                
                <div className='date_work'>
                  <p>{value1.due_date}</p>
                </div>

              </div>
              <div className='fix_work_item'>
                <div className='work_item_edit' onClick={()=>{handle_showChangeWork(value1.id,value1.name,value1.due_date)}}>
                  <div className='hmmm'><svg width="24" height="24"><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z"></path><path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z"></path></g></svg></div>  
                 
                </div>
                <div className='work_item_delete' onClick={()=>{handle_showDeleteWork(value1.id)}}>            
                  <div className='hmmm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 008 19.5h8a1.5 1.5 0 001.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0014 3.5h-4A1.5 1.5 0 008.5 5v1.5z"></path></g></svg></div>  
                 
                </div>
              </div>
                    
            </div>
          )
        })
      }
      <div class="button_add_task_project" onClick={handle_showFormAddWork}><button type="button" data-add-task-navigation-element="true" class="button_add_task"><span class="icon_add" aria-hidden="true"><svg width="13" height="13"><path d="M6 6V.5a.5.5 0 011 0V6h5.5a.5.5 0 110 1H7v5.5a.5.5 0 11-1 0V7H.5a.5.5 0 010-1H6z" fill="currentColor" fill-rule="evenodd"></path></svg></span>Add work</button></div>
      </div>

      {/* Form add work */}
      <div className='screen_cover' style={{display:showFormAddWork?"block":"none"}} onClick={handle_hideFormAddWork}>
      <div  className='form_add_task' onClick={handle_prevent_spread}>
      <form  method='post' onSubmit={handleAddWork}>
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
            
          </div>
        </div>
        <div className='form_footer'>
          <div className='Cancel'>
            <button type='reset' onClick={handle_hideFormAddWork}>Cancel</button>
          </div>
          <div className='add_work' >
            <button type='submit' >Add Work</button>
          </div>
          
        </div>
        </form>
      </div>
      </div>
      {/* Form add work */}
      {/* ---------------------------------------------------- */}
      {/* Form change work */}
      <div className='cover_screen' style={{display:showFormChangeWork?"block":"none"}} onClick={handle_hideChangeWork}>
        <div  className='form_changeWork' onClick={handle_prevent_spread}>
          <form  method='post'>
            <div className='changeWorkTitle'>Edit Work</div>
            <div className='formChangeWork_header'>
              <div className='input2_name'>
                <input required name='name' type='text' placeholder='Task name'></input>
              </div>
              
              <div className='set_infor2'>
                <div  className='due_date2'>

                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="no_due_date"><path fill="currentColor" d="M12 2a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h8zm0 1H4a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1zm-1.25 7a.75.75 0 110 1.5.75.75 0 010-1.5zm.75-5a.5.5 0 110 1h-7a.5.5 0 010-1h7z"></path></svg>
                                  <p>Due date</p> */}
                  <input required name='dueDate' type='datetime-local' />
                </div>
                
              </div>
            </div>
            <div className='form_footer'>
              <div className='Cancel_changeWork' onClick={handle_hideChangeWork}>
                <button type='reset' >Cancel</button>
              </div>
              <div className='Save_ChangeWork' onClick={handle_SaveEditWork}>
                <button type='button' >Save</button>
              </div>
              
            </div>
          </form>
        </div>
      </div>

      {/* Form change work */}
      {/* ------------------------------------------------------- */}
      {/* delete workspace */}
      <div className='cover_screen' style={{display: showFormDeleteWorkspace?"block":"none"}} onClick={Handel_HideDelete}>
        <div className='announce_delete_workspace' onClick={handle_prevent_spread}>
          <div className='announce_delete_header ggg' >
            <div className='hghg'><p>Delete Workspace</p></div>
            
              <div  onClick={Handel_HideDelete}><img src={icon_exit} alt="" /></div>
            
          </div>
          <div className='ggg2'><p>There is no way to recover a workspace once it has been deleted.</p></div>
          <div className='delete_workspace_footer'>
            <div className='cancel_delete_workspace' onClick={Handel_HideDelete}><button>Cancel</button></div>
            <div className='accept_delete_workspace' onClick={handel_deleteWorkspace}><button >Delete</button></div>
          </div>
        </div>
        
      </div>
      {/* delete Workspace */}

      {/* -------------------------------------------------------------- */}
      {/* delete Work */}
      <div className='cover_screen' style={{display: showFormDeleteWork?"block":"none"}} onClick={Handel_HideDelete}>
        <div className='announce_delete_workspace' onClick={handle_prevent_spread}>
          <div className='announce_delete_header ggg' >
            <div className='hghg'><p>Delete Work</p></div>
            
              <div  onClick={Handel_HideDelete}><img src={icon_exit} alt="" /></div>
            
          </div>
          <div className='ggg2'><p>There is no way to recover a work once it has been deleted.</p></div>
          <div className='delete_workspace_footer'>
            <div className='cancel_delete_workspace' onClick={Handel_HideDelete}><button>Cancel</button></div>
            <div className='accept_delete_workspace' onClick={()=>{handleDeleteWork(selectWork)}}><button >Delete</button></div>
          </div>
        </div>
        
      </div>
      {/* delete Work */}
      <div onClick={cancel_rename_workspace} className='screen_cover' style={{display: showFormChangeWorkspace?"block": "none"}}>
        <div onClick={handle_prevent_spread}  className='form_change_workspace'>
            <form method='post'>
              <div className='title_rename'>
                <p>Rename workspace</p>
              </div>
              <div className='rename_workspace'>
                <input className='input_rename_workspace' />
              </div>
              <div className='button_workspace_rename'>
                <div className='save_rename_workspace'>
                  <button type='button' onClick={()=>saveEditWorkspace(workspace_id)} className='button_rename_workspace'>Rename</button>
                </div>
                <div className='cancel_rename_workspace'>
                <button type='reset' onClick={cancel_rename_workspace}>Cancel</button>
                </div>
              </div>
              
            </form>
        </div>
      </div>
    </div>
  )
}

export default Work

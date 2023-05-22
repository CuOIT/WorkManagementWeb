import React, { useTransition } from 'react'
import { useEffect, useState } from 'react'
import './assignment.css'
import axios from 'axios'
import { type } from '@testing-library/user-event/dist/type'
import logo_edit from '../../image/edit.png'
import logo_delete from '../../image/delete.png'
import logo_edit2 from '../../image/edit-text.png'
import logo_comment from '../../image/comment.png'
const Assignment = () => {
    const [listofWorkspace,setListWorkspace] = useState([])
    const [listofWork,setListWork] = useState([])
    const [showPriority,setShowPriority] = useState(false)
    const [workSpaceId, setWorkSpaceId] = useState(0);
    const [formAddWork,setformAddWork] = useState(false);
    const [PriorityRes, setPriorityRes] = useState(1);
    useEffect(()=>{
        axios.get("http://localhost:8080/api/workspace")
            .then((response)=>{
                setListWorkspace(response.data)
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
      
    }
    function checkPriority(){
      const Priority1 = document.getElementById('priority_1');
      const Priority2 = document.getElementById('priority_2');
      const Priority3 = document.getElementById('priority_3');
      const Priority4 = document.getElementById('priority_4');
      if(Priority1.checked){
        setPriorityRes(1);
      }
      else if(Priority2.checked){
        setPriorityRes(2);
      }
      else if(Priority3.checked){
        setPriorityRes(3);
      }
      else{
        setPriorityRes(4);
      }
    }
    function closeFormPriority(){
      setShowPriority(false)
      console.log(1)
    }
    function openFormPriority(event){
      ///event.stopPropagation()
      setShowPriority(!showPriority);
      
    }
    const onSubmit = (event)=>{
      event.preventDefault();
      checkPriority();
      console.log(PriorityRes);
      closeFormPriority();
      const {name, description,dueDate} = event.target;
     
      axios.post("http://localhost:8080/api/work", {
        name: name.value,
        description:description.value,
        due_date: dueDate.value,
        workspace_id: workSpaceId
    })
      
      .then((response) => {
        alert("hello world")
        console.log("IT WORKED");
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
    openFormPriority(false)
    }
  return (
  <div className='container_workspace'>
    <div className='workspace_screen'>
      {
        listofWorkspace.map((value1,key)=>{
            return (
                <div key={value1.id} id={value1.id} className='workspace_item'>
                  <div className='div_workspace_name'><p className='workspace_name'>{value1.name}</p></div>
                  <div className='div_work_item'>{listofWork.map((value2,key)=>{
                    if(value2.workspace_id === value1.id)
                      return (
                        <div key={value2.id} id = {value2.id} className='work_item'>
                          <div><input type='checkbox'></input></div>
                          <div><p className='work_name'>{value2.name}</p></div>
                          <div className='work_item_listen'>
                            <div className='work_item_edit'>
                              <img src = {logo_edit2}></img>
                            </div>
                            <div className='work_item_delete'>
                              <img src = {logo_delete}></img>
                            </div>
                            <div className='work_item_comment'>
                              <img src = {logo_comment}></img>
                            </div>
                            <div className='work_item_delete'></div>
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
            <input name='name' type='text' placeholder='Task name'></input>
          </div>
          <div className='input_description'>
            <input name='description' type='text' placeholder='Description'></input>
          </div>
          <div className='set_infor'>
            <div  className='due_date'>

            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="no_due_date"><path fill="currentColor" d="M12 2a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h8zm0 1H4a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1zm-1.25 7a.75.75 0 110 1.5.75.75 0 010-1.5zm.75-5a.5.5 0 110 1h-7a.5.5 0 010-1h7z"></path></svg>
                              <p>Due date</p> */}
              <input name='dueDate' type='datetime-local' />
            </div>
            <div className='priority' onClick={openFormPriority}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="Gw1i-E3" data-icon-name="priority-icon" data-priority="4"><path fillRule="evenodd" clipRule="evenodd" d="M2 3a.5.5 0 01.276-.447C3.025 2.179 4.096 2 5.5 2c.901 0 1.485.135 2.658.526C9.235 2.885 9.735 3 10.5 3c1.263 0 2.192-.155 2.776-.447A.5.5 0 0114 3v6.5a.5.5 0 01-.276.447c-.749.375-1.82.553-3.224.553-.901 0-1.485-.135-2.658-.526C6.765 9.615 6.265 9.5 5.5 9.5c-1.08 0-1.915.113-2.5.329V13.5a.5.5 0 01-1 0V3zm1 5.779v-5.45C3.585 3.113 4.42 3 5.5 3c.765 0 1.265.115 2.342.474C9.015 3.865 9.599 4 10.5 4c1.002 0 1.834-.09 2.5-.279v5.45c-.585.216-1.42.329-2.5.329-.765 0-1.265-.115-2.342-.474C6.985 8.635 6.401 8.5 5.5 8.5c-1.001 0-1.834.09-2.5.279z" fill="currentColor"></path></svg>
                              <p>Priority</p>
            </div>
          </div>
        </div>
        <div className='form_footer'>
          <div className='Cancel'>
            <button type='reset' onClick={openFormAddTask}>Cancel</button>
          </div>
          <div className='add_work'>
            <button type='submit'>Add Work</button>
          </div>
        </div>
        </form>
      </div>
      <div id='dropdown-select'style={{ display: showPriority ? "block" : "none" }}>
        <form>
          <div className='priority1'>
            <input id='priority_1'  name="priority" type="radio" value="1" />
            <label for = 'priority_1'>Priority 1</label>
          </div>
          <div className='priority2'>
            <input id='priority_2' name="priority" type="radio" value="2" />
            <label for = 'priority_2'>Priority 2</label>
          </div>
          <div className='priority3'>
            <input id='priority_3' name="priority" type="radio" value="3" />
            <label for = 'priority_3'>Priority 3</label>
          </div>
          <div className='priority4'>
            <input id='priority_4' name="priority" type="radio" value="4" />
            <label for = "priority_4">Priority 4</label>
          </div>
          
          
          
          
        </form>
      </div>
  </div>
  )
}

export default Assignment

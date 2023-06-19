import React, { useEffect, useState } from 'react'
import { redirect, useParams } from 'react-router-dom';
import './project.css'
import { projectName } from '../../Sidebar/Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import icon_arrow_up from "../../image/arrow_up.png"
import icon_arrow_down from "../../image/down-arrow.png"
import icon_three_dot from "../../image/three-dots.png"
import icon_exit from "../../image/cross.png"
import icon_comment from "../../image/comment.png"
import icon_moon from "../../image/new-moon.png"
import icon_calendar from "../../image/calendar.png"
import icon_edit from "../../image/edit.png"
import icon_delete from "../../image/delete.png"

import _ from 'lodash';
const Project = () => {
  const [listOfTask,setlistOfTask] = useState([]);
  const { project_id } = useParams();
  const [name_project,setname_project] = useState("fdsf");
  const [listOfMember,setlistOfMember] = useState([])
  const [displayAddTask,setdisplayAddTask] = useState(false)
  const [displayTask,setdisplayTask] = useState(false)
  const [nameTask,setNameTask] = useState("");
  const [descriptionTask, setDescriptionTask] = useState("")
  const [dueDate,setdueDate] = useState("");
  const [showFormDelete,setshowFormDelete] = useState(false);
  useEffect(()=>{
   
    axios.get(`http://localhost:8080/api/project/get-tasks?project_id=${project_id}`)
      .then((response)=>{
        const sortedTasks = _.sortBy(response.data.data, 'due_date');
        setlistOfTask(sortedTasks)
        
      })
      axios.get(`http://localhost:8080/api/project/?project_id=${project_id}`)
      .then((response)=>{
        setlistOfMember(response.data.data)
       
      })
    setname_project(projectName);
  },[window.location.pathname])
  
  const hide_show_addTask = ()=>{
    setdisplayAddTask(!displayAddTask);
  }
  const submit_addTask = (event)=>{
    event.preventDefault();
    const {name,description,dueDate,assigned_to} = event.target;
    
    axios.post("http://localhost:8080/api/project/add-task",{
      project_id: project_id,
      name: name.value,
      description: description.value,
      assigned_to: "1",
      due_date: dueDate.value,
      status:"Start"
    })
    .then((response)=>{
      console.log(response)
    })
    const newTask = {
      project_id: project_id,
      name:name.value,
      description: description.value,
      assigned_to: "1",
      due_date: dueDate.value,
      status:"Start"
    }
    const newListTask = [...listOfTask,newTask]
    setlistOfTask(newListTask);
    
  }
  const show_selected_task = (task_id, task_name,task_description,task_dueDate)=>{
    setNameTask(task_name);
    setDescriptionTask(task_description);
    setdueDate(task_dueDate);
    setdisplayTask(!displayTask);    
  }
  const hide_selected_task = ()=>{
    setdisplayTask(false);
  }
  const Handel_showDelete = ()=>{
    setshowFormDelete(!showFormDelete);
  }
  const Handel_HideDelete = ()=>{
    setshowFormDelete(false);
  }
  const handle_prevent_spread = (event)=>{
    event.stopPropagation();
    
  }
  const deleteProject = ()=>{
    axios.delete(`http://localhost:8080/api/project/${project_id}`)
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    })
    Handel_HideDelete();
    window.location = "http://localhost:3000/trangchu"
  }
  return (
    <div className='project_screen'>
      
      <div className='project_header'>
          <div className='project_title'>
            <h2>{name_project}</h2>  
          </div>
        
          
          <div className='project_header_right1'>
            <div className='invite_to_project'>
              <div className='project_header_invite'>
                <div className='hmmm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 13.5c3.323 0 5.803.697 7.427 2.119A2.5 2.5 0 0115.78 20H4.22a2.5 2.5 0 01-1.647-4.381C4.197 14.197 6.677 13.5 10 13.5zm0 1c-3.102 0-5.353.633-6.768 1.871A1.5 1.5 0 004.22 19h11.56a1.502 1.502 0 00.989-2.629C15.352 15.133 13.101 14.5 10 14.5zM19.5 6a.5.5 0 01.5.5V9h2.5a.5.5 0 010 1H20v2.5a.5.5 0 01-1 0V10h-2.5a.5.5 0 010-1H19V6.5a.5.5 0 01.5-.5zM10 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 1a3 3 0 100 6 3 3 0 000-6z" fill-rule="evenodd"></path></svg></div>
                <div className='hnnn'><p>Share</p></div>
              </div>
            </div>
            <div className='project_header_edit1'>
              
              <div className='hmmm'><svg width="24" height="24"><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z"></path><path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z"></path></g></svg></div>  
              <div className='hnnn'><p>Edit</p></div>
            </div>
            <div className='project_header_delete1' onClick={Handel_showDelete}>
             
              <div className='hmmm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 008 19.5h8a1.5 1.5 0 001.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0014 3.5h-4A1.5 1.5 0 008.5 5v1.5z"></path></g></svg></div>  
              <div className='hnnn'><p>Delete</p></div>
            </div>
          </div>
        
      </div>
      
      <div className='project_container'>
        {
          listOfTask.map((value,key)=>{
            return(
             
                <div onClick={()=>show_selected_task(value.id, value.name, value.description,value.due_date)} className='project_item' id={value.id}>
                    <div className='check_box_project'>
                    <button className="task_checkbox"  >
                                                <svg width="24" height="18" aria-checked="false"><path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path></svg>
                                            </button>
                    </div>
                    <div className='project_infor'>
                      <div className='name_project_item'>
                        <p>{value.name}</p>
                      </div>
                      <div className='project_description'>
                        <p>{value.description}</p>
                      </div>
                      <div className='date_project'>
                        <p>{value.due_date}</p>
                      </div>

                    </div>
                    
                </div>
              
            )
          })
        }
        <div class="button_add_task_project" onClick={hide_show_addTask}><button type="button" data-add-task-navigation-element="true" class="button_add_task"><span class="icon_add" aria-hidden="true"><svg width="13" height="13"><path d="M6 6V.5a.5.5 0 011 0V6h5.5a.5.5 0 110 1H7v5.5a.5.5 0 11-1 0V7H.5a.5.5 0 010-1H6z" fill="currentColor" fill-rule="evenodd"></path></svg></span>Add task</button></div>
        <div className='project_add_task' style={{display:displayAddTask?'block': 'none'}}>
          <form onSubmit={submit_addTask}  method='post'>
            <div className='form_container'>
              <div className='project_add_task_left'>
                <div className='input_name'>
                  <input required name='name' type='text' placeholder='Task name'></input>
                </div>
                <div className='input_description'>
                  <input required name='description' type='text' placeholder='Description'></input>
                </div>
              </div>
              
              <div className='project_add_task_right'>
                <div  className='project_task_dueDate'>  
                  <input required name='dueDate' type='date' />
                </div>
                
                <div className='project_select_people'>
                  <select name='assigned_to'>
                    <option value="choose1">choose1</option>
                    <option value = "choose2">choose2</option>
                    <option value = "choose3">choose1</option>
                    <option value = "choose4">choose2</option>
                    <option value = "choose5">choose1</option>
                    <option value = "choose6">choose2</option>
                  </select>
                </div>                
              </div>
              <div className='form_footer'>
                <div className='Cancel'>
                  <button onClick={hide_show_addTask}  type='reset' >Cancel</button>
                </div>
                <div className='add_work' >
                  <button type='submit'>Add task</button>
                </div>
              
              </div>
            </div>
           
          </form>
        </div>
      </div>
      <div style={{display:displayTask?'block': 'none'}}className='cover_screen' onClick={hide_selected_task}>
      <div  className='selected_task' onClick={handle_prevent_spread}>
        <div className='all_select_task'>
          <div className='select_task_header'>
            <div className='arrow_up'>
              <img src={icon_arrow_up} alt="" />
            </div>
            <div className='arrow_down'>
              <img src={icon_arrow_down} alt="" />
            </div>
            <div className='three_dot'>
              <img src={icon_three_dot} alt="" />
            </div>
            <div className='exit_task_select' onClick={hide_selected_task}>
              <img src={icon_exit} alt="" />
            </div>
          </div>
          <div className='select_task_content'>
            <div className='select_task_left'>
              <div className='checkBoxAndName_des'>
               <div className='checkbox_Task'>
                  <button className="task_checkbox_project"  >
                    <svg width="24" height="18" aria-checked="false"><path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path></svg>
                  </button>
                </div>
                <div className='name_description_task'>
                  <div className='nameOfTask'>
                    <p>{nameTask}</p>
                  </div>
                  <div className='descriptionOfTask'>
                    <p>{descriptionTask}</p>
                  </div>
                </div>
              </div>
              <div className='comment_task'>
                <div className='input_comment'>
                  <div className='logo_user'>
                    <img src="https://dcff1xvirvpfp.cloudfront.net/a45d5938c6104c7bb45274c5b8641e29_small.jpg" alt="maicong"/>
                  </div>
                  <div className='form_comment'>
                    <form method='post'>
                      <input placeholder='Comment' name='comment'></input>
                    </form>
                  </div>
                </div>
                
              </div>
            </div>
            <div className='select_task_right'>
                <div className='Label_project'>
                  <div className='selected_task_titelProject'>
                    <p>Project</p>
                  </div>
                  <div className='selected_task_nameProject'>
                    <div><img src={icon_moon} alt="" /></div>
                    <div><p>{name_project}</p></div>
                  </div>
                </div>
                <div className='due_date_task'>
                  <div className='abcde'><p>Due Date</p></div>
                  <div className='calendar_task'>
                    <div className='icon_calendar'><img src={icon_calendar} alt="" /></div>
                    <div className='abdsf'><p>{dueDate.slice(5,10)}</p></div>
                  </div>
                  
                </div>
                <div className='member_assigned'>
                  <div className='member_titel'>Member</div>
                  <div className='name_member_assigned'>

                  </div>
                </div>
                
            </div>
          </div>
        </div>
        
        
      </div>
      </div>
      <div className='cover_screen' style={{display: showFormDelete?"block":"none"}} onClick={Handel_HideDelete}>
        <div className='announce_delete_project' onClick={handle_prevent_spread}>
          <div className='announce_delete_header ggg' >
            <div className='hghg'><p>Delete Project</p></div>
            
              <div onClick={Handel_HideDelete}><img src={icon_exit} alt="" /></div>
            
          </div>
          <div className='ggg2'><p>There is no way to recover a project once it has been deleted.</p></div>
          <div className='delete_project_footer'>
            <div className='cancel_delete_project' onClick={Handel_HideDelete}><button>Cancel</button></div>
            <div className='accept_delete_project'><button onClick={()=>{deleteProject()}}>Delete</button></div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Project
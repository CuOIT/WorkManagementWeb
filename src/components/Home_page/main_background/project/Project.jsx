import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './project.css'
import { projectName } from '../../Sidebar/Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import icon_arrow_up from "../../image/arrow_up.png"
import icon_arrow_down from "../../image/down-arrow.png"
import icon_three_dot from "../../image/three-dots.png"
import icon_exit from "../../image/cross.png"
import icon_comment from "../../image/comment.png"
import icon_moon from "../../image/new-moon.png"
import icon_calendar from "../../image/calendar.png"
import "./Invite/invite"
import Invite from './Invite/invite';
import Comment from './Screen/Screen'


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
  useEffect(()=>{
    
    axios.get(`http://localhost:8080/api/project/get-tasks?project_id=${project_id}`)
      .then((response)=>{
        setlistOfTask(response.data.data)
        
      })
      axios.get(`http://localhost:8080/api/project/?project_id=${project_id}`)
      .then((response)=>{
        setlistOfMember(response.data.data)
        console.log(listOfMember)
      })
    setname_project(projectName);
  },[])
  
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

  const handleCancel = () => {
    setShowInvite(false);
  };

  const [showInvite, setShowInvite] = useState(false)

  const handleInvite = () => {
    setShowInvite(true)
  }

  return (
    <>
    {showInvite && 
      <div className="invite-container">
        <Invite onCancel={handleCancel} />
      </div>}
    <Comment/>
    {/* Sửa tí rồi mới import Components */}

    <div className={`project_screen ${showInvite ? "blur" : ""}`}>
      <div className='project_header'>
        <div className='project_title'>
          <h3>{name_project}</h3>  
        </div>
        
          <div className='add_task_project'>
            <button onClick={hide_show_addTask}>Add task</button>
          </div>
          <div className='invite_to_project'>
            <button 
              type="button" 
              aria-label="Share options" 
              onClick={handleInvite}>
              <svg xmlns="http://www.w3.org/2000/svg" 
              width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M10 13.5c3.323 0 5.803.697 7.427 2.119A2.5 2.5 0 0115.78 20H4.22a2.5 2.5 0 01-1.647-4.381C4.197 14.197 6.677 13.5 10 13.5zm0 1c-3.102 0-5.353.633-6.768 1.871A1.5 1.5 0 004.22 19h11.56a1.502 1.502 0 00.989-2.629C15.352 15.133 13.101 14.5 10 14.5zM19.5 6a.5.5 0 01.5.5V9h2.5a.5.5 0 010 1H20v2.5a.5.5 0 01-1 0V10h-2.5a.5.5 0 010-1H19V6.5a.5.5 0 01.5-.5zM10 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 1a3 3 0 100 6 3 3 0 000-6z" fill-rule="evenodd">
              </path></svg><span class="action_label">Share</span>
              </button>
          </div>
        
      </div>
      <div  className='project_add_task' style={{display:displayAddTask?'block': 'none'}}>
      <form onSubmit={submit_addTask}  method='post'>
        <div className='project_add_task_header'>
          <div className='project_header_left'>
            <div className='input_task_name'>
              <input required name='name' type='text' placeholder='Task name'></input>
            </div>
            <div className='input_task_description'>
              <input required name='description' type='text' placeholder='Description'></input>
            </div>
          </div>
          <div className='project_header_right'>
            <div  className='due_date'>
              <input required name='dueDate' type='datetime-local' />
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
        </div>
        <div className='project_add_task_footer'>
          <div className='div_cancel_add_task'>
            <button onClick={hide_show_addTask} type='reset' >Cancel</button>
          </div>
          <div className='div_add_task' >
            <button type='submit'>Add Work</button>
          </div>
          
        </div>
        </form>
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
      </div>
      <div style={{display:displayTask?'block': 'none'}}className='cover_screen'>
      <div  className='selected_task'>
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
    </div>
    </>
  )
}

export default Project
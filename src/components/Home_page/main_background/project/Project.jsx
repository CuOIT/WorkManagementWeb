import React, { useEffect, useState } from 'react'
import { redirect, useParams } from 'react-router-dom';
import './project.css'
import { projectName } from '../../Sidebar/Sidebar';
import axios from 'axios';
import icon_exit from "../../image/cross.png"
import Edit_Screen from "./Screen/Screen"
import Invite from "./Invite/invite"
import _ from 'lodash';


const Project = () => {
  const [listOfTask, setlistOfTask] = useState([]);
  const { project_id } = useParams();
  const [name_project, setname_project] = useState("fdsf");
  const [listOfMember, setlistOfMember] = useState([])
  const [displayAddTask, setdisplayAddTask] = useState(false)
  const [displayTask, setdisplayTask] = useState(false)
  const [nameTask, setNameTask] = useState("");
  const [descriptionTask, setDescriptionTask] = useState("")
  const [dueDate, setdueDate] = useState("");
  const [showFormDelete, setshowFormDelete] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [select_task, setSelectTask] = useState("")
  const [showSort, setShowSort] = useState(false);
  
  useEffect(() => {
    axios.get(`http://localhost:8080/api/project/get-tasks?project_id=${project_id}`)
      .then((response) => {
        const sortedTasks = _.sortBy(response.data.data, 'due_date');
        setlistOfTask(sortedTasks)

      })
    axios.get(`http://localhost:8080/api/project/get-member?project_id=${project_id}`)
      .then((response) => {
        setlistOfMember(response.data.data)

      })
    console.log("this is member")

    setname_project(projectName);
  }, [window.location.pathname])

  const hide_show_addTask = () => {
    setdisplayAddTask(!displayAddTask);
  }
  const submit_addTask = (event) => {
    event.preventDefault();
    const { name, description, dueDate, assigned_to } = event.target;

    axios.post("http://localhost:8080/api/project/add-task", {
      project_id: project_id,
      name: name.value,
      description: description.value,
      assigned_to: assigned_to.value,
      due_date: dueDate.value,
      status: "Start"
    })
      .then((response) => {
        console.log(response)
      })
    const newTask = {
      project_id: project_id,
      name: name.value,
      description: description.value,
      assigned_to: assigned_to.value,
      due_date: dueDate.value,
      status: "Start"
    }
    const newListTask = [...listOfTask, newTask]
    setlistOfTask(newListTask);

  }
  const handle_editTask = (event) => {
    event.preventDefault();
    const task_id = select_task;
    const { name, description, dueDate, assigned_to } = event.target;
    axios.put(`http://localhost:8080/api/project/update-task/${task_id}`, {

      name: name.value,
      description: description.value,
      project_id: project_id,
      assigned_to: assigned_to.value,
      due_date: dueDate.value,
      status: "Start"
    })

    const newListTask = listOfTask;
    for (let i = 0; i < listOfTask.length; i++) {
      if (listOfTask[i].id === task_id) {
        newListTask[i].name = name.value;
        newListTask[i].description = description.value
        newListTask[i].assigned_to = assigned_to.value;
        newListTask[i].due_date = dueDate.value;
        newListTask[i].status = "start"
      }
    }
    const sortedTasks = _.sortBy(newListTask, 'due_date');
    setlistOfTask(sortedTasks)

    HideEditTask();
  }
  const show_selected_task = (task_id, task_name, task_description, task_dueDate) => {
    setSelectTask(task_id)
    setNameTask(task_name);
    setDescriptionTask(task_description);
    setdueDate(task_dueDate);
    setdisplayTask(!displayTask);

  }
  const hide_selected_task = () => {
    setdisplayTask(false);
  }
  const Handel_showDelete = () => {
    setshowFormDelete(!showFormDelete);
  }
  const Handel_HideDelete = () => {
    setshowFormDelete(false);
  }
  const handle_prevent_spread = (event) => {
    event.stopPropagation();

  }
  const deleteProject = () => {
    axios.delete(`http://localhost:8080/api/project/${project_id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    Handel_HideDelete();
    window.location = "http://localhost:3000/trangchu"
  }
  const OpenEditProject = () => {
    setShowEditProject(true);
  }
  const HideEditProject = () => {
    setShowEditProject(false);
  }
  const HideDeleteTask = () => {
    setShowDeleteTask(false);
  }
  const OpenEditTask = (event, task_id, task_name, task_description, task_duDate, task_assign) => {
    event.stopPropagation();
    document.querySelector(".project_edit_form_container .input_name input").value = task_name;
    document.querySelector(".project_edit_form_container .input_description input").value = task_description;
    document.querySelector(".project_edit_form_container .project_task_dueDate input").value = task_duDate;
    document.querySelector(".project_edit_form_container .project_edit_select_people select").value = task_assign;
    setSelectTask(task_id)
    setShowEditTask(true);
  }
  const HideEditTask = () => {
    setShowEditTask(false);
  }
  const handle_showDeleteTask = (event, task_id) => {
    event.stopPropagation();
    setSelectTask(task_id)
    setShowDeleteTask(true)
  }
  const handleEditProject = (event) => {
    event.preventDefault();
    const { name, description, start_date, end_date } = event.target;
    axios.put(`http://localhost:8080/api/project/${project_id}`, {
      name: name.value,
      description: description.value,
      start_date: start_date.value,
      end_date: end_date.value,
      status: "start"
    })
    setname_project(name.value)
    setShowEditProject(false);
  }
  const handle_DeleteTask = () => {
    const task_id = select_task;
    const newListTask = [];
    for (let i = 0; i < listOfTask.length; i++) {
      if (listOfTask[i].id !== task_id) {
        newListTask.push(listOfTask[i]);
      }
    }
    setlistOfTask(newListTask);

    axios.delete(`http://localhost:8080/api/delete-task/${task_id}`)
      .then((response) => {
        setShowDeleteTask(false)
        console.log(response)
      })
      .catch((error) => {
        alert("fail really fail")
      });
  }
  const openShowSort = () => {
    setShowSort(true);
  }

  const hideShowSort = () => {
    setShowSort(false);
  }

  function compareDueDate(task1, task2) {
    const date1 = new Date(task1.due_date);
    const date2 = new Date(task2.due_date);

    return date1 - date2;
  }
  const sortToDue_date = () => {


    const sortWork = [...listOfTask].sort(compareDueDate)
    setlistOfTask(sortWork)
    setShowSort(false)
  }
  function compareName(task1, task2) {
    const name1 = task1.name;
    const name2 = task2.name;
    return name1.localeCompare(name2);
  }
  const sortToName = () => {
    const sortWork = [...listOfTask].sort(compareName);
    setlistOfTask(sortWork)
    setShowSort(false)
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
          <Invite
            onCancel={handleCancel}
            prj_id={project_id}
          />
        </div>
      }
      <div className={`project_screen ${showInvite ? "blur" : ""}`}>
        <div className='project_header'>
          <div className='sortWork'>
            <div className='to_sort' onClick={openShowSort}>
              <div className='hmmm'><svg class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.35 7.35L5 4.71V16.5a.5.5 0 001 0V4.7l2.65 2.65a.5.5 0 00.7-.7l-3.49-3.5A.5.5 0 005.5 3a.5.5 0 00-.39.18L1.65 6.65a.5.5 0 10.7.7zm15.3 5.3L15 15.29V3.5a.5.5 0 00-1 0v11.8l-2.65-2.65a.5.5 0 00-.7.7l3.49 3.5a.5.5 0 00.36.15.5.5 0 00.39-.18l3.46-3.47a.5.5 0 10-.7-.7z" fill="currentColor"></path></svg></div>
              <div className='hnnn'><p>Sort</p></div>
            </div>

            <div className='chooseSort' style={{ display: showSort ? "block" : "none" }} onClick={handle_prevent_spread}>
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

          <div className='project_title'>
            <h2>Project_name</h2>
          </div>


          <div className='project_header_right1'>
            <div className='invite_to_project'>
              <div className='project_header_invite' onClick={handleInvite}>
                <div className='hmmm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 13.5c3.323 0 5.803.697 7.427 2.119A2.5 2.5 0 0115.78 20H4.22a2.5 2.5 0 01-1.647-4.381C4.197 14.197 6.677 13.5 10 13.5zm0 1c-3.102 0-5.353.633-6.768 1.871A1.5 1.5 0 004.22 19h11.56a1.502 1.502 0 00.989-2.629C15.352 15.133 13.101 14.5 10 14.5zM19.5 6a.5.5 0 01.5.5V9h2.5a.5.5 0 010 1H20v2.5a.5.5 0 01-1 0V10h-2.5a.5.5 0 010-1H19V6.5a.5.5 0 01.5-.5zM10 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 1a3 3 0 100 6 3 3 0 000-6z" fill-rule="evenodd"></path></svg></div>
                <div className='hnnn'><p>Share</p></div>
              </div>
            </div>
            <div className='project_header_edit1' onClick={() => { OpenEditProject() }}>

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
            listOfTask?.map((value, key) => {
              return (

                <div className='project_item' id={value.id}>
                  <div className='check_box_project'>
                    <button className="task_checkbox"  >
                      <svg width="24" height="18" aria-checked="false"><path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path></svg>
                    </button>
                  </div>
                  <div className='project_infor' onClick={() => show_selected_task(value.id, value.name, value.description, value.due_date, value.assigned_to)}>
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
                  <div className='project_header_right1 kkkk'>

                    <div className='project_header_edit' onClick={(event) => { OpenEditTask(event, value.id, value.name, value.description, value.due_date) }}>
                      <div className='hmmm'><svg width="24" height="24"><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z"></path><path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z"></path></g></svg></div>

                    </div>
                    <div className='project_header_delete' onClick={(event) => { handle_showDeleteTask(event, value.id) }}>

                      <div className='hmmm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 008 19.5h8a1.5 1.5 0 001.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0014 3.5h-4A1.5 1.5 0 008.5 5v1.5z"></path></g></svg></div>

                    </div>
                  </div>
                </div>

              )
            })
          }
          <div class="button_add_task_project" onClick={hide_show_addTask}><button type="button" data-add-task-navigation-element="true" class="button_add_task"><span class="icon_add" aria-hidden="true"><svg width="13" height="13"><path d="M6 6V.5a.5.5 0 011 0V6h5.5a.5.5 0 110 1H7v5.5a.5.5 0 11-1 0V7H.5a.5.5 0 010-1H6z" fill="currentColor" fill-rule="evenodd"></path></svg></span>Add task</button></div>
          <div className='project_add_task' style={{ display: displayAddTask ? 'block' : 'none' }}>
            <form onSubmit={submit_addTask} method='post'>
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
                  <div className='project_task_dueDate'>
                    <input required name='dueDate' type='date' />
                  </div>

                  <div className='project_select_people'>
                    <select name='assigned_to'>
                      {
                        listOfMember?.map((value, key) => {
                          return (
                            <option key={key} value={value.member_id}>{value.user_name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className='form_footer'>
                  <div className='Cancel'>
                    <button onClick={hide_show_addTask} type='reset' >Cancel</button>
                  </div>
                  <div className='add_work' >
                    <button type='submit'>Add task</button>
                  </div>

                </div>
              </div>

            </form>
          </div>
        </div>
        <div style={{ display: displayTask ? 'block' : 'none' }} className='cover_screen' onClick={hide_selected_task}>
          <div className='selected_task' onClick={handle_prevent_spread}>
            <Edit_Screen
              onCancel={hide_selected_task}
              name={nameTask}
              description={descriptionTask}
              due_date={dueDate}
              id={select_task}
              name_prj="hello"
              prj_id={project_id}

            />
          </div>
        </div>
        <div className='cover_screen' style={{ display: showEditProject ? "block" : "none" }} onClick={HideEditProject}>
          <div className='add_project_container' onClick={handle_prevent_spread}>
            <div className='form_add_project'>
              <form method="post" onSubmit={handleEditProject}>
                <div className='add_project_header'>
                  <div><h3>Edit Project</h3></div>
                  <div className='add_project_header2' onClick={HideEditProject}><img src={icon_exit} alt="" /></div>
                </div>
                <div className='add_project_content'>
                  <div className='add_project_name vvvv'>
                    <div><p>Name</p></div>
                    <div><input required type="text" name='name' /></div>

                  </div>
                  <div className='add_project_description vvvv'>
                    <div><p>Description</p></div>
                    <div><input required type="text" name='description' /></div>
                  </div>
                  <div className='add_project_start vvvv'>
                    <div><p>Start Date</p></div>
                    <div><input required type="date" name='start_date' /></div>
                  </div>
                  <div className='add_project_end vvvv'>
                    <div><p>End Date</p></div>
                    <div><input required type="date" name='end_date' /></div>
                  </div>
                </div>
                <div className='add_project_footer'>
                  <div className='add_project_cancel' onClick={HideEditProject}>
                    <button type='button'>Cancel</button>
                  </div>
                  <div className='add_project_Save' >
                    <button type='submit'>Save</button>
                  </div>
                </div>
              </form>
            </div>

          </div>

        </div>
        <div className='cover_screen' style={{ display: showFormDelete ? "block" : "none" }} onClick={Handel_HideDelete}>
          <div className='announce_delete_project' onClick={handle_prevent_spread}>
            <div className='announce_delete_header ggg' >
              <div className='hghg'><p>Delete Project</p></div>

              <div onClick={Handel_HideDelete}><img src={icon_exit} alt="" /></div>

            </div>
            <div className='ggg2'><p>There is no way to recover a project once it has been deleted.</p></div>
            <div className='delete_project_footer'>
              <div className='cancel_delete_project' onClick={Handel_HideDelete}><button>Cancel</button></div>
              <div className='accept_delete_project'><button onClick={() => { deleteProject() }}>Delete</button></div>
            </div>
          </div>
        </div>

        <div className='cover_screen' style={{ display: showDeleteTask ? "block" : "none" }} onClick={HideDeleteTask}>
          <div className='announce_delete_project' onClick={handle_prevent_spread}>
            <div className='announce_delete_header ggg' >
              <div className='hghg'><p>Delete Task</p></div>

              <div onClick={HideDeleteTask}><img src={icon_exit} alt="" /></div>

            </div>
            <div className='ggg2'><p>There is no way to recover a Task once it has been deleted.</p></div>
            <div className='delete_project_footer'>
              <div className='cancel_delete_project' onClick={HideDeleteTask}><button>Cancel</button></div>
              <div className='accept_delete_project'><button onClick={handle_DeleteTask}>Delete</button></div>
            </div>
          </div>

        </div>
        <div className='cover_screen' style={{ display: showEditTask ? "block" : "none" }} onClick={HideEditTask}>
          <div className='project_edit_task2' onClick={handle_prevent_spread}>
            <form onSubmit={handle_editTask} method='post'>
              <div className='add_project_header'>
                <div><h3>Edit Task</h3></div>
                <div className='add_project_header2' onClick={HideEditTask}><img src={icon_exit} alt="" /></div>
              </div>
              <div className='project_edit_form_container'>

                <div className='input_name'>
                  <div><p>Name</p></div>
                  <input required name='name' type='text' placeholder='Task name'></input>
                </div>
                <div className='input_description'>
                  <div><p>Description</p></div>
                  <input required name='description' type='text' placeholder='Description'></input>
                </div>



                <div className='project_task_dueDate'>
                  <div><p>Due Date</p></div>
                  <input required name='dueDate' type='date' />
                </div>

                <div className='project_edit_select_people'>
                  <div><p>Assign To</p></div>
                  <select name='assigned_to'>
                    {
                      listOfMember?.map((value, key) => {
                        return (
                          <option value={value.member_id}>{value.user_name}</option>
                        )
                      })
                    }
                  </select>
                </div>

                <div className='form_footer'>
                  <div className='Cancel'>
                    <button onClick={HideEditTask} type='reset' >Cancel</button>
                  </div>
                  <div className='add_work' >
                    <button type='submit'>Save</button>
                  </div>

                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Project
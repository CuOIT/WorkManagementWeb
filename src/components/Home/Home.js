import React, {useEffect, useState} from "react"
import "./Home.css"

const handleClick = () => {
    alert("Click")
}

const Task_handle = () => {
    const form = document.querySelector(".form_add")
    const add = document.querySelector(".add_task")
    form.style.display = "block"
    add.style.display = "none"
}

const Main = () => {

    useEffect(() => {
        const today = new Date()
        const todayString = today.toLocaleDateString()
        document.getElementById('today').innerHTML = todayString
        document.getElementById('data-day').setAttribute('data-day', todayString)
      }, []);
    
    const handleCancel = () => {
        const form = document.querySelector(".form_add")
        const add = document.querySelector(".add_task")
        form.style.display = "none"
        add.style.display = "block"
        setTask('')
    }
     
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState(() => {
        const storageTasks = JSON.parse(localStorage.getItem('tasks'))
        return storageTasks ?? []
    })

    const handleSubmit = () => {
        setTasks(tasks =>{ 
            const newTasks = [...tasks, task] 

            //save to local storage
            const jsonTasks = JSON.stringify(newTasks)
            localStorage.setItem('tasks', jsonTasks)
            handleCancel()
            return newTasks
        })
    }

    const handleDelete = (index) => {
        setTasks(prev => {
            const newTasks = [...prev]
            for(let i = 0; i < newTasks.length; i++) {
                if(newTasks[i].id === index) {
                    newTasks.at(i).delete()
                    break;
                }
            }

            // Save updated task list to local storage
            const jsonTasks = JSON.stringify(newTasks)
            localStorage.setItem("tasks", jsonTasks)
            
            return newTasks;
          })
    }
    

    return (
        <div className="form">
                <div className="header">
                    <div className="view_header">
                        <div className="date">
                            <h2>Let's see what you need to do today!</h2>
                            <small id="today"></small>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="list_content">
                        <ul className="todolist" id="data-day" data-day="">
                            {tasks.map((task, index) =>{
                                return (
                                <li key={index} className="task_list">
                                    <div className="form_task">
                                        <button className="task_checkbox" onClick={handleClick}>
                                            <svg width="24" height="20" aria-checked="false"><path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path></svg>
                                        </button>
                                        <div className="tasklist_content">
                                            <div className="task_content">
                                                {task}
                                            </div>
                                        </div>
                                        <div className="task_action">
                                            <button className="edit_task" id="action" >
                                                <svg width="24" height="20"><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z"></path><path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z"></path></g></svg>
                                            </button>
                                            
                                            <button className="delete_task" id="action" onClick={handleDelete}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 008 19.5h8a1.5 1.5 0 001.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0014 3.5h-4A1.5 1.5 0 008.5 5v1.5z"></path></g></svg>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                )
                            })}
                            <li className="add_task" onClick={Task_handle}>
                                <button >
                                    <span className="icon_add">
                                        <svg width="24" height="20">
                                            <path d="M6 6V.5a.5.5 0 011 0V6h5.5a.5.5 0 110 1H7v5.5a.5.5 0 11-1 0V7H.5a.5.5 0 010-1H6z" fill="currentColor" fill-rule="evenodd"></path>
                                        </svg>
                                    </span>
                                    <p>Add task</p>
                                </button>
                            </li>

                            <div className="form_add">
                                <div className="task_edit">
                                    <div className="task_edit_input">
                                        <div className="task_content">
                                            <input value={task} onChange={e => setTask(e.target.value)} placeholder="Task name" required/>
                                        </div>  
                                        <div className="task_discription">
                                            <input placeholder="Discription"/>
                                        </div>
                                    </div>

                                    <div className="task_edit_action">

                                        <div className="due_date">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="no_due_date"><path fill="currentColor" d="M12 2a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h8zm0 1H4a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1zm-1.25 7a.75.75 0 110 1.5.75.75 0 010-1.5zm.75-5a.5.5 0 110 1h-7a.5.5 0 010-1h7z"></path></svg>
                                            <p>Due date</p>
                                        </div>

                                        <div className="priority">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="Gw1i-E3" data-icon-name="priority-icon" data-priority="4"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 3a.5.5 0 01.276-.447C3.025 2.179 4.096 2 5.5 2c.901 0 1.485.135 2.658.526C9.235 2.885 9.735 3 10.5 3c1.263 0 2.192-.155 2.776-.447A.5.5 0 0114 3v6.5a.5.5 0 01-.276.447c-.749.375-1.82.553-3.224.553-.901 0-1.485-.135-2.658-.526C6.765 9.615 6.265 9.5 5.5 9.5c-1.08 0-1.915.113-2.5.329V13.5a.5.5 0 01-1 0V3zm1 5.779v-5.45C3.585 3.113 4.42 3 5.5 3c.765 0 1.265.115 2.342.474C9.015 3.865 9.599 4 10.5 4c1.002 0 1.834-.09 2.5-.279v5.45c-.585.216-1.42.329-2.5.329-.765 0-1.265-.115-2.342-.474C6.985 8.635 6.401 8.5 5.5 8.5c-1.001 0-1.834.09-2.5.279z" fill="currentColor"></path></svg>
                                            <p>Priority</p>
                                        </div>

                                        <button type="button" className="cancel" onClick={handleCancel}>
                                            <svg viewBox="0 0 24 24" class="icon_close" width="24" height="24"><path fill="currentColor" fill-rule="nonzero" d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"></path></svg>
                                        </button>


                                        <button type="button" className="add_submit" onClick={handleSubmit}>
                                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.18 6.396C7 6.642 7 7.054 7 7.878V11l6.715.674c.38.038.38.614 0 .652L7 13v3.122c0 .824 0 1.236.18 1.482.157.214.4.356.669.39.308.041.687-.15 1.444-.531l8.183-4.122c.861-.434 1.292-.651 1.432-.942a.915.915 0 000-.798c-.14-.29-.57-.508-1.433-.942l-8.18-4.122c-.758-.381-1.137-.572-1.445-.532a.986.986 0 00-.67.391z" fill="currentColor"></path></svg>
                                        </button>

                                    </div>
                                </div>

                            </div>
                            
                        </ul>
                    </div>
                </div>

            </div>

    )
}

export default Main
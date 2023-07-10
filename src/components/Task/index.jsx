import React, { useEffect, useState } from "react";
import ChoicePopUp from "../ChoicePopUp";
import Comment from "../Comment";
import icon_exit from "../../asset/cross.png";
import { axiosData } from "../../services/axiosInstance";
const Task = ({ task, projectName, listOfMember }) => {
    const [deleted, setDeleted] = useState(false);
    const [showTask, setShowTask] = useState(false);
    const [showEditTask, setShowEditTask] = useState(false);
    const [showDeleteTask, setShowDeleteTask] = useState(false);
    const handlePreventSpread = (event) => {
        event.stopPropagation();
    };

    const handleShowEditTask = (show) => {
        setShowEditTask(show);
    };

    const handleShowDeleteTask = (event) => {
        event.stopPropagation();
        setShowDeleteTask(true);
    };
    const handleDeleteTask = (choice) => {
        if (choice) {
            axiosData
                .delete(`/api/project/delete-task/${task.id}`)
                .then((response) => {
                    setDeleted(true);
                    setShowDeleteTask(false);
                })
                .catch((error) => {
                    alert("You dont have permission to delete Task");
                    setShowDeleteTask(false);
                });
        } else {
            setShowDeleteTask(false);
        }
    };
    return (
        <div className="task-container" style={{ display: deleted ? "none" : "block" }}>
            {showDeleteTask && <ChoicePopUp content="Do you want to delete this task?" handleChoice={(choice) => handleDeleteTask(choice)} />}
            <div onClick={() => setShowTask(true)} className="project_item">
                <div className="check_box_project">
                    <button className="task_checkbox">
                        <svg width="24" height="18" aria-checked="false">
                            <path
                                fill="currentColor"
                                d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="project_infor">
                    <div className="name_project_item">
                        <p>{task.name}</p>
                    </div>
                    <div className="project_description">
                        <p>{task.description}</p>
                    </div>
                    <div className="date_project">
                        <p>{task.due_date}</p>
                    </div>
                </div>
                <div className="project_header_right1 kkkk">
                    <div
                        className="project_header_edit"
                        onClick={(event) => {
                            event.stopPropagation();
                            setShowEditTask(true);
                        }}
                    >
                        <div className="hmmm">
                            <svg width="24" height="24">
                                <g fill="none" fillRule="evenodd">
                                    <path fill="currentColor" d="M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z"></path>
                                    <path
                                        stroke="currentColor"
                                        d="M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z"
                                    ></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div
                        className="project_header_delete"
                        onClick={(event) => {
                            handleShowDeleteTask(event);
                        }}
                    >
                        <div className="hmmm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                <g fill="none" fillRule="evenodd">
                                    <path d="M0 0h24v24H0z"></path>
                                    <rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5"></rect>
                                    <path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path>
                                    <path
                                        stroke="currentColor"
                                        d="M17.5 6.5h-11V18A1.5 1.5 0 008 19.5h8a1.5 1.5 0 001.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0014 3.5h-4A1.5 1.5 0 008.5 5v1.5z"
                                    ></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: showTask ? "block" : "none" }} className="cover_screen" onClick={() => setShowTask(false)}>
                <div className="selected_task" onClick={handlePreventSpread}>
                    <Comment onCancel={() => setShowTask(false)} task={task} projectName={projectName} />
                </div>
            </div>

            <div className="cover_screen" style={{ display: showEditTask ? "block" : "none" }} onClick={() => setShowEditTask(false)}>
                <div className="project_edit_task2" onClick={handlePreventSpread}>
                    <form onSubmit={() => setShowEditTask(false)} method="post">
                        <div className="add_project_header">
                            <div>
                                <h3>Edit Task</h3>
                            </div>
                            <div className="add_project_header2" onClick={() => setShowEditTask(false)}>
                                <img src={icon_exit} alt="" />
                            </div>
                        </div>
                        {showEditTask ? (
                            <div className="project_edit_form_container">
                                <div className="input_name">
                                    <div>
                                        <p>{task?.name || ""}</p>
                                    </div>
                                    <input required name="name" type="text" placeholder="Task name"></input>
                                </div>
                                <div className="input_description">
                                    <div>
                                        <p>{task?.description || ""}</p>
                                    </div>
                                    <input required name="description" type="text" placeholder="Description"></input>
                                </div>

                                <div className="project_task_dueDate">
                                    <div>
                                        <p>{task.due_date}</p>
                                    </div>
                                    <input required name="dueDate" type="date" />
                                </div>

                                <div className="project_edit_select_people">
                                    <div>
                                        <p>{task?.assigned_to}</p>
                                    </div>
                                    <select required name="assigned_to">
                                        {listOfMember?.map((value, key) => {
                                            return (
                                                <option value={value.member_id} key={key}>
                                                    {value.user_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>

                                <div className="form_footer">
                                    <div className="Cancel">
                                        <button onClick={() => setShowEditTask(false)} type="reset">
                                            Cancel
                                        </button>
                                    </div>
                                    <div className="add_work">
                                        <button type="submit">Save</button>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Task;

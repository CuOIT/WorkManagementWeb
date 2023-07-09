import React, { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import "./index.css";

import { axiosData } from "../../services/axiosInstance";
import Task from "../Task";
import icon_exit from "../../asset/cross.png";
import Invite from "../Invite";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { useSelector, shallowEqual } from "react-redux";
import { selectNameProject } from "../../redux/reducer/nameProjectReducer";
import { updateNameProject } from "../../redux/reducer/nameProjectReducer";
import { selectSortTo } from "../../redux/reducer/sortTo";
import { updateSortTo } from "../../redux/reducer/sortTo";
import { updateRenderSidebar } from "../../redux/reducer/renderSidebar";
import ChoicePopUp from "../ChoicePopUp";

const MyProject = () => {
    const { project_id } = useParams();
    const [listOfTask, setlistOfTask] = useState([]);
    const project_name = useSelector(selectNameProject, shallowEqual);
    const [projectName, setProjectName] = useState("");
    const [listOfMember, setListOfMember] = useState([]);
    const [displayAddTask, setdisplayAddTask] = useState(false);
    const [showDeleteProject, setShowDeleteProject] = useState(false);
    const [showEditProject, setShowEditProject] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setProjectName(project_name);
        const fetchData = async () => {
            try {
                const response = await axiosData.get(`/api/project/get-tasks?project_id=${project_id}`);

                const sortedTasks = _.sortBy(response.data.data, "due_date");
                setlistOfTask(sortedTasks);

                const response2 = await axiosData.get(`/api/project/get-member?project_id=${project_id}`);
                setListOfMember(response2.data.data);
            } catch (error) {
                console.error("error fetching");
            }
        };

        fetchData();
    }, [window.location.pathname, project_id]);

    const hide_show_addTask = () => {
        setdisplayAddTask(!displayAddTask);
    };
    const submit_addTask = (event) => {
        event.preventDefault();
        const { name, description, dueDate, assigned_to } = event.target;
        const now = new Date();

        axiosData
            .post("/api/project/add-task", {
                project_id: project_id,
                name: name.value,
                description: description.value,
                assigned_to: assigned_to.value,
                due_date: dueDate.value,
                status: "Start",
            })
            .then((response) => {
                console.log(response);
            });
        const newTask = {
            project_id: project_id,
            name: name.value,
            description: description.value,
            assigned_to: assigned_to.value,
            due_date: dueDate.value,
            status: "Start",
        };
        const newListTask = [...listOfTask, newTask];
        setlistOfTask(newListTask);
    };

    const handle_prevent_spread = (event) => {
        event.stopPropagation();
    };
    const handleDeleteProject = (choice) => {
        if (choice) {
            axiosData
                .delete(`/api/project/${project_id}`)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            navigate("/");
        }
        setShowDeleteProject(false);
    };
    const OpenEditProject = () => {
        setShowEditProject(true);
    };
    const HideEditProject = () => {
        setShowEditProject(false);
    };
    const handleEditProject = (event) => {
        event.preventDefault();
        const { name, description, start_date, end_date } = event.target;
        axiosData.put(`/api/project/${project_id}`, {
            name: name.value,
            description: description.value,
            start_date: start_date.value,
            end_date: end_date.value,
            status: "start",
        });
        setProjectName(name.value);
        dispatch(updateNameProject(name.value));
        dispatch(updateRenderSidebar(true));
        setShowEditProject(false);
    };

    const openShowSort = () => {
        setShowSort(true);
    };

    function compareDueDate(task1, task2) {
        const date1 = new Date(task1.due_date);
        const date2 = new Date(task2.due_date);

        return date1 - date2;
    }
    const sortByDueDate = () => {
        const sortWork = [...listOfTask].sort(compareDueDate);
        setlistOfTask(sortWork);
        dispatch(updateSortTo(1));
        setShowSort(false);
    };
    function compareName(task1, task2) {
        const name1 = task1.name;
        const name2 = task2.name;
        return name1.localeCompare(name2);
    }
    const sortByName = () => {
        const sortWork = [...listOfTask].sort(compareName);
        setlistOfTask(sortWork);

        dispatch(updateSortTo(2));
        setShowSort(false);
    };

    const handleCancel = () => {
        setShowInvite(false);
    };
    const [showInvite, setShowInvite] = useState(false);
    const handleInvite = () => {
        setShowInvite(true);
    };

    return (
        <>
            {showInvite && (
                <div className="invite-container">
                    <Invite onCancel={handleCancel} prj_id={project_id} />
                </div>
            )}
            <div className={`project_screen ${showInvite ? "blur" : ""}`}>
                <div className="project_header">
                    <div className="sortWork">
                        <div className="to_sort" onClick={openShowSort}>
                            <div className="hmmm">
                                <svg
                                    className="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.35 7.35L5 4.71V16.5a.5.5 0 001 0V4.7l2.65 2.65a.5.5 0 00.7-.7l-3.49-3.5A.5.5 0 005.5 3a.5.5 0 00-.39.18L1.65 6.65a.5.5 0 10.7.7zm15.3 5.3L15 15.29V3.5a.5.5 0 00-1 0v11.8l-2.65-2.65a.5.5 0 00-.7.7l3.49 3.5a.5.5 0 00.36.15.5.5 0 00.39-.18l3.46-3.47a.5.5 0 10-.7-.7z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>
                            <div className="hnnn">
                                <p>Sort</p>
                            </div>
                        </div>

                        <div className="chooseSort" style={{ display: showSort ? "block" : "none" }} onClick={handle_prevent_spread}>
                            <div className="sort_title">
                                <p>Sort by</p>
                            </div>
                            <div className="sort_Due_date" onClick={sortByDueDate}>
                                <div className="icon_dueDate hmmm">
                                    <svg
                                        className="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        focusable="false"
                                    >
                                        <path
                                            d="M7 11a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm4-5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h9a2.5 2.5 0 002.5-2.5v-9zM4 7h12v7.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 014 14.5V7zm1.5-3h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="hnnn">
                                    <p>Due Date</p>
                                </div>
                            </div>
                            <div className="sort_alphabet" onClick={sortByName}>
                                <div className="icon_alphabet hmmm">
                                    <svg
                                        className="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        focusable="false"
                                    >
                                        <path
                                            d="M2.35 7.35L5 4.71V16.5a.5.5 0 001 0V4.7l2.65 2.65a.5.5 0 00.7-.7l-3.49-3.5A.5.5 0 005.5 3a.5.5 0 00-.39.18L1.65 6.65a.5.5 0 10.7.7zm15.3 5.3L15 15.29V3.5a.5.5 0 00-1 0v11.8l-2.65-2.65a.5.5 0 00-.7.7l3.49 3.5a.5.5 0 00.36.15.5.5 0 00.39-.18l3.46-3.47a.5.5 0 10-.7-.7z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="hnnn">
                                    <p>Alphabetically</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="project_title">
                        <h2>{projectName}</h2>
                    </div>

                    <div className="project_header_right1">
                        <div className="invite_to_project">
                            <div className="project_header_invite" onClick={handleInvite}>
                                <div className="hmmm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M10 13.5c3.323 0 5.803.697 7.427 2.119A2.5 2.5 0 0115.78 20H4.22a2.5 2.5 0 01-1.647-4.381C4.197 14.197 6.677 13.5 10 13.5zm0 1c-3.102 0-5.353.633-6.768 1.871A1.5 1.5 0 004.22 19h11.56a1.502 1.502 0 00.989-2.629C15.352 15.133 13.101 14.5 10 14.5zM19.5 6a.5.5 0 01.5.5V9h2.5a.5.5 0 010 1H20v2.5a.5.5 0 01-1 0V10h-2.5a.5.5 0 010-1H19V6.5a.5.5 0 01.5-.5zM10 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 1a3 3 0 100 6 3 3 0 000-6z"
                                            fillRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="hnnn">
                                    <p>Share</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="project_header_edit1"
                            onClick={() => {
                                OpenEditProject();
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
                            <div className="hnnn">
                                <p>Edit</p>
                            </div>
                        </div>
                        <div className="project_header_delete1" onClick={() => setShowDeleteProject(true)}>
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
                            <div className="hnnn">
                                <p>Delete</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="project_container">
                    {listOfTask?.map((task, key) => {
                        return <Task task={task} index={key} projectName={projectName} listOfMember={listOfMember} />;
                    })}
                    <div className="button_add_task_project" onClick={hide_show_addTask}>
                        <button type="button" data-add-task-navigation-element="true" className="button_add_task">
                            <span className="icon_add" aria-hidden="true">
                                <svg width="13" height="13">
                                    <path
                                        d="M6 6V.5a.5.5 0 011 0V6h5.5a.5.5 0 110 1H7v5.5a.5.5 0 11-1 0V7H.5a.5.5 0 010-1H6z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                    ></path>
                                </svg>
                            </span>
                            Add task
                        </button>
                    </div>
                    <div className="project_add_task" style={{ display: displayAddTask ? "block" : "none" }}>
                        <form onSubmit={submit_addTask} method="post">
                            <div className="form_container">
                                <div className="project_add_task_left">
                                    <div className="input_name">
                                        <input required name="name" type="text" placeholder="Task name"></input>
                                    </div>
                                    <div className="input_description">
                                        <input required name="description" type="text" placeholder="Description"></input>
                                    </div>
                                </div>

                                <div className="project_add_task_right">
                                    <div className="project_task_dueDate">
                                        <input required name="dueDate" type="date" />
                                    </div>

                                    <div className="project_select_people">
                                        <select name="assigned_to">
                                            {listOfMember?.map((value, key) => {
                                                return <option value={value.member_id}>{value.user_name}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="form_footer">
                                    <div className="Cancel">
                                        <button onClick={hide_show_addTask} type="reset">
                                            Cancel
                                        </button>
                                    </div>
                                    <div className="add_work">
                                        <button type="submit">Add task</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="cover_screen eidt-project" style={{ display: showEditProject ? "block" : "none" }} onClick={HideEditProject}>
                    <div className="add_project_container" onClick={handle_prevent_spread}>
                        <div className="form_add_project">
                            <form method="post" onSubmit={handleEditProject}>
                                <div className="add_project_header">
                                    <div>
                                        <h3>Edit Project</h3>
                                    </div>
                                    <div className="add_project_header2" onClick={HideEditProject}>
                                        <img src={icon_exit} alt="" />
                                    </div>
                                </div>
                                <div className="add_project_content">
                                    <div className="add_project_name vvvv">
                                        <div>
                                            <p>Name</p>
                                        </div>
                                        <div>
                                            <input required type="text" name="name" />
                                        </div>
                                    </div>
                                    <div className="add_project_description vvvv">
                                        <div>
                                            <p>Description</p>
                                        </div>
                                        <div>
                                            <input required type="text" name="description" />
                                        </div>
                                    </div>
                                    <div className="add_project_start vvvv">
                                        <div>
                                            <p>Start Date</p>
                                        </div>
                                        <div>
                                            <input required type="date" name="start_date" />
                                        </div>
                                    </div>
                                    <div className="add_project_end vvvv">
                                        <div>
                                            <p>End Date</p>
                                        </div>
                                        <div>
                                            <input required type="date" name="end_date" />
                                        </div>
                                    </div>
                                </div>
                                <div className="add_project_footer">
                                    <div className="add_project_cancel" onClick={HideEditProject}>
                                        <button type="button">Cancel</button>
                                    </div>
                                    <div className="add_project_Save">
                                        <button type="submit">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {showDeleteProject ? (
                    <ChoicePopUp content={"Do you want to delete this project"} handleChoice={(choice) => handleDeleteProject(choice)} />
                ) : null}
            </div>
        </>
    );
};

export default MyProject;

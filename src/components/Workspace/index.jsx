import React, { useTransition } from "react";
import { useEffect, useState } from "react";
import "./index.css";
import { axiosData } from "../../services/axiosInstance";
import { useDispatch } from "react-redux";
import { useSelector, shallowEqual } from "react-redux";
import icon_exit from "../../asset/cross.png";
import { Link } from "react-router-dom";
import { updateNameWorkspace } from "../../redux/reducer/nameWorkspaceReducer";
import { selectAccessToken, selectUserData } from "../../redux/reducer/userReducer";
const Workspace = () => {
    const [listofWorkspace, setListWorkspace] = useState([]);
    const [listofWork, setListWork] = useState([]);
    const [showPriority, setShowPriority] = useState(false);
    const [showButtonEdit, setShowButtonEdit] = useState(false);
    const [workSpaceId, setWorkSpaceId] = useState(0);
    const [workId, setworkId] = useState(0);
    const [formAddWork, setformAddWork] = useState(false);
    const [formChangeWorkspace, setFormChangeWorkspace] = useState(false);
    // const [PriorityRes, setPriorityRes] = useState(1);
    const [listofId, setListOfId] = useState([]);
    const input_name_element = document.querySelector(".input_name input");
    const input_description_element = document.querySelector(".input_description input");
    const due_date_element = document.querySelector(".due_date input");
    const [formDeleteWorkspace, setFormDeleteWorkspace] = useState(false);
    const l = 100;
    const arr = Array(l).fill(false);
    const dispatch = useDispatch();
    const userRedux = useSelector(selectUserData);
    const accessToken = useSelector(selectAccessToken);

    useEffect(() => {
        axiosData(accessToken).get(`http://localhost:8080/api/workspace?user_id=${userRedux.user_id}`).then((response) => {
            setListWorkspace(response.data.data);
        });
        axiosData(accessToken).get(`http://localhost:8080/api/work?workspace_id=${userRedux.user_id}`).then((response) => {
            setListWork(response.data.data);
        });
    }, []);
    function openFormAddTask(a) {
        setformAddWork(!formAddWork);
        setWorkSpaceId(a);
        setShowPriority(false);
        setShowButtonEdit(false);
    }
    const handle_prevent_spread = (event) => {
        event.stopPropagation();
    };

    function handleEdit_workspace(workspace_id) {
        setWorkSpaceId(workspace_id);
        setFormChangeWorkspace(!formChangeWorkspace);
        const input_element = document.querySelector(".input_rename_workspace");
        for (let i = 0; i < listofWorkspace.length; i++) {
            if (listofWorkspace[i].id === workspace_id) {
                input_element.value = listofWorkspace[i].name;
            }
        }
    }
    function cancel_rename_workspace() {
        setFormChangeWorkspace(!formChangeWorkspace);
    }
    function handleDelete_workspace(workspace_id) {
        const newlistOfWorkspace = [];
        for (let i = 0; i < listofWorkspace.length; i++) {
            if (listofWorkspace[i].id !== workspace_id) {
                newlistOfWorkspace.push(listofWorkspace[i]);
            }
        }
        setListWorkspace(newlistOfWorkspace);
        axiosData(accessToken)
            .delete(`http://localhost:8080/api/workspace/${workspace_id}`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        setFormDeleteWorkspace(false);
    }
    function handleEdit(work_id) {
        setformAddWork(true);
        setShowButtonEdit(true);
        setworkId(work_id);
        for (let i = 0; i < listofWork.length; i++) {
            if (listofWork[i].id === work_id) {
                document.querySelector(".input_name input").value = listofWork[i].name;
                document.querySelector(".input_description input").value = listofWork[i].description;
                document.querySelector(".due_date input").value = listofWork[i].due_date.slice(0, 16);
            }
        }
    }

    function saveEditWorkspace(workspace_id) {
        const newlistofworkspace = listofWorkspace;
        const name = document.querySelector(".input_rename_workspace").value;
        for (let i = 0; i < listofWorkspace.length; i++) {
            if (listofWorkspace[i].id == workspace_id) {
                newlistofworkspace[i].name = name;
            }
        }

        setListWorkspace(newlistofworkspace);
        const updateWorkspace = {
            id: workspace_id,
            name: name,
        };
        setFormChangeWorkspace(!formChangeWorkspace);
        axiosData(accessToken)
            .put(`http://localhost:8080/api/workspace/${workspace_id}`, updateWorkspace)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log("error edit");
            });
    }
    function saveEdit(work_id) {
        const newListWork = listofWork;

        let name, description, due_date, workspace_id, isDone;
        for (let i = 0; i < listofWork.length; i++) {
            if (listofWork[i].id === work_id) {
                console.log("mai dinh cong");

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

        setformAddWork(false);
        const updateWork = {
            id: work_id,
            name: name,
            // description: newListWork[cnt].description,
            due_date: due_date,
            isDone: isDone,

            // description: newListWork[cnt].description,
            workspace_id: workspace_id,
        };

        axiosData(accessToken)
            .put(`http://localhost:8080/api/work/${work_id}`, updateWork)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log("error edit");
            });
    }
    const onSubmit = (event) => {
        event.preventDefault();
        // checkPriority();
        // setShowPriority(false)
        const { name, description, dueDate } = event.target;
        axiosData(accessToken)
            .post("http://localhost:8080/api/work", {
                name: name.value,
                description: description.value,
                due_date: dueDate.value,
                workspace_id: workSpaceId,
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
            isDone: false,
        };

        const newListOfWorks = [...listofWork, newWork];
        setListWork(newListOfWorks);
        openFormAddTask();
        document.querySelector(".input_name input").value = "";
        document.querySelector(".input_description input").value = "";
        document.querySelector(".due_date input").value = "";
        // openFormPriority(false)
    };
    const onSubmit_workspace = (event) => {
        event.preventDefault();
        const { name } = event.target;
        axiosData(accessToken)
            .post("http://localhost:8080/api/workspace", {
                name: name.value,
                user_id: userRedux.user_id,
            })

            .then((response) => {
                console.log(response);
            });
        const new_workspace = {
            name: name.value,
            user_id: userRedux.user_id,
        };
        const newlistOfWorkspace = [...listofWorkspace, new_workspace];
        setListWorkspace(newlistOfWorkspace);
    };
    const handle_showDeleteWorkspace = (id) => {
        setWorkSpaceId(id);
        setFormDeleteWorkspace(true);
    };
    const handle_hideDeleteWorkspace = () => {
        setFormDeleteWorkspace(false);
    };
    function handle_nameWorkspace(name_workspace) {
        dispatch(updateNameWorkspace(name_workspace));
    }
    return (
        <div className="container_workspace">
            <div className="icon_add_workspace">
                <div className="form_add_workspace">
                    <form onSubmit={onSubmit_workspace} method="post">
                        <div className="input_name_workspace">
                            <input required name="name" type="text" placeholder="enter the name of workspace" />
                        </div>
                        <div className="button_add_workspace">
                            <button>Add workspace</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="workspace_screen">
                {listofWorkspace.map((value1, key) => {
                    return (
                        // <Link to={`/trangchu/assignment/${value1.id}`} className='LinkTo'>
                        <div
                            key={key}
                            className="workspace_item"
                            onClick={() => {
                                handle_nameWorkspace(value1.name);
                            }}
                        >
                            <div className="div_workspace_name">
                                <Link to={`/workspace/${value1.id}`} className="LinkTo">
                                    <div className="div_p_workspace_name">
                                        <p className="workspace_name">{value1.name}</p>
                                    </div>
                                </Link>
                                <div className="workspace_item_listen">
                                    <div
                                        className="workspace_item_edit"
                                        onClick={(event) => {
                                            handleEdit_workspace(value1.id);
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
                                        className="workspace_item_delete"
                                        onClick={() => {
                                            handle_showDeleteWorkspace(value1.id);
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
                        </div>
                        //</Link>
                    );
                })}
            </div>
            <div style={{ display: formAddWork ? "block" : "none" }} className="form_add_task">
                <form onSubmit={onSubmit} method="post">
                    <div className="form_header">
                        <div className="input_name">
                            <input required name="name" type="text" placeholder="Task name"></input>
                        </div>
                        <div className="input_description">
                            <input required name="description" type="text" placeholder="Description"></input>
                        </div>
                        <div className="set_infor">
                            <div className="due_date">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="no_due_date"><path fill="currentColor" d="M12 2a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h8zm0 1H4a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1zm-1.25 7a.75.75 0 110 1.5.75.75 0 010-1.5zm.75-5a.5.5 0 110 1h-7a.5.5 0 010-1h7z"></path></svg>
                              <p>Due date</p> */}
                                <input required name="dueDate" type="datetime-local" />
                            </div>
                            {/* <div className='priority' onClick={openFormPriority}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="Gw1i-E3" data-icon-name="priority-icon" data-priority="4"><path fillRule="evenodd" clipRule="evenodd" d="M2 3a.5.5 0 01.276-.447C3.025 2.179 4.096 2 5.5 2c.901 0 1.485.135 2.658.526C9.235 2.885 9.735 3 10.5 3c1.263 0 2.192-.155 2.776-.447A.5.5 0 0114 3v6.5a.5.5 0 01-.276.447c-.749.375-1.82.553-3.224.553-.901 0-1.485-.135-2.658-.526C6.765 9.615 6.265 9.5 5.5 9.5c-1.08 0-1.915.113-2.5.329V13.5a.5.5 0 01-1 0V3zm1 5.779v-5.45C3.585 3.113 4.42 3 5.5 3c.765 0 1.265.115 2.342.474C9.015 3.865 9.599 4 10.5 4c1.002 0 1.834-.09 2.5-.279v5.45c-.585.216-1.42.329-2.5.329-.765 0-1.265-.115-2.342-.474C6.985 8.635 6.401 8.5 5.5 8.5c-1.001 0-1.834.09-2.5.279z" fill="currentColor"></path></svg>
                              <p>Priority</p>
            </div> */}
                        </div>
                    </div>
                    <div className="form_footer">
                        <div className="Cancel">
                            <button type="reset" onClick={openFormAddTask}>
                                Cancel
                            </button>
                        </div>
                        <div className="add_work" style={{ display: showButtonEdit ? "none" : "block" }}>
                            <button type="submit">Add Work</button>
                        </div>
                        <div
                            className="save_edit_work"
                            style={{ display: showButtonEdit ? "block" : "none" }}
                            onClick={() => {
                                saveEdit(workId);
                            }}
                        >
                            <button type="button">Save</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="cover_screen" style={{ display: formDeleteWorkspace ? "block" : "none" }} onClick={handle_hideDeleteWorkspace}>
                <div className="announce_delete_workspace" onClick={handle_prevent_spread}>
                    <div className="announce_delete_header ggg">
                        <div className="hghg">
                            <p>Delete Workspace</p>
                        </div>

                        <div onClick={handle_hideDeleteWorkspace}>
                            <img src={icon_exit} alt="" />
                        </div>
                    </div>
                    <div className="ggg2">
                        <p>There is no way to recover a workspace once it has been deleted.</p>
                    </div>
                    <div className="delete_workspace_footer">
                        <div className="cancel_delete_workspace" onClick={handle_hideDeleteWorkspace}>
                            <button>Cancel</button>
                        </div>
                        <div
                            className="accept_delete_workspace"
                            onClick={() => {
                                handleDelete_workspace(workSpaceId);
                            }}
                        >
                            <button>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="screen_cover" style={{ display: formChangeWorkspace ? "block" : "none" }}>
                <div className="form_change_workspace">
                    <form method="post">
                        <div className="title_rename">
                            <p>Rename workspace</p>
                        </div>
                        <div className="rename_workspace">
                            <input className="input_rename_workspace" />
                        </div>
                        <div className="button_workspace_rename">
                            <div className="save_rename_workspace">
                                <button type="button" onClick={() => saveEditWorkspace(workSpaceId)} className="button_rename_workspace">
                                    Rename
                                </button>
                            </div>
                            <div className="cancel_rename_workspace">
                                <button type="reset" onClick={cancel_rename_workspace}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Workspace;

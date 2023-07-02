import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { Link } from "react-router-dom";
import { FcAlarmClock, FcPlanner, FcConferenceCall } from "react-icons/fc";
import logo_circle_project from "../../asset/new-moon.png";
import logo_exit from "../../asset/cross.png";
import { selectUserData } from "../../redux/reducer/userReducer";

import { updateNameProject } from "../../redux/reducer/nameProjectReducer";

import { selectRenderSidebar } from "../../redux/reducer/renderSidebar";
import { updateRenderSidebar } from "../../redux/reducer/renderSidebar";
function handle_menu() {
    const home_page_element = document.getElementById("home_page_container");
    home_page_element.style.gridTemplateColumns = "0fr 1fr";
    console.log(home_page_element);
}
var projectName = "";

const Sidebar = () => {
    const dispatch = useDispatch();
    const [listOfProject, setlistOfProject] = useState([]);
    const [showListProject, setshowListProject] = useState(false);
    const [showAddProject, setShowAddProject] = useState(false);
    const userRedux = useSelector(selectUserData);
    const renderSidebar = useSelector(selectRenderSidebar);

    useEffect(() => {
        // const fetchData = async()=>{
        //   await axios.get(`http://localhost:8080/api/project?user_id=${userRedux.user_id}`)
        //   .then((response)=>{
        //     console.log(response.data.data)
        //     setlistOfProject(response.data.data)
        //   })
        // }
        const fetchData = async () => {
            await axios.get(`http://localhost:8080/api/project?user_id=1`).then((response) => {
                //console.log(response.data.data)
                setlistOfProject(response.data.data);
            });
        };
        fetchData();
        dispatch(updateRenderSidebar(false));
    }, [renderSidebar]);

    function show_project_selected(projectname) {
        dispatch(updateNameProject(projectname));
    }
    const showListItem = () => {
        setshowListProject(!showListProject);
    };
    const addNewProject = (event) => {
        event.stopPropagation();
        setShowAddProject(!showAddProject);
    };
    const hideAddProject = () => {
        console.log("day la 1");
        setShowAddProject(false);
    };
    const handle_click_form = (event) => {
        event.stopPropagation();
    };
    const submitAddProject = (event) => {
        event.preventDefault();
        const { name, description, start_date, end_date } = event.target;

        console.log(name.value);
        axios
            .post("http://localhost:8080/api/project", {
                name: name.value,
                description: description.value,
                start_date: start_date.value,
                end_date: end_date.value,
                status: "Pending",
                user_id: userRedux.user_id,
            })
            .then((response) => {
                console.log(response);
            });
        hideAddProject();
    };
    return (
        <div className="sidebar_container">
            <div className="container">
                {/* <div className="menu">
                    <img onClick={handle_menu} className="icon" src={logo_menu} alt="" />
                </div> */}

                <Link to="/today">
                    <div className="today item">
                        <div className="div_icon">
                            <FcAlarmClock className="sb_icon" />
                        </div>
                        <div className="div_title">
                            <span>Today</span>
                        </div>
                    </div>
                </Link>
                <Link to="/workspace">
                    <div className="assignment item">
                        <div className="div_icon">
                            <FcPlanner className="sb_icon" />
                        </div>
                        <div className="div_title">
                            <span>WorkSpace</span>
                        </div>
                    </div>
                </Link>

                <div className="project_head item" onClick={showListItem}>
                    <div className="div_icon">
                        <FcConferenceCall className="sb_icon" />
                    </div>
                    <div className="div_title" id="div_title_project">
                        <div className="project_all_title">
                            <span>Project</span>
                        </div>
                    </div>
                    <div className="add_or_show">
                        <div className="icon_add_project" onClick={addNewProject}>
                            <button>
                                <svg width="13" height="13">
                                    <path
                                        d="M6 6V.5a.5.5 0 011 0V6h5.5a.5.5 0 110 1H7v5.5a.5.5 0 11-1 0V7H.5a.5.5 0 010-1H6z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div className="icon_show_project">
                            <button>
                                <svg width="16" height="16" viewBox="0 0 16 16" className="aqv2kvH">
                                    <path
                                        d="M14 5.758L13.156 5 7.992 9.506l-.55-.48.002.002-4.588-4.003L2 5.77 7.992 11 14 5.758"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="list_of_project" style={{ display: showListProject ? "block" : "none" }}>
                    {listOfProject?.map((value, key) => {
                        return (
                            <Link key={key} onClick={() => show_project_selected(value.project_name)} to={`/project/${value.project_id}`}>
                                <div className="project_item">
                                    <div className="circle_project">
                                        <img src={logo_circle_project}></img>
                                    </div>
                                    <div className="name_project">{value.project_name}</div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className="cover_screen" style={{ display: showAddProject ? "block" : "none" }} onClick={hideAddProject}>
                <div className="add_project_container" onClick={handle_click_form}>
                    <div className="form_add_project">
                        <form onSubmit={submitAddProject} method="post">
                            <div className="add_project_header">
                                <div>
                                    <h3>Add Project</h3>
                                </div>
                                <div className="add_project_header2" onClick={hideAddProject}>
                                    <img src={logo_exit} alt="" />
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
                                <div className="add_project_cancel" onClick={hideAddProject}>
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
        </div>
    );
};

export default Sidebar;
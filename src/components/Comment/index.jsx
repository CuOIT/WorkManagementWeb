import React, { useState, useEffect, memo } from "react";
import "./index.css";
import { axiosData } from "../../services/axiosInstance";
import icon_moon from "../../asset/new-moon.png";
import icon_calendar from "../../asset/calendar.png";

const Comment = ({ onCancel, onDone, task, project_name }) => {
    const [user, setUser] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axiosData.get(`/api/project/task/comments?task_id=${task.id}`);
            setComments(response.data.data);
        } catch (error) {
            console.error("Error :", error);
        }
    };
    useEffect(() => {
        console.log("Hi");
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        setUser(user);
        fetchData();
    }, []);

    const handleComment = async () => {
        if (!comment) alert("Comment is not empty");
        try {
            await axiosData.post(`/api/project/task/comment`, {
                task_id: task.id,
                comment: comment,
                user_id: user.user_id,
            });
            const response = await axiosData.get(`/api/project/task/comments?task_id=${task.id}`);
            setComments(response.data.data);
        } catch (err) {
            console.log(err);
        }
        setComment("");
    };

    const ConvertTime = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} `;
        return formattedDate;
    };

    const [showing, setShowing] = useState(true);
    const handleShow = () => {
        const icon = document.querySelector(".content .comment .action .arrow svg");
        if (!showing) {
            icon.style.transform = "rotate(0)";
        } else icon.style.transform = "rotate(-90deg)";
        setShowing(!showing);
    };

    const handleDelete = async (idx) => {
        try {
            await axiosData.delete(`/api/project/task/delete-comment/${idx}`);
            const response = await axiosData.get(`/api/project/task/comments?task_id=${task.id}`);
            setComments(response.data.data);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleDone = () => {
        if (typeof onDone === "function") {
            onDone();
        }
        handleCancel();
    };

    const handleCancel = () => {
        if (typeof onCancel === "function") {
            onCancel();
        }
    };

    const convertDate = (dueDate) => {
        const dateParts = dueDate.split("-");
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        const formattedDueDate = `${day}-${month}`;
        return formattedDueDate;
    };

    // Đoạn này là chỉnh sửa task nhé

    return (
        <div className="edit_screen">
            <div className="header_edit">
                <p>Review Task</p>
                <button type="button" onClick={handleCancel}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20">
                        <path
                            fill="currentColor"
                            d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"
                        ></path>
                    </svg>
                </button>
            </div>

            <div className="body">
                <div className="content">
                    <div className="name">
                        <div className="taskname">
                            <button className="task_checkbox" onClick={() => handleDone(task.id)}>
                                <svg width="24" height="18"></svg>
                            </button>
                            <div className="content1">
                                <div className="task_content1">
                                    <input value={task.name} placeholder="Taskname" required />
                                </div>
                                <div className="task_description">
                                    <textarea value={task.description} placeholder="Description" required />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="comment">
                        <button className="action" onClick={handleShow}>
                            <div className="arrow">
                                <svg width="16" height="16" viewBox="0 0 16 16" className="aqv2kvH">
                                    <path
                                        d="M14 5.758L13.156 5 7.992 9.506l-.55-.48.002.002-4.588-4.003L2 5.77 7.992 11 14 5.758"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>
                            <span className="comment">Comments</span>
                        </button>
                        <div className="commentlist" style={{ display: showing ? "block" : "none" }}>
                            {comments?.map((data, index) => {
                                console.log(data);
                                return (
                                    <div key={index} className="comment_content">
                                        <div className="avatar">
                                            <div className="avatar2">
                                                <div>
                                                    <p>{data.User.user_name.slice(0, 1)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="noway">
                                            <div className="name_action">
                                                <span className="username">{data.User.user_name} </span>
                                                <div className="time_comment">{ConvertTime(data.created_at)}</div>
                                                <button className="delete_cmt" onClick={() => handleDelete(data.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20">
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
                                                </button>
                                            </div>
                                            <div className="content_cmt">
                                                <p>{data.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="add_cmt">
                                <div className="avatar">
                                    <div className="avatar2">
                                        <div>
                                            <p className="user_comment">{user?.user_name.slice(0, 1)}</p>
                                        </div>
                                    </div>
                                </div>
                                <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder="Add Comment" />
                                <button onClick={handleComment}>
                                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            clip-rule="evenodd"
                                            d="M7.18 6.396C7 6.642 7 7.054 7 7.878V11l6.715.674c.38.038.38.614 0 .652L7 13v3.122c0 .824 0 1.236.18 1.482.157.214.4.356.669.39.308.041.687-.15 1.444-.531l8.183-4.122c.861-.434 1.292-.651 1.432-.942a.915.915 0 000-.798c-.14-.29-.57-.508-1.433-.942l-8.18-4.122c-.758-.381-1.137-.572-1.445-.532a.986.986 0 00-.67.391z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="side">
                    <div className="prj_name">
                        <p>Project</p>
                        <div>
                            <img src={icon_moon} alt="" />
                            {project_name}
                        </div>
                    </div>

                    <div className="due_date">
                        <p>Due date</p>
                        <div>
                            <img src={icon_calendar} alt="" />
                            {convertDate(task.due_date)}
                        </div>
                    </div>

                    <div className="assigned_to">
                        <p>Assigned</p>
                        <div>Pemond</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Comment);

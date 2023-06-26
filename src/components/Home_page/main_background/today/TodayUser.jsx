import React from "react";
import { useEffect, useState } from "react";
import "./today.css";
import axios from "axios";
import { axiosData } from "../../../../services/axiosInstance";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUserData } from "./../../../../redux/reducer/userReducer";
import { verifyExpiredToken } from "../../../../services/verifyAccessToken";

const TodoList = () => {
    const accessTokenStore = useSelector(selectAccessToken);
    const userStore = useSelector(selectUserData);
    const [date, setDate] = useState("");
    const [currentTodo, setCurrentTodo] = useState(null);
    const [newTodo, setNewTodo] = useState(null);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = ("0" + (today.getMonth() + 1)).slice(-2);
        const days = ("0" + today.getDate()).slice(-2);
        const todayString = year + "-" + month + "-" + days;
        const displayToday = days + "-" + month + "-" + year;
        setDate(todayString);
        document.getElementById("today").innerHTML = displayToday;
        document.getElementById("data-day").setAttribute("data-day", todayString);
        const fetchData = async () => {
            try {
                const response = await axiosData(accessTokenStore).get(`/api/to-do?user_id=${userStore.user_id}&date=${todayString}`);
                const todoList = response.data.data;
                todoList.sort((a, b) => a.level - b.level);
                setTodos(response.data.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchData();
    }, []);

    const handleCancelCreateTodo = () => {
        console.log({ currentTodo });
        const form = document.querySelector(".form_add");
        const add = document.querySelector(".add_task");
        form.style.display = "none";
        add.style.display = "block";
        setNewTodo(null);
    };

    const handleAddTodo = () => {
        const form = document.querySelector(".form_add");
        const add = document.querySelector(".add_task");
        form.style.display = "block";
        add.style.display = "none";
    };

    const handleSubmitCreateTodo = async (event) => {
        event.preventDefault();
        if (newTodo?.start_time > newTodo?.end_time) {
            alert("Start_time is not greater than end_time");
            return;
        }
        const updatedNewTodo = {
            ...newTodo,
            date,
            level: newTodo.priority,
            user_id: userStore.user_id,
        };
        try {
            const res = await axiosData(accessTokenStore).post("/api/to-do", updatedNewTodo);
            const fetchData = async () => {
                try {
                    const response = await axiosData(accessTokenStore).get(`/api/to-do?user_id=${userStore.user_id}&date=${date}`);
                    const todoList = response.data.data;
                    todoList.sort((a, b) => a.level - b.level);
                    setTodos(response.data.data);
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                }
            };
            fetchData();
        } catch (err) {
            console.log(err);
        }
        handleCancelCreateTodo();
    };

    const handleEditTodo = (id) => {
        const form_task = document.getElementById(`form_task-${id}`);
        const form_time = document.getElementById(`time-${id}`);
        const form_edit = document.getElementById(`form_edit-${id}`);
        form_task.style.display = "none";
        form_time.style.display = "none";
        form_edit.style.display = "block";
        const todo = todos.find((item) => item.id === id);
        setCurrentTodo(todo);
    };

    const handleCancelEditTodo = (id) => {
        const form_task = document.getElementById(`form_task-${id}`);
        const form_time = document.getElementById(`time-${id}`);
        const form_edit = document.getElementById(`form_edit-${id}`);
        form_task.style.display = "flex";
        form_time.style.display = "block";
        form_edit.style.display = "none";
        setCurrentTodo(null);
    };

    const handleSubmitEditTodo = async (id) => {
        if (!currentTodo.name) {
            alert("Task name is not empty!");
            return;
        }
        const updatedTodo = {
            id: id,
            name: currentTodo.name,
            date,
            start_time: currentTodo.start_time,
            end_time: currentTodo.end_time,
            level: currentTodo.priority,
        };
        try {
            const res = await axiosData(accessTokenStore).put(`/api/to-do/${id}`, updatedTodo);
            const fetchData = async () => {
                try {
                    const response = await axiosData(accessTokenStore).get(`/api/to-do?user_id=${userStore.user_id}&date=${date}`);
                    const todoList = response.data.data;
                    todoList.sort((a, b) => a.level - b.level);
                    setTodos(response.data.data);
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                }
            };
            fetchData();
        } catch (err) {
            console.log(err);
        }

        handleCancelEditTodo(id);
    };

    const handleCompleted = async (todo) => {
        try {
            const decodedToken = verifyExpiredToken(accessTokenStore);

            const updatedTodo = { ...todo, completed: !todo.completed };
            const res = await axiosData(accessTokenStore).put(`/api/to-do/${todo.id}`, updatedTodo);
            const fetchData = async () => {
                try {
                    const response = await axiosData(accessTokenStore).get(`/api/to-do?user_id=${userStore.user_id}&date=${date}`);
                    const todoList = response.data.data;
                    todoList.sort((a, b) => a.level - b.level);
                    setTodos(response.data.data);
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                }
            };
            fetchData();
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await axiosData(accessTokenStore).delete(`/api/to-do/${id}`);
            const deletedTodos = todos.filter((item) => item.id !== id);
            setTodos(deletedTodos);
            todos.sort((a, b) => a.level - b.level);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const [showingPriorityDropList, setShowingPriorityDropList] = useState(false);
    const handlePri = () => {
        setShowingPriorityDropList(!showingPriorityDropList);
    };

    return (
        <div className="form">
            {console.log(todos)}
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
                        {todos?.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    className="task_list"
                                    id={item.id}
                                    style={{
                                        textDecoration: item.completed ? "line-through" : "none",
                                    }}
                                >
                                    <div className="form_task" id={`form_task-${item.id}`}>
                                        <button className="task_checkbox" id={`priority-${item.level}`} onClick={() => handleCompleted(item)}>
                                            <svg width="24" height="18" aria-checked="false">
                                                <path
                                                    fill="currentColor"
                                                    d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"
                                                ></path>
                                            </svg>
                                        </button>
                                        <div className="tasklist_content">
                                            <div className="task_content">{item.name}</div>
                                        </div>
                                        <div className="task_action">
                                            <button className="edit_task" id="action" onClick={() => handleEditTodo(item.id)}>
                                                <svg width="24" height="20">
                                                    <g fill="none" fillRule="evenodd">
                                                        <path fill="currentColor" d="M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z"></path>
                                                        <path
                                                            stroke="currentColor"
                                                            d="M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z"
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </button>

                                            <button className="delete_task" id="action" onClick={() => handleDeleteTodo(item.id)}>
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
                                    </div>
                                    <div className="task_time" id={`time-${item.id}`}>
                                        <small>
                                            {item.start_time?.slice(0, 5) || "xx : xx"} - {item.end_time?.slice(0, 5) || "xx : xx"}
                                        </small>
                                    </div>

                                    <div className="form_edit" id={`form_edit-${item.id}`}>
                                        <div className="task_edit">
                                            <div className="task_edit_input">
                                                <div className="task_content">
                                                    <input
                                                        value={currentTodo?.name}
                                                        onChange={(e) =>
                                                            setCurrentTodo({
                                                                ...currentTodo,
                                                                name: e.target.value,
                                                            })
                                                        }
                                                        placeholder="Task name"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="task_edit_action">
                                                <input
                                                    type="time"
                                                    value={currentTodo?.start_time.slice(0,5) || ""}
                                                    onChange={(e) => {
                                                        console.log(e.target.value)
                                                        setCurrentTodo({
                                                            ...currentTodo,
                                                            start_time: e.target.value
                                                        });
                                                        console.log(currentTodo?.start_time)
                                                    }}
                                                    className="due_date"
                                                />
                                                <input
                                                    type="time"
                                                    value={currentTodo?.end_time.slice(0, 5) || ""}
                                                    onChange={(e) =>
                                                        setCurrentTodo({
                                                            ...currentTodo,
                                                            end_time: e.target.value
                                                        })
                                                    }
                                                    className="due_date"
                                                />
                                                <div className="priority1" id={`pri-${currentTodo?.priority || currentTodo?.level}`} onClick={handlePri}>
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="Gw1i-E3"
                                                        data-icon-name="priority-icon"
                                                        data-priority="4"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M2 3a.5.5 0 01.276-.447C3.025 2.179 4.096 2 5.5 2c.901 0 1.485.135 2.658.526C9.235 2.885 9.735 3 10.5 3c1.263 0 2.192-.155 2.776-.447A.5.5 0 0114 3v6.5a.5.5 0 01-.276.447c-.749.375-1.82.553-3.224.553-.901 0-1.485-.135-2.658-.526C6.765 9.615 6.265 9.5 5.5 9.5c-1.08 0-1.915.113-2.5.329V13.5a.5.5 0 01-1 0V3zm1 5.779v-5.45C3.585 3.113 4.42 3 5.5 3c.765 0 1.265.115 2.342.474C9.015 3.865 9.599 4 10.5 4c1.002 0 1.834-.09 2.5-.279v5.45c-.585.216-1.42.329-2.5.329-.765 0-1.265-.115-2.342-.474C6.985 8.635 6.401 8.5 5.5 8.5c-1.001 0-1.834.09-2.5.279z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </svg>
                                                    <p>Priority {currentTodo?.priority || currentTodo?.level}</p>
                                                    <ul
                                                        className="select_priority"
                                                        style={{
                                                            display: showingPriorityDropList ? "block" : "none",
                                                        }}
                                                    >
                                                        <li
                                                            className="pri1"
                                                            onClick={() =>
                                                                setCurrentTodo({
                                                                    ...currentTodo,
                                                                    priority: 1,
                                                                })
                                                            }
                                                        >
                                                            <span aria-hidden="true" className="priority_picker_item_priority_icon">
                                                                <svg
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="Gw1i-E3"
                                                                    data-icon-name="priority-icon"
                                                                    data-priority="1"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                            </span>
                                                            <p>Priority 1</p>
                                                        </li>
                                                        <li
                                                            className="pri2"
                                                            onClick={() =>
                                                                setCurrentTodo({
                                                                    ...currentTodo,
                                                                    priority: 2,
                                                                })
                                                            }
                                                        >
                                                            <span aria-hidden="true" className="priority_picker_item_priority_icon">
                                                                <svg
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="Gw1i-E3"
                                                                    data-icon-name="priority-icon"
                                                                    data-priority="2"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                            </span>
                                                            <p>Priority 2</p>
                                                        </li>
                                                        <li
                                                            className="pri3"
                                                            onClick={() =>
                                                                setCurrentTodo({
                                                                    ...currentTodo,
                                                                    priority: 3,
                                                                })
                                                            }
                                                        >
                                                            <span aria-hidden="true" className="priority_picker_item_priority_icon">
                                                                <svg
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="Gw1i-E3"
                                                                    data-icon-name="priority-icon"
                                                                    data-priority="3"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                            </span>
                                                            <p>Priority 3</p>
                                                        </li>
                                                        <li
                                                            className="pri4"
                                                            onClick={() =>
                                                                setCurrentTodo({
                                                                    ...currentTodo,
                                                                    priority: 4,
                                                                })
                                                            }
                                                        >
                                                            <span aria-hidden="true" className="priority_picker_item_priority_icon">
                                                                <svg
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="Gw1i-E3"
                                                                    data-icon-name="priority-icon"
                                                                    data-priority="3"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                            </span>
                                                            <p>Priority 4</p>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <button type="button" className="cancel" onClick={() => handleCancelEditTodo(currentTodo.id)}>
                                                    <svg viewBox="0 0 24 24" className="icon_close" width="24" height="24">
                                                        <path
                                                            fill="currentColor"
                                                            fillRule="nonzero"
                                                            d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"
                                                        ></path>
                                                    </svg>
                                                </button>
                                                <button type="button" className="add_submit" onClick={() => handleSubmitEditTodo(item.id)}>
                                                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M7.18 6.396C7 6.642 7 7.054 7 7.878V11l6.715.674c.38.038.38.614 0 .652L7 13v3.122c0 .824 0 1.236.18 1.482.157.214.4.356.669.39.308.041.687-.15 1.444-.531l8.183-4.122c.861-.434 1.292-.651 1.432-.942a.915.915 0 000-.798c-.14-.29-.57-.508-1.433-.942l-8.18-4.122c-.758-.381-1.137-.572-1.445-.532a.986.986 0 00-.67.391z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                        <li className="add_task" onClick={handleAddTodo}>
                            <button>
                                <span className="icon_add">
                                    <svg width="24" height="20">
                                        <path
                                            d="M6 6V.5a.5.5 0 011 0V6h5.5a.5.5 0 110 1H7v5.5a.5.5 0 11-1 0V7H.5a.5.5 0 010-1H6z"
                                            fill="currentColor"
                                            fillRule="evenodd"
                                        ></path>
                                    </svg>
                                </span>
                                <p>Add task</p>
                            </button>
                        </li>

                        <form className="form_add" onSubmit={handleSubmitCreateTodo}>
                            <div className="task_edit">
                                <div className="task_edit_input">
                                    <div className="task_content">
                                        {console.log({ newTodo })}
                                        <input
                                            value={newTodo?.name || ""}
                                            onChange={(e) =>
                                                setNewTodo({
                                                    ...newTodo,
                                                    name: e.target.value,
                                                })
                                            }
                                            placeholder="Task name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="task_edit_action">
                                    <input
                                        type="time"
                                        value={newTodo?.start_time}
                                        onChange={(e) => {
                                            setNewTodo({
                                                ...newTodo,
                                                start_time: e.target.value,
                                            });
                                        }}
                                        className="due_date"
                                    />
                                    <input
                                        type="time"
                                        value={newTodo?.end_time || ""}
                                        onChange={(e) =>
                                            setNewTodo({
                                                ...newTodo,
                                                end_time: e.target.value,
                                            })
                                        }
                                        className="due_date"
                                    />
                                    <div className="priority1" id={`pri-${newTodo?.priority || 4}`} onClick={handlePri}>
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="Gw1i-E3"
                                            data-icon-name="priority-icon"
                                            data-priority="4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M2 3a.5.5 0 01.276-.447C3.025 2.179 4.096 2 5.5 2c.901 0 1.485.135 2.658.526C9.235 2.885 9.735 3 10.5 3c1.263 0 2.192-.155 2.776-.447A.5.5 0 0114 3v6.5a.5.5 0 01-.276.447c-.749.375-1.82.553-3.224.553-.901 0-1.485-.135-2.658-.526C6.765 9.615 6.265 9.5 5.5 9.5c-1.08 0-1.915.113-2.5.329V13.5a.5.5 0 01-1 0V3zm1 5.779v-5.45C3.585 3.113 4.42 3 5.5 3c.765 0 1.265.115 2.342.474C9.015 3.865 9.599 4 10.5 4c1.002 0 1.834-.09 2.5-.279v5.45c-.585.216-1.42.329-2.5.329-.765 0-1.265-.115-2.342-.474C6.985 8.635 6.401 8.5 5.5 8.5c-1.001 0-1.834.09-2.5.279z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                        <p>Priority {newTodo?.priority || "4"}</p>
                                        <ul
                                            className="select_priority"
                                            style={{
                                                display: showingPriorityDropList ? "block" : "none",
                                            }}
                                        >
                                            <li
                                                className="pri1"
                                                onClick={() =>
                                                    setNewTodo({
                                                        ...newTodo,
                                                        priority: 1,
                                                    })
                                                }
                                            >
                                                <span aria-hidden="true" className="priority_picker_item_priority_icon">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="Gw1i-E3"
                                                        data-icon-name="priority-icon"
                                                        data-priority="1"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </svg>
                                                </span>
                                                <p>Priority 1</p>
                                            </li>
                                            <li
                                                className="pri2"
                                                onClick={() =>
                                                    setNewTodo({
                                                        ...newTodo,
                                                        priority: 2,
                                                    })
                                                }
                                            >
                                                <span aria-hidden="true" className="priority_picker_item_priority_icon">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="Gw1i-E3"
                                                        data-icon-name="priority-icon"
                                                        data-priority="2"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </svg>
                                                </span>
                                                <p>Priority 2</p>
                                            </li>
                                            <li
                                                className="pri3"
                                                onClick={() =>
                                                    setNewTodo({
                                                        ...newTodo,
                                                        priority: 3,
                                                    })
                                                }
                                            >
                                                <span aria-hidden="true" className="priority_picker_item_priority_icon">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="Gw1i-E3"
                                                        data-icon-name="priority-icon"
                                                        data-priority="3"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </svg>
                                                </span>
                                                <p>Priority 3</p>
                                            </li>
                                            <li
                                                className="pri4"
                                                onClick={() =>
                                                    setNewTodo({
                                                        ...newTodo,
                                                        priority: 4,
                                                    })
                                                }
                                            >
                                                <span aria-hidden="true" className="priority_picker_item_priority_icon">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="Gw1i-E3"
                                                        data-icon-name="priority-icon"
                                                        data-priority="3"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </svg>
                                                </span>
                                                <p>Priority 4</p>
                                            </li>
                                        </ul>
                                    </div>

                                    <button type="button" className="cancel" onClick={handleCancelCreateTodo}>
                                        <svg viewBox="0 0 24 24" className="icon_close" width="24" height="24">
                                            <path
                                                fill="currentColor"
                                                fillRule="nonzero"
                                                d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"
                                            ></path>
                                        </svg>
                                    </button>
                                    <button type="button" className="add_submit" type="submit">
                                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.18 6.396C7 6.642 7 7.054 7 7.878V11l6.715.674c.38.038.38.614 0 .652L7 13v3.122c0 .824 0 1.236.18 1.482.157.214.4.356.669.39.308.041.687-.15 1.444-.531l8.183-4.122c.861-.434 1.292-.651 1.432-.942a.915.915 0 000-.798c-.14-.29-.57-.508-1.433-.942l-8.18-4.122c-.758-.381-1.137-.572-1.445-.532a.986.986 0 00-.67.391z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
import React from "react";
import { useEffect, useState } from "react";
import "./today.css";
import { axiosData } from "../../services/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectUserData } from "../../redux/reducer/userReducer";
import { verifyExpiredToken } from "../../services/verifyAccessToken";
import { GrAdd } from "react-icons/gr";
import { BsFlagFill } from "react-icons/bs";

import Todo from "../Todo";
import { add_todo, selectToDoList, set_todoList } from "../../redux/reducer/todolistReducer";

const TodoList = () => {
    const accessTokenStore = useSelector(selectAccessToken);
    const userStore = useSelector(selectUserData);
    const todoList = useSelector(selectToDoList);
    const [date, setDate] = useState("");
    const [newTodo, setNewTodo] = useState(null);
    const [showLevel, setShowLevel] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = ("0" + (today.getMonth() + 1)).slice(-2);
        const days = ("0" + today.getDate()).slice(-2);
        const todayString = year + "-" + month + "-" + days;
        const displayToday = days + "-" + month + "-" + year;
        setDate(todayString);
        console.log(todoList);
        document.getElementById("today").innerHTML = displayToday;
        const fetchData = async () => {
            if (accessTokenStore && userStore) {
                try {
                    const response = await axiosData(accessTokenStore).get(`/api/to-do?user_id=${userStore.user_id}&date=${todayString}`);
                    const ftodoList = response.data.data;
                    ftodoList.sort((a, b) => a.level - b.level);
                    console.log(ftodoList);
                    dispatch(set_todoList(ftodoList));
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                }
            } else {
                const ftodoList = JSON.parse(localStorage.getItem("todoList"));
                ftodoList = ftodoList ? ftodoList : [];
                ftodoList.sort((a, b) => a.level - b.level);
                dispatch(set_todoList(ftodoList));
            }
        };
        fetchData();
    }, []);
    const handleCancelCreateTodo = () => {
        setNewTodo(null);
        const form = document.querySelector(".form_add");
        const add = document.querySelector(".add_task");
        form.style.display = "none";
        add.style.display = "block";
    };

    const handleButtonAddTodo = () => {
        console.log({ newTodo });
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
        const time = new Date();
        const now = time.getTime();
        const updatedNewTodo = {
            ...newTodo,
            date,
            level: newTodo.level,
            user_id: userStore?.user_id,
            id: now,
            new: true,
        };
        dispatch(add_todo(updatedNewTodo));
        // try {
        //     const res = await axiosData(accessTokenStore).post("/api/to-do", updatedNewTodo);
        //     const fetchData = async () => {
        //         try {
        //             const response = await axiosData(accessTokenStore).get(`/api/to-do?user_id=${userStore.user_id}&date=${date}`);
        //             const todoList = response.data.data;
        //             todoList.sort((a, b) => a.level - b.level);
        //             setTodoList(response.data.data);
        //         } catch (error) {
        //             console.error("Error fetching tasks:", error);
        //         }
        //     };
        //     fetchData();
        // } catch (err) {
        //     console.log(err);
        // }
        handleCancelCreateTodo();
    };

    const handleSaveTodoList = async () => {
        const promiseList = [];
        if (accessTokenStore) {
            todoList.forEach((item) => {
                if (item.delete) {
                    todoList = todoList.filter((x) => {
                        return item.id !== x.id;
                    });
                    if (!item.new) {
                        const newPromise = new Promise(async (resolve, reject) => {
                            try {
                                await axiosData(accessTokenStore).delete(`/api/to-do/${item.id}`);
                                resolve("Success");
                            } catch (error) {
                                reject(error);
                            }
                        });
                        promiseList.push(newPromise);
                    }
                } else if (item.new) {
                    const { user_id, name, start_time, end_time, date, level, completed } = { item };
                    const newTodo = { user_id, name, start_time, end_time, date, level, completed };
                    const newPromise = new Promise(async (resolve, reject) => {
                        try {
                            await axiosData(accessTokenStore).post("/api/todo", newTodo);
                            resolve("Success");
                        } catch (error) {
                            reject(error);
                        }
                    });
                    promiseList.push(newPromise);
                } else if (item.edit) {
                    const { name, start_time, end_time, date, level, completed } = { item };
                    const eidtTodo = { name, start_time, end_time, date, level, completed };
                    const newPromise = new Promise(async (resolve, reject) => {
                        try {
                            await axiosData(accessTokenStore).put(`/api/todo/${item.id}`, eidtTodo);
                            resolve("Success");
                        } catch (error) {
                            reject(error);
                        }
                    });
                    promiseList.push(newPromise);
                }
            });
            Promise.all(promiseList);
        } else {
            todoList.forEach((item) => {
                if (item.delete) {
                    todoList = todoList.filter((x) => {
                        return item.id !== x.id;
                    });
                } else if (item.new) {
                    delete item.new;
                } else if (item.edit) {
                    item.edit = false;
                }
            });
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
    };
    return (
        <div className="todolist-container">
            <div className="view_header">
                <div className="date">
                    <h2>Let's see what you need to do today!</h2>
                    <small id="today"></small>
                </div>
            </div>
            <div className="save-todolist">
                <button id="save-todolist-button" onClick={handleSaveTodoList}>
                    Save
                </button>
            </div>
            <div className="todolist-content">
                <div className="todolist">
                    {console.log(todoList)}
                    {todoList?.map((item, index) => {
                        if (item !== null) return <Todo todo={item} index={index} />;
                    })}
                </div>

                <div className="add_task" onClick={handleButtonAddTodo}>
                    <button>
                        <GrAdd />
                        <p>Add task</p>
                    </button>
                </div>
                <div className="form_add">
                    <div className="task_edit">
                        <div className="task_edit_input">
                            <div className="task_content">
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
                                value={newTodo?.start_time || ""}
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
                            <div className="priority1" onClick={() => setShowLevel(!showLevel)}>
                                <BsFlagFill className={`level-${newTodo?.level}`} />
                                <p>Level {newTodo?.level || ""}</p>
                                <ul className={`select-level`} style={{ display: showLevel ? "block" : "none" }}>
                                    {[1, 2, 3, 4].map((level, index) => (
                                        <li
                                            className="level"
                                            key={index}
                                            onClick={() => {
                                                setNewTodo({
                                                    ...newTodo,
                                                    level,
                                                });
                                            }}
                                        >
                                            <BsFlagFill className={`level-${level}`} />
                                            <p className="lv">Level {level}</p>
                                        </li>
                                    ))}
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
                            <button type="button" className="add_submit" onClick={handleSubmitCreateTodo}>
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
            </div>
        </div>
    );
};

export default TodoList;

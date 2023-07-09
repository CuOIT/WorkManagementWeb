import React from "react";
import { useEffect, useState } from "react";
import "./index.css";
import { axiosData } from "../../services/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { GrAdd } from "react-icons/gr";

import Todo from "../Todo";
import { add_todo, selectTodoList, set_todoList } from "../../redux/reducer/todolistReducer";

const TodoList = () => {
    const [user_id, setUser_id] = useState(null);
    const todoList = useSelector(selectTodoList);
    const [date, setDate] = useState("");
    const dispatch = useDispatch();
    const fetchTodoList = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const user_id = user?.user_id;
        setUser_id(user_id);
        const today = new Date();
        const year = today.getFullYear();
        const month = ("0" + (today.getMonth() + 1)).slice(-2);
        const days = ("0" + today.getDate()).slice(-2);
        const todayString = year + "-" + month + "-" + days;
        const displayToday = days + "-" + month + "-" + year;
        document.getElementById("today").innerHTML = displayToday;
        setDate(todayString);
        if (user_id) {
            try {
                const response = await axiosData.get(`/api/to-do?user_id=${user_id}&date=${todayString}`);
                const ftodoList = response.data.data;
                ftodoList.sort((a, b) => a.level - b.level);
                console.log(ftodoList);
                dispatch(set_todoList(ftodoList));
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        } else {
            let ftodoList = JSON.parse(localStorage.getItem("todoList"));
            ftodoList = ftodoList ? ftodoList : [];
            ftodoList.sort((a, b) => a.level - b.level);
            dispatch(set_todoList(ftodoList));
        }
    };
    useEffect(() => {
        fetchTodoList();
    }, []);

    const handleButtonAddTodo = () => {
        const newTodo = {
            id: 0,
            name: "",
            start_time: "",
            end_time: "",
            level: 4,
            completed: false,
            date,
            user_id,
            new: true,
            edit: false,
            deleted: false,
        };
        dispatch(add_todo(newTodo));
    };

    const handleSaveTodoList = async () => {
        const promiseList = [];
        if (user_id) {
            console.log({ todoList });

            todoList.forEach((item) => {
                console.log({ item });
                if (item.deleted) {
                    const newTodoList = todoList.filter((x) => {
                        return item.id !== x.id;
                    });
                    dispatch(set_todoList(newTodoList));
                    if (!item.new) {
                        const newPromise = new Promise(async (resolve, reject) => {
                            try {
                                await axiosData.delete(`/api/to-do/${item.id}`);
                                resolve("Success");
                            } catch (error) {
                                reject(error);
                            }
                        });
                        promiseList.push(newPromise);
                    }
                } else if (item.new && item.edit === true) {
                    item = { ...item, new: false };
                    const { name, start_time, end_time, date, level, completed, user_id } = item;
                    const newTodo = { name, start_time, end_time, date, level, completed, user_id };
                    const newPromise = new Promise(async (resolve, reject) => {
                        try {
                            await axiosData.post("/api/to-do", newTodo);
                            resolve("Success");
                        } catch (error) {
                            reject(error);
                        }
                    });
                    promiseList.push(newPromise);
                } else if (item.edit) {
                    const { name, start_time, end_time, date, level, completed, user_id } = item;
                    const eidtTodo = { name, start_time, end_time, date, level, completed, user_id };

                    const newPromise = new Promise(async (resolve, reject) => {
                        try {
                            await axiosData.put(`/api/to-do/${item.id}`, eidtTodo);
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
                if (item.deleted || !(item.new && item.edit)) {
                    todoList = todoList.filter((x) => {
                        return item.id !== x.id;
                    });
                } else if (item.edit) {
                    item.edit = false;
                    if (!item.id) {
                        const date = new Date();
                        const now = date.getTime();
                        item.id = now;
                    }
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
                    {todoList?.map((item, index) => {
                        if (item !== null && !item.deleted) return <Todo todo={item} key={index} />;
                    })}
                </div>

                <div className="add_task" onClick={handleButtonAddTodo}>
                    <button>
                        <GrAdd />
                        <p>Add task</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;

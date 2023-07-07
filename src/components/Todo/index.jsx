import React, { useState } from "react";
import "./index.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsFlagFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { add_todo, delete_todo, update_todo } from "../../redux/reducer/todolistReducer";
const Todo = ({ todo, index, type }) => {
    console.log({ todo });
    const [editToDo, setEditToDo] = useState({ ...todo, edit: false, delete: false });
    const [showLevel, setShowLevel] = useState(false);
    const dispatch = useDispatch();
    const handleCompleted = (event) => {
        dispatch(update_todo({ ...todo, completed: event.target.checked }));
    };
    const handleEditToDo = () => {
        const form_task = document.getElementById(`form_task-${todo.id}`);
        const form_time = document.getElementById(`time-${todo.id}`);
        const form_edit = document.getElementById(`form_edit-${todo.id}`);
        form_time.style.display = "none";
        form_task.style.display = "none";
        form_edit.style.display = "block";
    };

    const handleCancelEditTodo = () => {
        const form_task = document.getElementById(`form_task-${todo.id}`);
        const form_time = document.getElementById(`time-${todo.id}`);
        const form_edit = document.getElementById(`form_edit-${todo.id}`);
        form_task.style.display = "flex";
        form_time.style.display = "block";
        form_edit.style.display = "none";
    };
    const handleSubmitEditTodo = () => {
        dispatch(update_todo(editToDo));
        handleCancelEditTodo();
    };

    const handleDeleteTodo = () => {
        dispatch(delete_todo(editToDo));
    };

    const handleShowLevel = () => {
        setShowLevel(!showLevel);
    };
    return (
        <div key={index} className="task_list" id={todo.id}>
            <div className="form_task" id={`form_task-${todo.id}`}>
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id={`checkbox-${todo.id}`}
                        className=""
                        onClick={(event) => handleCompleted(event)}
                        checkek={todo.completed}
                    ></input>
                    <label htmlFor={`checkbox-${todo.id}`}></label>
                </div>
                <div className="tasklist_content">
                    <div
                        className={`level-${todo.level} task_content`}
                        style={{
                            textDecoration: todo.completed ? "line-through" : "none",
                        }}
                    >
                        {todo.name}
                    </div>
                </div>
                <div className="task_action">
                    <AiOutlineEdit className="b_icon" onClick={handleEditToDo} />

                    <AiOutlineDelete className="delete_task b_icon" onClick={handleDeleteTodo} />
                </div>
            </div>
            <div className="task_time" id={`time-${todo.id}`}>
                <small>
                    {todo.start_time?.slice(0, 5) || "xx : xx"} - {todo.end_time?.slice(0, 5) || "xx : xx"}
                </small>
            </div>

            <div className="form_edit" id={`form_edit-${todo.id}`}>
                <div className="task_edit">
                    <div className="task_edit_input">
                        <div className="task_content">
                            <input
                                value={editToDo?.name}
                                onChange={(e) =>
                                    setEditToDo({
                                        ...editToDo,
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
                            value={editToDo?.start_time}
                            onChange={(e) => {
                                setEditToDo({
                                    ...editToDo,
                                    start_time: e.target.value,
                                });
                            }}
                            className="due_date"
                        />
                        <input
                            type="time"
                            value={editToDo?.end_time}
                            onChange={(e) =>
                                setEditToDo({
                                    ...todo,
                                    end_time: e.target.value,
                                })
                            }
                            className="due_date"
                        />
                        <div className="priority1" onClick={handleShowLevel}>
                            <BsFlagFill className={`level-${editToDo.level}`} />
                            <p>Level {editToDo?.level}</p>
                            <ul className={`select-level`} style={{ display: showLevel ? "block" : "none" }}>
                                {[1, 2, 3, 4].map((level, index) => (
                                    <li
                                        className="level"
                                        key={index}
                                        onClick={() => {
                                            setEditToDo({
                                                ...editToDo,
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

                        <button type="button" className="cancel" onClick={handleCancelEditTodo}>
                            <svg viewBox="0 0 24 24" className="icon_close" width="24" height="24">
                                <path
                                    fill="currentColor"
                                    fillRule="nonzero"
                                    d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"
                                ></path>
                            </svg>
                        </button>
                        <button type="button" className="add_submit" onClick={handleSubmitEditTodo}>
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
    );
};

export default Todo;

import React, { useState } from "react";
import "./index.css";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUserData } from "../../redux/reducer/userReducer";
import robot from "../../asset/robot.gif";
import { axiosData } from "../../services/axiosInstance";

const UserProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const [editUser, seteditUser] = useState({});
    const [showEdit, setShowEdit] = useState(false);

    const handleEdit = () => {
        setShowEdit(true);
        seteditUser({
            name: user.user_name,
            email: user.email,
            gender: user.gender,
            birthday: user.birthday,
            phone: user.phone,
        });
    };
    const handleCancel = () => {
        setShowEdit(false);
    };

    const handleSubmit = async () => {
        const updatedUser = {
            ...user,
            birthday: editUser.birthday,
            email: editUser.email,
            gender: editUser.gender,
            user_name: editUser.name,
            phone: editUser.phone,
        };
        await axiosData.put(`/api/user/update/${user.user_id}`, updatedUser).then((data) => {
            localStorage.setItem("user", JSON.stringify(updatedUser));
        });
    };

    const convertDate = (dueDate) => {
        const dateParts = dueDate.split("-");
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        const formattedDueDate = `${day}/${month}/${year}`;
        return formattedDueDate;
    };

    return (
        <div className="container_profile">
            <div className="image">
                <div className="background">
                    <img src={robot} alt="" />
                    <h1>
                        <span>{user.user_name}</span>
                    </h1>
                </div>
            </div>

            <div className="profile">
                {!showEdit ? (
                    <button className="edit_profile" onClick={handleEdit}>
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
                ) : (
                    <button className="edit_out" onClick={handleCancel}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20">
                            <path
                                fill="currentColor"
                                d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"
                            ></path>
                        </svg>
                    </button>
                )}
                {!showEdit ? (
                    <div className="profile-info">
                        <div className="profile-details">
                            <div className="profile-item">
                                <strong>Email:</strong>
                                <span>{user.email}</span>
                            </div>
                            <div className="profile-item">
                                <strong>Username:</strong>
                                <span>{user.user_name}</span>
                            </div>
                            <div className="profile-item">
                                <strong>Birthday:</strong>
                                <span>{convertDate(user.birthday)}</span>
                            </div>
                            <div className="profile-item">
                                <strong>Gender:</strong>
                                <span>{user.gender || "Noshare"}</span>
                            </div>
                            <div className="profile-item">
                                <strong>Phone:</strong>
                                <span>{user.phone}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="profile-info_edit">
                        <div className="profile-details">
                            <div className="profile-item">
                                <strong>Email:</strong>
                                <input
                                    value={editUser.email}
                                    onChange={(e) =>
                                        seteditUser({
                                            ...editUser,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="profile-item">
                                <strong>Username:</strong>
                                <input
                                    value={editUser.name}
                                    onChange={(e) =>
                                        seteditUser({
                                            ...editUser,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="profile-item">
                                <strong>Birthday:</strong>
                                <input
                                    className="birthday"
                                    type="date"
                                    value={editUser.birthday}
                                    onChange={(e) =>
                                        seteditUser({
                                            ...editUser,
                                            birthday: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="profile-item">
                                <strong>Gender:</strong>
                                <select
                                    name={editUser.gender || "Noshare"}
                                    onChange={(e) =>
                                        seteditUser({
                                            ...editUser,
                                            gender: e.target.value,
                                        })
                                    }
                                >
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="">Noshare</option>
                                </select>
                            </div>
                            <div className="profile-item">
                                <strong>Phone:</strong>
                                <input
                                    value={editUser.phone}
                                    onChange={(e) =>
                                        seteditUser({
                                            ...editUser,
                                            phone: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <button className="accept_profile" onClick={handleSubmit}>
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
                )}
            </div>
        </div>
    );
};

export default UserProfile;

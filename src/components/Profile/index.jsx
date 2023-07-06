import React from "react";
import "./index.css"
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/reducer/userReducer";
import robot from "../../asset/robot.gif"


const UserProfile = () => {
    const user = useSelector(selectUserData)
    console.log(user)

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
                            <span>{user.birthday}</span>
                        </div>
                        <div className="profile-item">
                            <strong>Gender:</strong>
                            <span>{user.gender || "Male"}</span>
                        </div>
                        <div className="profile-item">
                            <strong>Phone:</strong>
                            <span>{user.phone}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
import React from "react";
import "./UserProfile.css";

const UserProfile = ({ user }) => {
  return (
    <div className="container">
      <div className="profile">
        <div className="profile-picture">
          <img src={user.avatar} alt="Profile Avatar" />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{`${user.firstName} ${user.lastName}`}</h1>
          <div className="profile-details">
            <div className="profile-item">
              <strong>Email:</strong>
              <span>{user.email}</span>
            </div>
            <div className="profile-item">
              <strong>Username:</strong>
              <span>{user.username}</span>
            </div>
            <div className="profile-item">
              <strong>Birthday:</strong>
              <span>{user.birthDay}</span>
            </div>
            <div className="profile-item">
              <strong>Gender:</strong>
              <span>{user.gender}</span>
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

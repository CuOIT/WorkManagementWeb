import React from "react";
import "./main_background.css";
import { Route, Routes, Link } from "react-router-dom";
import AssignmentScreen from "./assignment/Assignment";
import ProjectScreen from "./project/Project";
import TodayScreen from "./today/TodayUser";
const MainBackground = () => {
    return (
        <div className="main_container">
            <div></div>
            <Routes>
                <Route path="/today" element={<TodayScreen />} />
                <Route path="/workspace" element={<AssignmentScreen />} />
                <Route path="project/:project_id" element={<ProjectScreen />} />
            </Routes>
        </div>
    );
};

export default MainBackground;

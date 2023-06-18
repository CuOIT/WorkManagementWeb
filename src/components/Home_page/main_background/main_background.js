import React from "react";
import "./main_background.css";
import { Route, Routes, Link } from "react-router-dom";

import Workspace from "./workspace/workspace";
import ProjectScreen from "./project/Project";
import TodayScreen from "./today/TodayUser";
import { useSelector } from "react-redux";

const MainBackground = () => {
    // const user = useSelector((state) => state.user?.userData);
    return (
        <div className="main_container">
            <div>
                <Routes>
                    <Route path='today' element={<TodayScreen />} />
                    <Route path="assignment" element={<Workspace />} />
                    <Route path="project" element={<ProjectScreen />} />
                </Routes>
            </div>
        </div>
    );
};

export default MainBackground;

import React from "react";
import "./main_background.css";
import { Route, Routes, Link } from "react-router-dom";
import AssignmentScreen from './assignment/Assignment'
import PlanScreen from './plan/Plan'
import ProjectScreen from './project/Project'
import TodayScreen from './today/TodayUser'
const MainBackground = () => {
  return (
    <div className='main_container'>
     <div>
      
     </div>
      <Routes> 
        
          <Route path='today' element={<TodayScreen />} />
          <Route path='assignment' element={<AssignmentScreen />} />
          
          <Route path='plan' element={<PlanScreen />} />
          <Route path='project/:project_id' element={<ProjectScreen />} />
       
      </Routes>
    </div>
  )
}

export default MainBackground;

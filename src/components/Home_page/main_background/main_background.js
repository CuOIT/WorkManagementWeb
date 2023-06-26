import React, { useState } from 'react'
import './main_background.css'
import {Route,Routes,Link, useParams} from 'react-router-dom'

import AssignmentScreen from './assignment/Assignment'
import WorkScreen from './work/Work'
import ProjectScreen from './project/Project'
import TodayScreen from './today/TodayUser'

const MainBackground = () => {
  const project_id = useParams();
 
  return (
    <div className='main_container'>
     <div>
      
     </div>
      <Routes> 
        
          <Route path='today' element={<TodayScreen />} />
          <Route path='assignment' element={<AssignmentScreen />} />
          <Route path='assignment/:workspace_id' element = {<WorkScreen />}/>
          
          <Route path='project/:project_id' element={<ProjectScreen/>} />
       
      </Routes>
    </div>
  )
}

export default MainBackground

import React from 'react'
import './main_background.css'
import {Route,Routes} from 'react-router-dom'
import AssignmentScreen from './assignment/Assignment'
import WorkScreen from './work/Work'
import ProjectScreen from './project/Project'
import TodayScreen from './today/TodayUser'
import Today from './today/Today'
import { useSelector } from 'react-redux'
import { selectAccessToken } from '../../../redux/reducer/userReducer'

const MainBackground = () => {
  const accessToken = useSelector(selectAccessToken)
 
  return (
    <div className='main_container'>
     <div>
     </div>
      <Routes> 
        {!accessToken ? (
          <Route path='today' element={<Today/>} />
        ) : (
          <Route path='today' element={<TodayScreen />} />
        )}
          <Route path='assignment' element={<AssignmentScreen />} />
          <Route path='assignment/:workspace_id' element = {<WorkScreen />}/>
          <Route path='project/:project_id' element={<ProjectScreen/>} />
      </Routes>
    </div>
  )
}

export default MainBackground

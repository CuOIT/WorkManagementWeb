import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import Main from './main_background/Main_background'

import './index.css'
const index = () => {
  return (
    <div id='home_page_container'>
      <Navbar/>
      <div className="homepage_sidebar_content">
        <Sidebar/>
        <Main/>      
      </div>
      
    </div>
  )
}

export default index

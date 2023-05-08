import React from 'react'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import Main from './main_background/main_background'
import './index.css'
const index = () => {
  return (
    <div id='home_page_container'>
      <Navbar/>
      <div className="content">
        <Sidebar/>
        <Main/>
      </div>
      
    </div>
  )
}

export default index

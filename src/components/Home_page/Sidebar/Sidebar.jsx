import React from 'react'
import './sidebar.css'
import {Link, NavLink} from 'react-router-dom'
import logo_menu from "../image/hamburger.png"
import logo_today from "../image/sun.png"
import logo_assignment from "../image/user.png"
import logo_plan from "../image/planning.png"
import logo_project from "../image/project (1).png"
import logo_work from "../image/freelance.png"
function handle_menu(){
  const home_page_element = document.getElementById("home_page_container");
  home_page_element.style.gridTemplateColumns = "0fr 1fr";
  console.log(home_page_element)
}
const Sidebar = () => {
  return (
    <div className='sidebar_container'>
      <div className="container">
        <div className="menu">          
          <img onClick={handle_menu}  className='icon' src={logo_menu} alt="" />
        </div>
        <Link to='/trangchu/today'>
          <div className="today item">
            <div className="div_icon">
              <img className='icon' src={logo_today} alt="" />
            </div>
            <div className="div_title">
              <span>Today</span>
            </div>
          </div>
        </Link>
        <Link to='/trangchu/assignment'>
          <div className="assignment item">
            <div className="div_icon">
              <img className='icon' src={logo_work} alt="" />
            </div>
            <div className="div_title">
              <span>WorkSpace</span>
            </div>
          </div>
        </Link>

        <Link to='/trangchu/project'> 
          <div className="project item">
            <div className="div_icon">
              <img className='icon' src={logo_project} alt="" />
            </div>
            <div className="div_title">
              <span>Project</span>
            </div>
          </div>
        </Link> 
      </div>
    </div>
  )
}

export default Sidebar

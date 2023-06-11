import React from 'react'
import { useEffect, useState } from 'react'
import axios  from 'axios'
import './sidebar.css'
import {Link, NavLink} from 'react-router-dom'
import logo_menu from "../image/hamburger.png"
import logo_today from "../image/sun.png"
import logo_assignment from "../image/user.png"
import logo_plan from "../image/planning.png"
import logo_project from "../image/project (1).png"
import logo_work from "../image/freelance.png"
import logo_circle_project from "../image/new-moon.png"
function handle_menu(){
  const home_page_element = document.getElementById("home_page_container");
  home_page_element.style.gridTemplateColumns = "0fr 1fr";
  console.log(home_page_element)
} 
var projectName = "";
function show_project_selected(projectname){
    projectName = projectname
    
}
const Sidebar = () => {
 

  //const nameOfProject = "";
  const [listOfProject,setlistOfProject] = useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:8080/api/project?user_id=1`)
      .then((response)=>{
        setlistOfProject(response.data.data)
        
      })
  },[])
  
  // export const nameProject = ()=>{
  //   return nameOfProject
  // }
  
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
          <div className="project_head item">
            <div className="div_icon">
              <img className='icon' src={logo_project} alt="" />
            </div>
            <div className="div_title" id='div_title_project'>
              <div className='project_all_title'>
                <span>Project</span>
              </div>
            </div>
              <div  className='add_or_show'>
                <div className='icon_add_project'>
                  <button><svg width="13" height="13"><path d="M6 6V.5a.5.5 0 011 0V6h5.5a.5.5 0 110 1H7v5.5a.5.5 0 11-1 0V7H.5a.5.5 0 010-1H6z" fill="currentColor" fill-rule="evenodd"></path></svg></button>
                </div>
                <div className='icon_show_project'>
                  <button><svg width="16" height="16" viewBox="0 0 16 16" class="aqv2kvH"><path d="M14 5.758L13.156 5 7.992 9.506l-.55-.48.002.002-4.588-4.003L2 5.77 7.992 11 14 5.758" fill="currentColor"></path></svg></button>
                </div>
              </div>
              
            
          </div>
          <div className='list_of_project'>
            {
              listOfProject.map((value,key)=>{
                return(
                  <Link to={`/trangchu/project/${value.project_id}`}>
                  <div className='project_item' onClick={()=>show_project_selected(value.name)}>
                    <div className='circle_project'>
                      <img src={logo_circle_project}></img>
                    </div>
                    <div className='name_project'>{value.name}</div>
                  </div></Link>
                )
              })
            }
          </div>
        </Link> 

      </div>
    </div>
  )
}

export default Sidebar
export {projectName}
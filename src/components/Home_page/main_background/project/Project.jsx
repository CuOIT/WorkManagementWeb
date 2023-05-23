import React, { useEffect, useState } from 'react'
import './project.css'
import axios from 'axios';
const Project = () => {
  const [listOfProject,setlistOfProject] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8080/api/project")
      .then((response)=>{
        setlistOfProject(response.data)
        console.log(listOfProject)
      })
  },[])
  return (
    <div className='project_container'>
      {
        listOfProject.map((value,key)=>{
          return(
            <div className='project_item' id={value.id}>
                <div className='check_box_project'><input type='checkbox'/></div>
                <div className='project_infor'>
                  <div className='name_project_item'>
                    <p>{value.name}</p>
                  </div>
                  <div className='project_description'>
                    <p>{value.description}</p>
                  </div>
                  <div className='date_project'>
                    <p>From {value.start_date} to {value.end_date}</p>
                  </div>

                </div>
                
            </div>
          )
        })
      }
    </div>
  )
}

export default Project

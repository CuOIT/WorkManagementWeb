import React, { useEffect, useState } from 'react'
import './project.css'
import axios from 'axios';
const Project = () => {
  const [listOfProject,setlistOfProject] = useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:8080/api/project?user_id=1`)
      .then((response)=>{
        setlistOfProject(response.data.data)
        console.log(listOfProject)
      })
  },[])
  return (
    <div className='project_container'>
      {
        listOfProject.map((value,key)=>{
          return(
            <div className='project_item' id={value.id}>
                <div className='check_box_project'>
                <button className="task_checkbox"  >
                                            <svg width="24" height="18" aria-checked="false"><path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path></svg>
                                        </button>
                </div>
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
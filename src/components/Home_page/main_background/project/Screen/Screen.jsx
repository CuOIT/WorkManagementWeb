import React, { useState, useEffect, memo } from 'react'
import './Screen.css'
import axios from 'axios'

const Edit_Screen = (id) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/project/task/comments?task_id=${id}`
        )
        setComments(response.data.data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    fetchData()
  }, [])

  const handleComment = async () => {
    if (!comment) alert("Comment is not empty")
    try {
      axios.post(`http://localhost:8080/api/project/task/comment`, {
        task_id: 1,
        comment: comment,
        user_id: 1
      })
      const response = await axios.get(
        `http://localhost:8080/api/project/task/comments?task_id=${id}`
      )
      setComments(response.data.data)
    } catch (err) {
      console.log(err)
    }
    setComment('')
  }

  const [showing, setShowing] = useState(true)
  const handleShow = () => {
    const icon = document.querySelector('.content .comment .action .arrow svg')
    if(!showing){
      icon.style.transform = 'rotate(0)' 
    }
    else icon.style.transform = 'rotate(-90deg)' 
    setShowing(!showing)
  }

  const handleDelete = async (idx) => {
    try {
      await axios.delete(`http://localhost:8080/api/project/task/delete-comment/${idx}`)
      const response = await axios.get(
        `http://localhost:8080/api/project/task/comments?task_id=${id}`
      )
      setComments(response.data.data)
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const handleDone = () => {

  }

  const [show, setShow] = useState(true)
  const handleCancel = () => {
    setShow(false)
  }

  return (
    <div className="edit_screen" style={{ display: show ? 'block' : 'none' }}>
      <div className="header_edit">
        <p>Review Task</p>
        <button type="button" onClick={handleCancel}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20"><path fill="currentColor" d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"></path></svg>
        </button>
      </div>

      <div className="body">
        <div className="content">
          <div className="name">
            <div className="taskname">
              <button className="task_checkbox" onClick={() =>handleDone}>
                <svg width="24" height="18"></svg>
              </button>
              <div className="content1">
                <div className="task_content1">
                  <input value='Pemond' placeholder="Taskname" required />
                </div>
                <div className="task_description">
                  <input value='This is Description' placeholder="Description" required />
                </div>
              </div>
            </div>
          </div>

          <div className="comment">
            <button className='action' onClick={handleShow}>
              <div className="arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" class="aqv2kvH">
                  <path d="M14 5.758L13.156 5 7.992 9.506l-.55-.48.002.002-4.588-4.003L2 5.77 7.992 11 14 5.758" fill="currentColor"></path>
                </svg>
              </div>
              <span className="comment">
                Comments
              </span>
            </button>
            <div className="commentlist" style={{ display: showing ? 'block' : 'none' }}>
              {comments?.map((data, index) => {
                return (
                  <div key={index} className="comment_content">
                    <div className="avatar">
                      <img src="" alt="Pemond" />
                    </div>
                    <div className="noway">
                      <div className="name_action">
                        <span className="username"> name</span>
                        <div className="time_comment">time</div>
                        <button className="delete_cmt" onClick={() => handleDelete(data.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 008 19.5h8a1.5 1.5 0 001.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0014 3.5h-4A1.5 1.5 0 008.5 5v1.5z"></path></g></svg>
                        </button>
                      </div>
                      <div className="content_cmt">
                        <p>{data.comment}</p>
                      </div>
                    </div>
                  </div>
                )
              })}

              <div className="comment_content">
                <div className="avatar">
                  <img src="https://avatars.doist.com?fullName=Pemond&amp;email=vipthieugia200%40gmail.com&amp;size=50&amp;bg=ffffff" alt="Pemond" />
                </div>
                <div className="noway">
                  <div className="name_action">
                    <span className="username"> Pemond</span>
                    <div className="time_comment">Yesterday 12:50</div>
                    <button className="delete_cmt">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 008 19.5h8a1.5 1.5 0 001.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0014 3.5h-4A1.5 1.5 0 008.5 5v1.5z"></path></g></svg>
                    </button>
                  </div>
                  <div className="content_cmt">
                    <p>Chết trình trình</p>
                  </div>
                </div>
              </div>

              <div className="comment_content">
                <div className="avatar">
                  <img src="https://avatars.doist.com?fullName=Pemond&amp;email=vipthieugia200%40gmail.com&amp;size=50&amp;bg=ffffff" alt="Pemond" />
                </div>
                <div className="noway">
                  <div className="name_action">
                    <span className="username"> Pemond</span>
                    <div className="time_comment">Yesterday 12:50</div>
                    <button className="delete_cmt">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 008 19.5h8a1.5 1.5 0 001.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0014 3.5h-4A1.5 1.5 0 008.5 5v1.5z"></path></g></svg>
                    </button>
                  </div>
                  <div className="content_cmt">
                    <p>Chết trình trình</p>
                  </div>
                </div>
              </div>

              <div className="comment_content">
                <div className="avatar">
                  <img src="https://avatars.doist.com?fullName=Pemond&amp;email=vipthieugia200%40gmail.com&amp;size=50&amp;bg=ffffff" alt="Pemond" />
                </div>
                <div className="noway">
                  <div className="name_action">
                    <span className="username"> Pemond</span>
                    <div className="time_comment">Yesterday 12:50</div>
                    <button className="delete_cmt">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 008 19.5h8a1.5 1.5 0 001.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0014 3.5h-4A1.5 1.5 0 008.5 5v1.5z"></path></g></svg>
                    </button>
                  </div>
                  <div className="content_cmt">
                    <p>Chết trình trình</p>
                  </div>
                </div>
              </div>
              <div className="add_cmt">
                <div className="avatar">
                  <img src="https://avatars.doist.com?fullName=Pemond&amp;email=vipthieugia200%40gmail.com&amp;size=50&amp;bg=ffffff" alt="Pemond" />
                </div>
                <input value={comment} onChange={e => setComment(e.target.value)} type="text" placeholder='Add Comment' />
                <button onClick={handleComment}>
                  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.18 6.396C7 6.642 7 7.054 7 7.878V11l6.715.674c.38.038.38.614 0 .652L7 13v3.122c0 .824 0 1.236.18 1.482.157.214.4.356.669.39.308.041.687-.15 1.444-.531l8.183-4.122c.861-.434 1.292-.651 1.432-.942a.915.915 0 000-.798c-.14-.29-.57-.508-1.433-.942l-8.18-4.122c-.758-.381-1.137-.572-1.445-.532a.986.986 0 00-.67.391z" fill="currentColor"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="side">
          <div className="prj_name">
            <p>Project</p>
            <div>Project2</div>
          </div>

          <div className="due_date">
            <p>Due date</p>
            <div>Today</div>
          </div>

          <div className="assigned_to">
            <p>Assigned</p>
            <div>Pemond</div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default memo(Edit_Screen)
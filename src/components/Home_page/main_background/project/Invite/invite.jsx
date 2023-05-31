import React , {useState, useEffect} from 'react'
import './invite.css'
import axios from 'axios'

const Invite = () => {
  const [value, setValue] = useState('')
  const [member, setMember] = useState([])

  useEffect(() =>{
    // Lấy toàn bộ thành viên trong Project để hiển thị
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/project?project_id={project_id}'
        )
        setMember(response.data.data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    fetchData()
  })


  const handleSubmit = (event) =>{
      event.preventDefault()
      axios.post("http://localhost:8080/api/project/invite",{
        inviter: 1,
        receiver: 2,
        project_id: 3,
        created_at: new Date()
      })
  }

  const handleCancel = () => {
    document.querySelector('.form_invite').style.display = 'none'
  }

  return (
      <form className="form_invite" onSubmit={handleSubmit} method="POST">
          <div className="header_invite">
              <h3>Share Projects</h3>
              <button type="button" onClick={handleCancel}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20"><path fill="currentColor" d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"></path></svg>
              </button>
          </div>

          <div className="body">
              <h4>Invite People</h4>
              <div className="action">
                  <input type="text" placeholder="Name or Email" value ={value} onChange={e => setValue(e.target.value)}/>
                  <button type="submit">
                      <span>Invite</span>
                  </button>
              </div>
              <ul>
                {member?.map((item, index) =>{
                    return(
                        <li key={index} className="partner">
                            <div className="avatar">
                              <img src="https://avatars.doist.com?fullName=Pemond&amp;email=vipthieugia200%40gmail.com&amp;size=50&amp;bg=ffffff" alt="Pemond"/>
                            </div>

                            <div className="field_infor">
                              <div className="Name">
                                {item.id}
                              </div>
                              <div className="mail">
                                Someone@gmail.com
                              </div>
                            </div>
                        </li>
                    )
                })}
              </ul>
  
              <div className="partner">
                  <div className="avatar">
                    <img src="https://avatars.doist.com?fullName=Pemond&amp;email=vipthieugia200%40gmail.com&amp;size=50&amp;bg=ffffff" alt="Pemond"/>
                  </div>

                  <div className="field_infor">
                    <div className="Name">
                      Me
                    </div>
                    <div className="mail">
                      abc@gmail.com
                    </div>
                  </div>

                  {/* Đợi có API của role rồi viết thêm xóa hoặc nhượng quyền thành viên */}

              </div>

              <div className="partner">
                  <div className="avatar">
                    <img src="https://avatars.doist.com?fullName=Pemond&amp;email=vipthieugia200%40gmail.com&amp;size=50&amp;bg=ffffff" alt="Pemond"/>
                  </div>

                  <div className="field_infor">
                    <div className="Name">
                      Someone
                    </div>
                    <div className="mail">
                      Someone@gmail.com
                    </div>
                  </div>
              </div>
          </div>
      </form>
  )
}

export default Invite

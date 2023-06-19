import React, { useState, useEffect } from 'react'
import './invite.css'
import axios from 'axios'
import { FiKey } from "react-icons/fi";

const Invite = ({onCancel, prj_id}) => {
  const [value, setValue] = useState('')
  const [member, setMember] = useState([])

  useEffect(() => {
    // Lấy toàn bộ thành viên trong Project để hiển thị
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/project?project_id=${prj_id}`
        )
        setMember(response.data.data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    fetchData()
  })

  const date = new Date()
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  
  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post("http://localhost:8080/api/project/invite", {
      inviter: 1,
      receiver: 2,
      project_id: prj_id,
      created_at: formattedDate
    })
    setValue('')
  }

  const handleCancel = () => {
    if (typeof onCancel === "function") {
      onCancel();
    }
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
          <input type="text" placeholder="Name or Email" value={value} onChange={e => setValue(e.target.value)} />
          <button type="submit">
            <span>Invite</span>
          </button>
        </div>
        <ul className='list_partner'>
          {member?.map((item, index) => {
            return (
              <li key={index} className="partner">
                <div className="avatar">
                  <img src="https://avatars.doist.com?fullName=Pemond&amp;email=vipthieugia200%40gmail.com&amp;size=50&amp;bg=ffffff" alt="Pemond" />
                </div>

                <div className="field_infor">
                  <div className="Name">
                    {item.inviter}
                  </div>
                  <div className="mail">
                    Someone@gmail.com
                  </div>
                </div>

                {/* doan nay la hien thi nut bam theo role nguoi dung */}
              
                {item.role === 'Leader' ? (
                  <button className="action_project leave_project">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g fill="none" fill-rule="evenodd"><path stroke="currentColor" d="M6.5 8.3V5.63c0-1.17.9-2.13 2-2.13h7c1.1 0 2 .95 2 2.13v11.74c0 1.17-.9 2.13-2 2.13h-7c-1.1 0-2-.95-2-2.13V14.7"></path><path fill="currentColor" d="M12.8 11l-2.15-2.15a.5.5 0 11.7-.7L14 10.79a1 1 0 010 1.42l-2.65 2.64a.5.5 0 01-.7-.7L12.79 12H4.5a.5.5 0 010-1h8.3z"></path></g></svg>
                  </button>
                ) : (
                  <>
                    <button className="action_project delete_partner">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 008 19.5h8a1.5 1.5 0 001.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0014 3.5h-4A1.5 1.5 0 008.5 5v1.5z"></path></g></svg>
                    </button>

                    <button className="action_project franchise">
                      <div><FiKey className='franchise_icon' /></div>
                    </button>
                  </>
                )}
              </li>
            )
          })}
        </ul>

        <div className="partner">
          <div className="avatar">
            <img src="https://avatars.doist.com?fullName=Pemond&amp;email=vipthieugia200%40gmail.com&amp;size=50&amp;bg=ffffff" alt="Pemond" />
          </div>

          <div className="field_infor">
            <div className="Name">
              Me
            </div>
            <div className="mail">
              abc@gmail.com
            </div>
          </div>

          <button className="action_project delete_partner">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 008 19.5h8a1.5 1.5 0 001.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0014 3.5h-4A1.5 1.5 0 008.5 5v1.5z"></path></g></svg>
          </button>

          <button className="action_project franchise">
            <div><FiKey className='franchise_icon' /></div>
          </button>

        </div>
      </div>
    </form>
  )
}

export default Invite

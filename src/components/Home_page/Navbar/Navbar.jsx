import React from 'react'
import './navbar.css'
const Navbar = () => {
  return (
    <div id='navbar_container'>
      <div className="navbar_left">
        <div className="icon navbar_item">
          <img src="https://static.vecteezy.com/system/resources/previews/017/336/824/original/to-do-list-icon-flat-work-artwork-vector.jpg" alt="" />
        </div>
        <div className="home navbar_item">
          <p>HOME</p>
        </div>
      </div>
      <div className="navbar_middle">
        <div className="search navbar_item">
          <input name='user_input' type="text" placeholder='Search'/>
        </div>
      </div>
      <div className="navbar_right">
        <div className="help navbar_item">
          <img src="https://thumbs.dreamstime.com/b/question-mark-line-art-help-symbol-flat-style-icon-isolated-white-background-vector-illustration-146871828.jpg" alt="" />
        </div>
        <div className="announce navbar_item">
          <img src="https://static.vecteezy.com/system/resources/previews/006/086/198/original/notification-icon-for-web-vector.jpg" alt="" />
        </div>
        <div className="sign_in navbar_item">
          <button>Đăng nhập</button>
        </div>
        <div className="sign_up navbar_item">
          <button>Đăng ký</button>
        </div>
      </div>
      
    </div>
  )
}

export default Navbar

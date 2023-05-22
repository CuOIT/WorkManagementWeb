import React, {useState, useEffect, useMemo} from "react"
import "./Invite.css"
import {Auth} from "../Auth/Auth"

const Invite = () => {
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
    }

    return (
        <div className="Invite"> 
            <div className="header">
                <h3>Invite Members</h3>
                <button onClick={handleCancel}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="currentColor" d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"></path></svg>
                </button>
            </div>
            <div className="title">
                <h4>Phone or Email or Phone</h4>
            </div>
            <form className="invite_field" onSubmit={handleSubmit}>
                <input type="text" />
            </form>

            <div className="">

            </div>
        </div>
    )


}

export default Invite
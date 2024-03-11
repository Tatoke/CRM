import React from 'react';
import { Outlet, Link, useParams } from 'react-router-dom'; //<Outlet> renders the current route selected.<Link> is used to set the URL 
import './Header.css'

// Icons
import { RxAvatar } from "react-icons/rx";
import { FaRegBell } from "react-icons/fa";






function Header(){   //HOLDS INFO ABOUT epmloyeeId logged in

    const [name, setName] = React.useState("John Swarowski");
    const [email, setEmail] = React.useState("john@example.com")


   

    return (
        <>
        <div className="header">
                <Link to="/"><h3 className="logo">Quicksort</h3></Link>

                <div className="right">
                        <div className="notification">
                            <Link to="#"><FaRegBell size="1.3em" /></Link>
                        </div>

                        <div className="avatar has-submenu">
                            <Link to="#"><RxAvatar className="avatarIcon" size="1.5em"/></Link>


                           {/* SUBMENU for Avatar Icon*/}
                            <ul className="submenu">
                                {/* the endpoint opens profile page customized for employee */}
                                <li className="subitem top"><Link to="/profile/client/1">My Profile</Link></li> 

                                <li className="subitem "><Link to="/roles">Roles</Link></li>     
                                <li className="subitem bottom"><Link to="/logout">Logout</Link></li>   
                            </ul>
                        </div>  
                        
                        <div className="userinfo">
                            <div className="username">{name}</div>
                            <div className="email">{email}</div>
                        </div>
                </div>
        </div>

        <Outlet />
        </>
    )
}




export default Header


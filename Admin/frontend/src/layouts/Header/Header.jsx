import React from 'react';
import { Outlet, Link, useParams } from 'react-router-dom'; //<Outlet> renders the current route selected.<Link> is used to set the URL 
import './Header.css'

// Icons
import { RxAvatar } from "react-icons/rx";
import { FaRegBell } from "react-icons/fa";






function Header(){   //HOLDS INFO ABOUT epmloyeeId logged in

    const [name, setName] = React.useState("John Swarowski");


   

    return (
        <>
        <div className="header">
                <h3 className="logo">Quicksort</h3>
                
                <ul className="center">
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/clients">Clients</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/finances">Finances</Link></li>
                </ul>


                <div className="right">
                        <div className="notification">
                            <Link to="#"><FaRegBell size="1.3em" /></Link>
                        </div>


                        <div className="avatar has-submenu">
                            <Link to="#"><RxAvatar className="avatarIcon" size="1.5em"/></Link>


                           {/* SUBMENU for Avatar Icon*/}
                            <ul className="submenu">
                                {/* the endpoint opens profile page customized for employee */}
                                <li className="subitem top"><Link to="/profile/employee/1">My Profile</Link></li> 

                                <li className="subitem "><Link to="/roles">Roles</Link></li>     
                                <li className="subitem bottom"><Link to="/logout">Logout</Link></li>   
                            </ul>
                        </div>
                            
                        <div className="username">{name}</div>
                </div>
        </div>

        <Outlet />
        </>
    )
}




export default Header


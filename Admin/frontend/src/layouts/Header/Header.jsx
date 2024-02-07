import React from 'react';

import './Header.css'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


// Icons
import { RxAvatar } from "react-icons/rx";
import { FaRegBell } from "react-icons/fa";





function Header(){
    const [name, setName] = React.useState("John Swarowski");


   

    return (
        <div className="header">
                <h3 className="logo">Quicksort</h3>
                
                <div className="center">
                    <a href="#">Dashboard</a>
                    <a href="#">Clients</a>
                    <a href="#">Services</a>
                    <a href="#">Finances</a>
                </div>
                

            <div className="right">
                        <div class="notification">
                            <a href="#"><FaRegBell size="1.2em" /></a>
                        </div>


                        <div class="avatar has-submenu">
                            <a href="#" ><RxAvatar className="avatarIcon" size="1.4em"/></a>


                            {/* SUBMENU for Avatar Icon*/}
                            <div className="submenu submenu-active">
                                <a className="subitem" href="#">My Profile</a>
                                <a className="subitem" href="#">Logout</a>
                            </div>
                        </div>
                        

                        <div class="username">{name}</div>
            </div>

        </div>
    )
}




export default Header


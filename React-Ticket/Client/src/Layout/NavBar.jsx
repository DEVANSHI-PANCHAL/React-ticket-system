import React from 'react';
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import {setAuth} from "../redux/action/authAction";
import {useHistory} from "react-router";
import "./navBar.css"

const NavBar = ({user}) => {
    const dispatch = useDispatch();
    const history = useHistory();
  
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(setAuth({user: null, token: null}));
        history.push('/')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
           
            <p className="navbar-brand">Ticket App</p>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item p-2 mr-3">
                        <span className={"mr-3"}>Hello, {user?.firstName} {user?.lastName}</span>
                    </li>
                    <li className="nav-item ml-3">
                        <Link className="nav-link" to="/" onClick={logout}>Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default NavBar;
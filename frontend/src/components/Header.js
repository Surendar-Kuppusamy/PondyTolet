import React from 'react';
import { NavLink } from 'react-router-dom';

function Header(props) {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/home">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink  className="nav-link" activeStyle={{ color: 'red' }} to="/home">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink  className="nav-link" activeStyle={{ color: 'red' }} to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" activeStyle={{ color: 'red' }} to="/signup">Singup</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeStyle={{ color: 'red' }} to="/asset/add">Add Asset</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeStyle={{ color: 'red' }} to="/settings/bulk">Settings</NavLink>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="/home" tabIndex="-1" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
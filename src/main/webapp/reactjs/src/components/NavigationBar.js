import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from 'react-router-dom';

class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img
                        src="https://www.clipartmax.com/png/full/113-1134514_ser-una-firma-líder-con-prestigio-nacional-confiable-notebook-journal-dot-grid.png"
                        width="30" height="30" alt="brand"/>
                    Crud
                </Link>
                <Nav className="mr-auto">
                    <Link to={"/employee"} className="nav-link">Add</Link>
                    <Link to={"/employee/all"} className="nav-link">Employee List</Link>
                </Nav>
            </Navbar>
        )
    }
}

export default NavigationBar;
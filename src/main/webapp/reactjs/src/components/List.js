import React, {Component} from "react";
import {Card, Table, ButtonGroup, Button, Nav} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import MyToast from "./MyToast";
import {Link} from "react-router-dom";

export default class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
    }

    componentDidMount() {
        this.allEmployees();

    }

    allEmployees() {
        axios.get("http://localhost:9090/employee/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({employees: data});
            });
    };

    deleteEmployee = (employeeId) => {
        axios.delete("http://localhost:9090/employee/" + employeeId)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show":false}),2000);
                    this.setState({
                        employees : this.state.employees.filter(employee => employee.id !== employeeId)
                    });
                } else {
                 this.setState({"show": false});
        }
            });
    };

    render() {
        return (
            <div>
                <div style={{"display": this.state.show? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Deleted Successfully"} type = {"danger"}/>
                </div>
                <Card className="border border-dark bg-gray text-black">
                    <Card.Header><FontAwesomeIcon icon={faList}/>
                        List Employee
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="gray">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>SurName</th>
                                <th>Birthday</th>
                                <th>email</th>
                                <th>Phone Number</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.employees.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="6"> Employees Available</td>
                                    </tr> :
                                    this.state.employees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td>{employee.name}</td>
                                            <td>{employee.surname}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.birthday}</td>
                                            <td>{employee.phoneNumber}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Link to={"edit/" + employee.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>{' '}
                                                    <Button size="sm" variant="outline-danger" onClick={this.deleteEmployee.bind(this, employee.id)}><FontAwesomeIcon
                                                        icon={faTrash}/></Button>{' '}
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                            }

                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
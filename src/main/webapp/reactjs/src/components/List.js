import React, {Component} from "react";
import {Card, Table, ButtonGroup, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export default class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:9090/employee/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({employees: data});
            });
    }

    render() {
        return (
            <Card className="border border-dark bg-gray text-black">
                <Card.Header><FontAwesomeIcon icon={faList} />
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
                            this.state.employees.length == 0 ?
                                <tr align="center">
                                    <td colSpan="6"> Employees Available</td>
                                </tr>  :
                                this.state.employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.surname}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.birthday}</td>
                                        <td>{employee.phoneNumber}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>{' '}
                                                <Button size="sm" variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button>{' '}
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                            ))
                        }

                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        )
    }
}
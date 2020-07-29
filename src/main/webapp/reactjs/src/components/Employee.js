import React, {Component} from "react";
import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faSave} from "@fortawesome/free-solid-svg-icons";

export default class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {name:'', surname:'', email:'', birthday:'', phoneNumber:''};
        this.EmployeeChange = this.EmployeeChange.bind(this);
        this.submitEmployee = this.submitEmployee.bind(this);
    }

    submitEmployee(event) {
        alert('Name: ' + this.state.name + ', Surname:  ' + this.state.surname + ', Email' + this.state.email
            + ', Birthday' + this.state.birthday + ', Phone Number' + this.state.phoneNumber)
        event.preventDefault()
    }

    EmployeeChange(event) {
        this.setState({
        [event.target.name]:event.target.value
        });
    }

    render() {
        return (
            <Card className="border border-dark bg-gray text-black">
                <Card.Header><FontAwesomeIcon icon={faPlusSquare} />
                    Add Employee
                </Card.Header>
                <Form onSubmit={this.submitEmployee} id="bookFormId">
                <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId = "formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control required
                                    type="text" name="name"
                                    value={this.state.name}
                                    onChange={this.EmployeeChange}
                                    className={"bg-gray text-black"}
                                    placeholder="Enter name" />
                            </Form.Group>
                            <Form.Group as={Col} controlId = "formGridSurname">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control required
                                    type="text" name="surname"
                                    value={this.state.surname}
                                    onChange={this.EmployeeChange}
                                    className={"bg-gray text-black"}
                                    placeholder="Enter surname" />
                            </Form.Group>
                            <Form.Group as={Col} controlId = "formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required
                                    type="email" name="email"
                                    value={this.state.email}
                                    onChange={this.EmployeeChange}
                                    className={"bg-gray text-black"}
                                    placeholder="Enter email" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId = "formGridBirthday">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control required
                                    type="date" name="birthday"
                                    value={this.state.birthday}
                                    onChange={this.EmployeeChange}
                                    className={"bg-gray text-black"}
                                    placeholder="Enter birthday" />
                            </Form.Group>
                            <Form.Group as={Col} controlId = "formGridPhoneNumber">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control required
                                    type="text" name="phoneNumber"
                                    value={this.state.phoneNumber}
                                    onChange={this.EmployeeChange}
                                    className={"bg-gray text-black"}
                                    placeholder="Enter phone number" />
                            </Form.Group>
                        </Form.Row>
                </Card.Body>
                    <Card.Footer style = {{"textAlign":"right"}}>
                    <Button size = "sm" variant="success" type="submit">
                        <FontAwesomeIcon icon={faSave} /> Submit
                    </Button>
                    </Card.Footer>
                </Form>
            </Card>
        )
    }
}
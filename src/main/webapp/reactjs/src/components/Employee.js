import React, {Component} from "react";
import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import MyToast from "./MyToast";
export default class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.EmployeeChange = this.EmployeeChange.bind(this);
        this.submitEmployee = this.submitEmployee.bind(this);
    }

    initialState = {
        name:'', surname:'', email:'', birthday:'', phoneNumber:''
    }

    resetEmployee = () => {
        this.setState(() => this.initialState)
    }

    submitEmployee = event => {
        event.preventDefault()

        const  employee = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            birthday: this.state.birthday,
            phoneNumber: this.state.phoneNumber
        };

        axios.post("http://localhost:9090/employee", employee)
            .then(response => {
            if (response.data != null) {
                this.setState({"show": true});
                setTimeout(() => this.setState({"show":false}),2000);
            } else {
                this.setState({"show": false});

            }
        });

        this.setState(this.initialState);

    }

    EmployeeChange = event => {
        this.setState({
        [event.target.name]:event.target.value
        });
    }

    render() {
        const {name, surname, email, birthday, phoneNumber} = this.state;

        return (
            <div>
                <div style={{"display": this.state.show? "block" : "none"}}>
                    <MyToast children={{show:this.state.show, message:"Saved Successfully"}}/>
                </div>



            <Card className="border border-dark bg-gray text-black">
                <Card.Header><FontAwesomeIcon icon={faPlusSquare} />
                    Add Employee
                </Card.Header>
                <Form onReset={this.resetEmployee} onSubmit={this.submitEmployee} id="bookFormId">
                <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId = "formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control required autoComplete = "off"
                                    type="text" name="name"
                                    value={name}
                                    onChange={this.EmployeeChange}
                                    className={"bg-gray text-black"}
                                    placeholder="Enter name" />
                            </Form.Group>
                            <Form.Group as={Col} controlId = "formGridSurname">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control required autoComplete = "off"
                                    type="text" name="surname"
                                    value={surname}
                                    onChange={this.EmployeeChange}
                                    className={"bg-gray text-black"}
                                    placeholder="Enter surname" />
                            </Form.Group>
                            <Form.Group as={Col} controlId = "formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required autoComplete = "off"
                                    type="email" name="email"
                                    value={email}
                                    onChange={this.EmployeeChange}
                                    className={"bg-gray text-black"}
                                    placeholder="Enter email" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId = "formGridBirthday">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control required autoComplete = "off"
                                    type="date" name="birthday"
                                    value={birthday}
                                    onChange={this.EmployeeChange}
                                    className={"bg-gray text-black"}
                                    placeholder="Enter birthday" />
                            </Form.Group>
                            <Form.Group as={Col} controlId = "formGridPhoneNumber">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control required autoComplete = "off"
                                    type="text" name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={this.EmployeeChange}
                                    className={"bg-gray text-black"}
                                    placeholder="Enter phone number" />
                            </Form.Group>
                        </Form.Row>
                </Card.Body>
                    <Card.Footer style = {{"textAlign":"right"}}>
                    <Button size = "sm" variant="success" type="submit">
                        <FontAwesomeIcon icon={faSave} /> Submit
                    </Button>{' '}

                    <Button size = "sm" variant="info" type="reset">
                        <FontAwesomeIcon icon={faUndo} /> Reset
                    </Button>
                    </Card.Footer>
                </Form>
            </Card>
            </div>
        )
    }
}
import React, {Component} from "react";
import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faPlusSquare, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import MyToast from "./MyToast";

export default class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.EmployeeChange = this.EmployeeChange.bind(this);
        this.submitEmployee = this.submitEmployee.bind(this);
    };

    initialState = {
      id:'', name: '', surname: '', email: '', birthday: '', phoneNumber: ''
    };

    componentDidMount() {
        const employeeId = + this.props.match.params.id;
        if (employeeId) {
            this.findEmployeeByID(employeeId);
        }
    }

    findEmployeeByID = (employeeId) => {
        axios.get("http://localhost:9090/employee/" + employeeId)
            .then(response => {
                if (response.data !=null) {
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        surname: response.data.surname,
                        email: response.data.email,
                        birthday: response.data.birthday,
                        phoneNumber: response.data.phoneNumber
                    });
                }
            }).catch((error) => {
            console.error("Error - " + error);
        });
    }

    resetEmployee = () => {
        this.setState(() => this.initialState)
    };

    submitEmployee = event => {
        event.preventDefault()

        const employee = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            birthday: this.state.birthday,
            phoneNumber: this.state.phoneNumber
        };

        axios.post("http://localhost:9090/employee", employee)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true, "method" : "post"});
                    setTimeout(() => this.setState({"show": false}), 2000);
                } else {
                    this.setState({"show": false});
                }
            });

        this.setState(this.initialState);
    };

    updateEmployee = event => {

        event.preventDefault();

        const employee = {
            id: this.state.id,
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            birthday: this.state.birthday,
            phoneNumber: this.state.phoneNumber
        };

        axios.put("http://localhost:9090/employee", employee)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true, "method" : "put"});
                    setTimeout(() => this.setState({"show": false}), 2000);
                    setTimeout(() => this.employeeList(), 2000);
                } else {
                    this.setState({"show": false});
                }
            });

        this.setState(this.initialState);
    };

    EmployeeChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    employeeList = () =>{
      return this.props.history.push("/employee/all");
    };


    render() {
        const {name, surname, email, birthday, phoneNumber} = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Updated Successfully" :"Saved Successfully" } type = {"success"}/>
                </div>


                <Card className="border border-dark bg-gray text-black">
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Update Employee" : "New Employee"}
                    </Card.Header>
                    <Form onReset={this.resetEmployee} onSubmit={this.state.id ? this.updateEmployee: this.submitEmployee} id="bookFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="name"
                                                  value={name}
                                                  onChange={this.EmployeeChange}
                                                  className={"bg-gray text-black"}
                                                  placeholder="Enter name"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridSurname">
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="surname"
                                                  value={surname}
                                                  onChange={this.EmployeeChange}
                                                  className={"bg-gray text-black"}
                                                  placeholder="Enter surname"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="email" name="email"
                                                  value={email}
                                                  onChange={this.EmployeeChange}
                                                  className={"bg-gray text-black"}
                                                  placeholder="Enter email"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridBirthday">
                                    <Form.Label>Birthday</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="date" name="birthday"
                                                  value={birthday}
                                                  onChange={this.EmployeeChange}
                                                  className={"bg-gray text-black"}
                                                  placeholder="Enter birthday"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPhoneNumber">
                                    <Form.Label>Phone number</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="phoneNumber"
                                                  value={phoneNumber}
                                                  onChange={this.EmployeeChange}
                                                  className={"bg-gray text-black"}
                                                  placeholder="Enter phone number"/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick ={this.employeeList.bind()}>
                                <FontAwesomeIcon icon={faList}/> Employees List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}
import React, {Component} from "react";
import {Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";

export default class List extends Component {
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
                        </tr>
                        </thead>
                        <tbody>
                        <tr align="center">
                            <td colSpan="6">No Employees Available</td>
                        </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        )
    }
}
import React from "react";
import {Jumbotron} from "react-bootstrap";

class Welcome extends React.Component {
    render() {
        return (
            <Jumbotron>
                <h1>Hello, quest!</h1>
                <p>
                    This is a test crud application using React.js and SpringBoot framework.
                </p>
            </Jumbotron>
        )
    }
}

export default Welcome;
import React from "react";
import {Navbar, Col, Container} from "react-bootstrap";

class Footer extends React.Component {
    render() {
        let fullYear = new Date().getFullYear();
        return (<Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div>{fullYear}, All Rights Reserved by Kasymov Argen</div>
                    </Col>
                </Container>
            </Navbar>
        )
    }
}
export default Footer;
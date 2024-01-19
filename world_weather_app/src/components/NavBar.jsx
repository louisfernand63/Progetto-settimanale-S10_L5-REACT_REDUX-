import React from 'react'

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function NavBar({query}) {
    

    const onChange = (event) => {
        query(event.target.value);
    }
    
    return (
        <Navbar expand="lg" className="">
            <Container fluid>
                <Navbar.Brand href="#"><img src="https://icons.iconarchive.com/icons/wineass/ios7-redesign/256/Weather-icon.png" alt="" style={{width: "50px"}} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                
                        
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="🔍  Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => onChange(e)}
                        />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}






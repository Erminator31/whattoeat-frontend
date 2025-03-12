import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

function HomePage() {
    return (
        <Container className="mt-5">
            <h1>Willkommen auf der Startseite</h1>
            <Row className="mt-4">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Was ist EatrApp?</Card.Title>
                            <Card.Text>
                                Eine kurze Erklärung, was deine App macht.
                            </Card.Text>
                            <Button variant="primary">Mehr erfahren</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Vorteile</Card.Title>
                            <Card.Text>
                                Listet ein paar Vorteile oder Features deiner App auf.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Kontakt</Card.Title>
                            <Card.Text>
                                E-Mail, Ansprechpartner, etc.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage

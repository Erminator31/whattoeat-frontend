// src/components/Register.jsx
import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    })
    const [message, setMessage] = useState(null)

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', formData)
            // Falls dein Controller "User erfolgreich registriert" zurückgibt:
            setMessage({ text: response.data, variant: 'success' })
            navigate('/Login')
        } catch (error) {
            // Backend schickt bei Fehler: "Fehler bei der Registrierung: <Grund>"
            setMessage({
                text: error.response?.data || 'Fehler bei der Registrierung',
                variant: 'danger'
            })
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Registrieren</h2>
            {message && <Alert variant={message.variant}>{message.text}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E-Mail eingeben"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Vorname</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Vorname eingeben"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nachname</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Nachname eingeben"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Passwort</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Passwort eingeben"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Registrieren
                </Button>
            </Form>
        </div>
    )
}

export default Register

// src/components/EditUser.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import customAxios from './axiosconfig';

function EditUser() {
    const { email } = useParams();
    const [user, setUser] = useState({
        email: '',
        firstName: '',
        lastName: ''
    });
    const [message, setMessage] = useState(null);

    useEffect(() => {
        // Lade die Nutzerdaten anhand der E-Mail
        customAxios.get('http://localhost:8080/api/users/view', {
            params: { email }
        })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                setMessage({
                    text: error.response?.data || 'Fehler beim Laden der Benutzerdaten',
                    variant: 'danger'
                });
            });
    }, [email]);

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        customAxios.put('http://localhost:8080/api/users/update', {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        })
            .then(response => {
                setMessage({ text: response.data, variant: 'success' });
            })
            .catch(error => {
                setMessage({
                    text: error.response?.data || 'Fehler beim Aktualisieren',
                    variant: 'danger'
                });
            });
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Benutzerdaten bearbeiten</h2>
            {message && <Alert variant={message.variant}>{message.text}</Alert>}
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={user.email}
                        readOnly
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Vorname</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        placeholder="Vorname"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nachname</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        placeholder="Nachname"
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleUpdate}>
                    Speichern
                </Button>
            </Form>
        </div>
    );
}

export default EditUser;

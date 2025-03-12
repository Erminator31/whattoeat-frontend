// src/components/EditUser.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import customAxios from './axiosconfig';

function EditUser() {
    const location = useLocation();
    const navigate = useNavigate();
    // Hole den User aus dem state; als Fallback können auch eigene API-Aufrufe erfolgen
    const { user: initialUser } = location.state || {};
    const [user, setUser] = useState(initialUser || { email: '', firstName: '', lastName: '', role: '' });
    const [message, setMessage] = useState(null);

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // Beispiel-Endpunkt zum Aktualisieren inkl. Rollenänderung
            const response = await customAxios.put('http://localhost:8080/api/users/update', user);
            setMessage({ text: response.data, variant: 'success' });
            navigate('/userlist');
        } catch (error) {
            setMessage({
                text: error.response?.data || 'Fehler beim Aktualisieren',
                variant: 'danger'
            });
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>User bearbeiten</h2>
            {message && <Alert variant={message.variant}>{message.text}</Alert>}
            <Form onSubmit={handleSubmit}>
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
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nachname</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Rolle</Form.Label>
                    <Form.Control
                        as="select"
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Aktualisieren
                </Button>
            </Form>
        </div>
    );
}

export default EditUser;

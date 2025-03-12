// src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/forgot-password', { email });
            setMessage({ text: response.data, variant: 'success' });
        } catch (error) {
            setMessage({
                text: error.response?.data || 'Fehler beim Anfordern des Passwort-Resets',
                variant: 'danger'
            });
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Passwort vergessen?</h2>
            {message && <Alert variant={message.variant}>{message.text}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="E-Mail eingeben"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Reset-Link senden
                </Button>
            </Form>
        </div>
    );
}

export default ForgotPassword;

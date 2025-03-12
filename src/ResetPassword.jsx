// src/components/ResetPassword.jsx
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); // <-- hier wird der Token ausgelesen
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage({ text: 'Passwörter stimmen nicht überein.', variant: 'danger' });
            return;
        }
        try {
            // POST-Request an dein Backend-Endpunkt
            const response = await axios.post(
                `http://localhost:8080/api/users/reset-password?token=${token}`,
                { password }
            );
            setMessage({ text: response.data, variant: 'success' });
            // Optional: Weiterleitung zum Login
            navigate('/login');
        } catch (error) {
            setMessage({
                text: error.response?.data || 'Fehler beim Zurücksetzen des Passworts',
                variant: 'danger'
            });
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Neues Passwort setzen</h2>
            {message && <Alert variant={message.variant}>{message.text}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Neues Passwort</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Neues Passwort"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Passwort bestätigen</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Passwort bestätigen"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Passwort zurücksetzen
                </Button>
            </Form>
        </div>
    );
}

export default ResetPassword;

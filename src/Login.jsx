// src/components/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import customAxios from './axiosconfig';
import { AuthContext } from './AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await customAxios.post('http://localhost:8080/api/users/login', {
                email,
                password
            });
            console.log('Login Response', response.data);
            const { token, role } = response.data;

            // AuthContext updaten
            login(token, email, role);

            navigate('/');
        } catch (error) {
            setMessage({
                text: error.response?.data || 'Login fehlgeschlagen',
                variant: 'danger'
            });
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Login</h2>
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

                <Form.Group className="mb-3">
                    <Form.Label>Passwort</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Passwort eingeben"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default Login;
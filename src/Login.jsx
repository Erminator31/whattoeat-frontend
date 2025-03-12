// src/components/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import customAxios from './axiosconfig';
import { AuthContext } from './AuthContext';

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(
        location.state?.info ? { text: location.state.info, variant: 'info' } : null
    );

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await customAxios.post('http://localhost:8080/api/users/login', { email, password });
            const { token, role } = response.data;
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
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card style={{ maxWidth: '400px', width: '100%' }}>
                <Card.Body>
                    <Card.Title className="mb-4">Login</Card.Title>
                    {message && <Alert variant={message.variant}>{message.text}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="E-Mail eingeben"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Passwort</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Passwort eingeben"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                    </Form>
                    <div className="mt-3 text-center">
                        <Link to="/forgot-password">Passwort vergessen?</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;

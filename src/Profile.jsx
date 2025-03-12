// src/components/Profile.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import customAxios from "./axiosconfig.js";
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        firstName: '',
        lastName: ''
    });
    const [message, setMessage] = useState(null);
    const [deletePassword, setDeletePassword] = useState('');

    // Lade die Benutzerdaten basierend auf der globalen userEmail
    useEffect(() => {
        if (auth.userEmail) {
            customAxios.get('http://localhost:8080/api/users/view', {
                params: { email: auth.userEmail }
            })
                .then(res => {
                    setUser(res.data);
                })
                .catch(err => {
                    setMessage({
                        text: err.response?.data || 'Fehler beim Laden der Daten',
                        variant: 'danger'
                    });
                });
        }
    }, [auth.userEmail]);

    const handleUpdate = () => {
        customAxios
            .put('http://localhost:8080/api/users/update', {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            })
            .then(res => {
                setMessage({ text: res.data, variant: 'success' });
            })
            .catch(err => {
                setMessage({
                    text: err.response?.data || 'Fehler beim Aktualisieren',
                    variant: 'danger'
                });
            });
    };

    const handleDelete = () => {
        if (!user.email || !deletePassword) {
            setMessage({ text: 'Bitte Passwort angeben', variant: 'warning' });
            return;
        }
        customAxios
            .delete('http://localhost:8080/api/users/delete', {
                data: {
                    email: user.email,
                    password: deletePassword
                }
            })
            .then(res => {
                setMessage({ text: res.data, variant: 'success' });
                // Account-Daten zurücksetzen
                setUser({ email: '', firstName: '', lastName: '' });
                setDeletePassword('');
                logout();
                // Zur Startseite navigieren
                navigate('/');
            })
            .catch(err => {
                setMessage({
                    text: err.response?.data || 'Fehler beim Löschen',
                    variant: 'danger'
                });
            });
    };

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Profil</h2>
            {message && <Alert variant={message.variant}>{message.text}</Alert>}

            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>E-Mail (zum Updaten / Löschen)</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Vorname</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        placeholder="Max"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nachname</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        placeholder="Mustermann"
                    />
                </Form.Group>

                <Button variant="primary" onClick={handleUpdate}>
                    Aktualisieren
                </Button>
            </Form>

            <hr />

            <div>
                <h3>Account löschen</h3>
                <Form.Group className="mb-3">
                    <Form.Label>Passwort (für die Löschung)</Form.Label>
                    <Form.Control
                        type="password"
                        value={deletePassword}
                        onChange={e => setDeletePassword(e.target.value)}
                        placeholder="Passwort eingeben"
                    />
                </Form.Group>
                <Button variant="danger" onClick={handleDelete}>
                    Account löschen
                </Button>
            </div>
        </div>
    );
}

export default Profile;
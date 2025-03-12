// src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import customAxios from './axiosconfig';
import { useNavigate } from 'react-router-dom';

function UserList() {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Beispiel-Endpunkt, der alle Nutzer zurückliefert:
        customAxios.get('http://localhost:8080/api/users/all')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                setMessage({
                    text: error.response?.data || 'Fehler beim Laden der Benutzer',
                    variant: 'danger'
                });
            });
    }, []);

    const handleDelete = (email) => {
        // Für Admins: Löschung ohne Passwort
        customAxios.delete('http://localhost:8080/api/users/delete', { data: { email } })
            .then(response => {
                setMessage({ text: response.data, variant: 'success' });
                // Entferne den gelöschten Nutzer aus der Tabelle
                setUsers(users.filter(user => user.email !== email));
            })
            .catch(error => {
                setMessage({
                    text: error.response?.data || 'Fehler beim Löschen',
                    variant: 'danger'
                });
            });
    };

    const handleEdit = (user) => {
        // Navigiert zur Bearbeitungsseite und übergibt das gesamte User-Objekt
        navigate(`/edit-user/${user.email}`, { state: { user } });
    };

    return (
        <div className="container mt-5">
            <h2>Nutzerverwaltung</h2>
            {message && <Alert variant={message.variant}>{message.text}</Alert>}
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Email</th>
                    <th>Vorname</th>
                    <th>Nachname</th>
                    <th>Rolle</th>
                    <th>Aktionen</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.email}>
                        <td>{user.email}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.role}</td>
                        <td>
                            <Button variant="warning" onClick={() => handleEdit(user)} className="me-2">
                                Bearbeiten
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(user.email)}>
                                Löschen
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>

            </Table>
        </div>
    );
}

export default UserList;

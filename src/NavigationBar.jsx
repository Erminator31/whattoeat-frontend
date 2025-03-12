import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { AuthContext } from './AuthContext';
import customAxios from "./axiosconfig.js";

function NavigationBar() {
    const { auth, logout } = useContext(AuthContext);

    // Check, ob eingeloggt
    const isLoggedIn = !!auth.token;
    // Check, ob Admin
    const isAdmin = auth.role === 'ADMIN';

    const handleLogout = async () => {
        try {
            await customAxios.post('http://localhost:8080/api/users/logout');

            logout();

             navigate('/');
        } catch (error) {
            console.error('Logout error: ', error);
        }
    };
    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">
                MeineApp
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {/* Nur sichtbar, wenn man NICHT eingeloggt ist */}
                    {!isLoggedIn && (
                        <>
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/register">
                                Register
                            </Nav.Link>
                        </>
                    )}

                    {/* Nur sichtbar, wenn man eingeloggt ist */}
                    {isLoggedIn && (
                        <>
                            <Nav.Link as={Link} to="/profile">
                                Profil
                            </Nav.Link>
                        </>
                    )}

                    {/* Nur sichtbar, wenn man eingeloggt und Admin ist */}
                    {isLoggedIn && isAdmin && (
                        <Nav.Link as={Link} to="/userlist">
                            Userliste
                        </Nav.Link>
                    )}
                </Nav>

                {/* Logout-Button nur, wenn eingeloggt */}
                {isLoggedIn && (
                    <Button variant="outline-danger" onClick={handleLogout}>
                        Logout
                    </Button>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;

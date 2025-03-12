// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import HomePage from "./Homepage";
import PrivateRoute from "./PrivateRoute";
import UserList from "./UserList";
import EditUser from "./EditUser";
import { AuthProvider } from "./AuthContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    {/* Route für die Userliste (nur Admins zugänglich) */}
                    <Route
                        path="/userlist"
                        element={
                            <PrivateRoute>
                                <UserList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/edit-user/:email"
                        element={
                            <PrivateRoute>
                                <EditUser />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

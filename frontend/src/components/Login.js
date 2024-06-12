import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box, Alert } from '@mui/material';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/tasks');
        } catch (error) {
            setError(error.response?.data.message || 'Login failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Login</Typography>
                {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;

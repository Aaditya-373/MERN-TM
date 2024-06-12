// src/components/TaskForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography, Alert } from '@mui/material';

function TaskForm() {
    const [taskName, setTaskName] = useState('');
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState(null);

    const addTask = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await axios.post('http://localhost:5000/api/tasks', {
                name: taskName,
                deadline,
                completed: false
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setTaskName('');
            setDeadline('');
        } catch (error) {
            setError(error.response?.data.message || 'Failed to add task');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Add Task</Typography>
                {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={addTask} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Task Name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Deadline"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        variant="outlined"
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                        Add Task
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default TaskForm;

// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Checkbox, Container, Typography, Paper, Box } from '@mui/material';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('http://localhost:5000/api/tasks', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setTasks(response.data);
        };

        fetchTasks();
    }, []);

    const toggleComplete = async (task) => {
        await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
            ...task, completed: !task.completed
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        setTasks(tasks.map(t => t._id === task._id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" gutterBottom>Task List</Typography>
                {tasks.map(task => (
                    <Paper key={task._id} sx={{ mb: 2, padding: 2, display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            edge="start"
                            checked={task.completed}
                            tabIndex={-1}
                            onChange={() => toggleComplete(task)}
                        />
                        <ListItemText
                            primary={task.name}
                            secondary={`Deadline: ${new Date(task.deadline).toLocaleDateString()}`}
                        />
                    </Paper>
                ))}
            </Box>
        </Container>
    );
}

export default TaskList;

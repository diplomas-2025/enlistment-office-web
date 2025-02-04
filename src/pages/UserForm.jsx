import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Paper,
    Typography
} from '@mui/material';
import { UserAPI } from '../api/api';
import {useNavigate} from "react-router-dom";

const UserForm = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UserAPI.addUser(formData.email, formData.password)
            .then(() => {
                navigate("/users")
            })
            .catch(error => console.error('Ошибка создания пользователя:', error));
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1C2E4A, #4A5568)',
                padding: 3,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    width: '100%',
                    maxWidth: 500,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1C2E4A' }}>
                    Добавить пользователя
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Пароль"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, background: '#D32F2F', '&:hover': { background: '#B71C1C' } }}>
                        Создать пользователя
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default UserForm;
import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    InputAdornment,
    IconButton,
    Paper,
    Fade,
} from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthAPI } from "../api/api";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('')
        AuthAPI.login(email, password).then(() => {
            window.location.reload();
        }).catch(() => {
            setMessage('Ошибка')
        })
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1C2E4A, #4A5568)', // Градиентный фон
            }}
        >
            <Fade in={true} timeout={1000}>
                <Paper
                    elevation={10}
                    sx={{
                        padding: 4,
                        borderRadius: 4,
                        width: '100%',
                        maxWidth: 400,
                        background: 'rgba(255, 255, 255, 0.9)', // Полупрозрачный белый фон
                        backdropFilter: 'blur(10px)', // Размытие для стеклянного эффекта
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            mb: 3,
                            color: '#1C2E4A', // Темно-синий цвет заголовка
                        }}
                    >
                        Вход
                    </Typography>
                    { message !== '' &&
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'red', // Красный цвет для ошибки
                                textAlign: 'center',
                                mt: 2,
                            }}
                        >
                            {message}
                        </Typography>
                    }
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email sx={{ color: '#1C2E4A' }} /> {/* Темно-синий цвет иконки */}
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Пароль"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock sx={{ color: '#1C2E4A' }} /> {/* Темно-синий цвет иконки */}
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePasswordVisibility}>
                                            {showPassword ? (
                                                <VisibilityOff sx={{ color: '#1C2E4A' }} />
                                                ) : (
                                                <Visibility sx={{ color: '#1C2E4A' }} />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                                mt: 3,
                                mb: 2,
                                borderRadius: 2,
                                background: '#D4AF37', // Золотой цвет кнопки
                                color: '#FFFFFF', // Белый текст
                                fontWeight: 'bold',
                                fontSize: 16,
                                padding: 1.5,
                                '&:hover': {
                                    background: '#B8860B', // Темнее золотой при наведении
                                },
                            }}
                        >
                            Войти
                        </Button>
                    </Box>
                </Paper>
            </Fade>
        </Box>
    );
};

export default LoginScreen;
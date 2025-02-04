import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Paper,
    Typography,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import { UserAPI } from '../api/api';
import {useLocation, useNavigate} from 'react-router-dom';

const WorkForm = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");

    const [formData, setFormData] = useState({
        organization: '',
        position: '',
        postponement: false
    });

    useEffect(() => {
        if (userId) {
            UserAPI.getUserById(userId).then(data => {
                setFormData(data.accounting?.work || {});
            }).catch(error => {
                console.error('Ошибка загрузки информации о работе:', error);
            });
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UserAPI.addWork(userId, formData)
            .then(() => {
                navigate("/profile?userId=" + userId)
            })
            .catch(error => console.error('Ошибка обновления:', error));
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
                    {userId ? 'Редактировать место работы' : 'Добавить место работы'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Организация"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Должность"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Отсрочка</InputLabel>
                        <Select
                            name="postponement"
                            value={formData.postponement}
                            onChange={handleChange}
                        >
                            <MenuItem value={true}>Есть</MenuItem>
                            <MenuItem value={false}>Нет</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, background: '#D32F2F', '&:hover': { background: '#B71C1C' } }}>
                        {userId ? 'Сохранить изменения' : 'Добавить'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default WorkForm;

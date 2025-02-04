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
import {useLocation, useNavigate} from "react-router-dom";

const StudyPlaceForm = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");

    const [formData, setFormData] = useState({
        name: '',
        currentCourse: '',
        postponement: false,
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        if (userId) {
            UserAPI.getUserById(userId).then(data => {
                setFormData(data.accounting.study || {});
            }).catch(error => {
                console.error('Ошибка загрузки данных об учебе:', error);
            });
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UserAPI.addStudy(userId, formData)
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
                    {userId ? 'Редактировать место учебы' : 'Добавить место учебы'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Название"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Курс"
                        name="currentCourse"
                        type="number"
                        value={formData.currentCourse}
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
                    <TextField
                        label="Дата начала"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Дата окончания"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, background: '#D32F2F', '&:hover': { background: '#B71C1C' } }}>
                        {userId ? 'Сохранить изменения' : 'Добавить'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default StudyPlaceForm;
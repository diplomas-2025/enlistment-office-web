import React, {useEffect, useState} from 'react';
import {
    Box,
    TextField,
    Button,
    Paper,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import {useLocation, useNavigate} from "react-router-dom";
import {UserAPI} from "../api/api";

const PassportForm = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");

    const [formData, setFormData] = useState({
        issued: '',
        dateIssue: '',
        series: '',
        number: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        gender: 'M',
        birthday: '',
        addressCity: '',
        addressStreet: '',
        addressHouseNumber: '',
        addressApartmentNumber: ''
    });

    useEffect(() => {
        UserAPI.getUserById(userId).then((data) => {
            if (data.accounting.passport)
                setFormData(data.accounting.passport)
        })
    }, [userId])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UserAPI.addPassport(userId, formData).then(() => {
            navigate("/profile?userId=" + userId)
        })
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
                    Форма паспорта
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField label="Кем выдан" name="issued" value={formData.issued} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Дата выдачи" name="dateIssue" type="date" value={formData.dateIssue} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                    <TextField label="Серия" name="series" value={formData.series} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Номер" name="number" value={formData.number} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Имя" name="first_name" value={formData.first_name} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Фамилия" name="last_name" value={formData.last_name} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Отчество" name="middle_name" value={formData.middle_name} onChange={handleChange} fullWidth margin="normal" />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Пол</InputLabel>
                        <Select name="gender" value={formData.gender} onChange={handleChange}>
                            <MenuItem value="M">Мужской</MenuItem>
                            <MenuItem value="F">Женский</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField label="Дата рождения" name="birthday" type="date" value={formData.birthday} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                    <TextField label="Город" name="addressCity" value={formData.addressCity} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Улица" name="addressStreet" value={formData.addressStreet} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Дом" name="addressHouseNumber" value={formData.addressHouseNumber} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Квартира" name="addressApartmentNumber" type="number" value={formData.addressApartmentNumber} onChange={handleChange} fullWidth margin="normal" />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, background: '#D32F2F', '&:hover': { background: '#B71C1C' } }}>
                        Сохранить
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default PassportForm;

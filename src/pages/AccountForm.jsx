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
import {EnlistmentOfficeAPI, UserAPI} from '../api/api';
import {useLocation, useNavigate} from "react-router-dom";

const AccountForm = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");

    const [formData, setFormData] = useState({
        enlistmentOfficeId: '',
        status: '',
        maritalStatus: '',
        phoneNumber: '',
        phoneNumberCode: ''
    });

    const [enlistmentOffices, setEnlistmentOffices] = useState([]);

    useEffect(() => {
        if (userId) {
            UserAPI.getUserById(userId).then(data => {
                setFormData({
                    enlistmentOfficeId: data.accounting.enlistmentOffice.id,
                    status: data.accounting.status,
                    maritalStatus: data.accounting.maritalStatus,
                    phoneNumber: data.accounting.phoneNumber,
                    phoneNumberCode: data.accounting.phoneNumberCode
                })
            }).catch(error => {
                console.error('Ошибка загрузки учетной записи:', error);
            });
        }

        EnlistmentOfficeAPI.getAllEnlistmentOffices().then(data => {
            setEnlistmentOffices(data);
        }).catch(error => {
            console.error('Ошибка загрузки военкоматов:', error);
        });
    }, [userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UserAPI.addAccounting(userId, formData)
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
                    {userId ? 'Редактировать учетную запись' : 'Создать учетную запись'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Военкомат</InputLabel>
                        <Select
                            name="enlistmentOfficeId"
                            value={formData.enlistmentOfficeId}
                            onChange={handleChange}
                        >
                            {enlistmentOffices.map(office => (
                                <MenuItem key={office.id} value={office.id}>
                                    {`${office.city}, ${office.street}, ${office.houseNumber}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Статус</InputLabel>
                        <Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="FIT">Годен</MenuItem>
                            <MenuItem value="NO_FIT">Не годен</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Семейное положение</InputLabel>
                        <Select
                            name="maritalStatus"
                            value={formData.maritalStatus}
                            onChange={handleChange}
                        >
                            <MenuItem value="NOT_MARRIED">Холост</MenuItem>
                            <MenuItem value="MARRIED">Женат</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Код страны"
                        name="phoneNumberCode"
                        value={formData.phoneNumberCode}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Номер телефона"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, background: '#D32F2F', '&:hover': { background: '#B71C1C' } }}>
                        {userId ? 'Сохранить изменения' : 'Создать'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default AccountForm;
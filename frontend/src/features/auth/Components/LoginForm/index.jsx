import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from 'Components/FormControl/InputField';
import PasswordField from 'Components/FormControl/PasswordtField';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};
const useStyles = makeStyles({
    form: {
        width: '400px',
    },
    headerform: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
    },
    submit: {
        margin: '20px 0px',
        padding: '10px 0px',
    },
    progress: {
        top: -10,
    },
});

function LoginForm(props) {
    const { onSubmit } = props;
    const classes = useStyles();
    const schema = yup
        .object()
        .shape({
            customer_email: yup
                .string()
                .required('Please enter your username or email')
                .email('Please enter a valid email'),
            customer_password: yup.string().required('Please enter password'),
        })
        .required();

    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            customer_email: '',
            customer_password: '',
        },
        resolver: yupResolver(schema),
    });

    const { isSubmitting } = formState;

    return (
        <div>
            {isSubmitting && <LinearProgress className={classes.progress} />}
            <div className={classes.headerform}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng Nhập
                </Typography>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <InputField
                    name="customer_email"
                    label="Email"
                    control={control}
                    formState={formState}
                />
                <PasswordField
                    name="customer_password"
                    label="Password"
                    control={control}
                    formState={formState}
                />

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    className={classes.submit}
                    fullWidth
                >
                    Đăng Nhập
                </Button>
            </form>
        </div>
    );
}

export default LoginForm;

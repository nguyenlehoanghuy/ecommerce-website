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
import GenderRadio from 'Components/FormControl/GenderRadio';
import DatePickerField from 'Components/FormControl/DatePickerField';
import differenceInYears from 'date-fns/differenceInYears';
import moment from 'moment';

RegisterForm.propTypes = {
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

function RegisterForm(props) {
    const { onSubmit } = props;
    const classes = useStyles();
    const schema = yup
        .object()
        .shape({
            customer_name: yup
                .string()
                .required('Please enter your full name')
                .test(
                    'should has at leats two words',
                    'Please enter at least two words',
                    (value) => {
                        return value.split(' ').length >= 2; // check have between words
                    }
                ),
            customer_email: yup
                .string()
                .required('Please enter your full name')
                .email('Please enter a valid email'),
            customer_password: yup
                .string()
                .required('Please enter password')
                .min(6, 'Please enter at least 6 characters'),
            customer_phone: yup
                .string()
                .required('Please enter phone number')
                .min(10, 'Please enter at least 10 numbers'),
            customer_address: yup.string().required('Please enter your address'),
            customer_gender: yup.string().required('Please enter your gender'),
            customer_datebirth: yup
                .string()
                .nullable()
                .test('dateOfBirth', 'You must be 18 years or older', function (value) {
                    return (
                        differenceInYears(
                            new Date(),
                            new Date(moment(value).format('YYYY-MM-DD'))
                        ) >= 18
                    );
                })
                .required('Please enter your age'),
            retypePassword: yup
                .string()
                .required('Please retype your password')
                .oneOf([yup.ref('customer_password')], 'Password does not match'),
        })
        .required();

    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            customer_name: '',
            customer_email: '',
            customer_phone: '',
            customer_address: '',
            customer_password: '',
            customer_gender: '',
            customer_datebirth: '',
            retypePassword: '',
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
                    Đăng Ký
                </Typography>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <InputField
                    name="customer_name"
                    label="Full Name"
                    control={control}
                    formState={formState}
                />
                <InputField
                    name="customer_email"
                    label="Email"
                    control={control}
                    formState={formState}
                />
                <InputField
                    name="customer_phone"
                    label="Phone Number"
                    control={control}
                    formState={formState}
                />
                <InputField
                    name="customer_address"
                    label="Address"
                    control={control}
                    formState={formState}
                />
                <GenderRadio
                    name="customer_gender"
                    label="Gender"
                    control={control}
                    formState={formState}
                />
                <DatePickerField
                    name="customer_datebirth"
                    label="Date Birth"
                    control={control}
                    formState={formState}
                />
                <PasswordField
                    name="customer_password"
                    label="Password"
                    control={control}
                    formState={formState}
                />
                <PasswordField
                    name="retypePassword"
                    label="Retype Password"
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
                    CREATE AN ACCOUNT
                </Button>
            </form>
        </div>
    );
}

export default RegisterForm;

import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from 'Components/FormControl/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Button, LinearProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GenderRadio from 'Components/FormControl/GenderRadio';
import DatePickerField from 'Components/FormControl/DatePickerField';
import differenceInYears from 'date-fns/differenceInYears';
import moment from 'moment';
import { Box } from '@mui/system';

UpdateInfoForm.propTypes = {
    onSubmit: PropTypes.func,
};
const useStyles = makeStyles({
    root: {
        marginLeft: '16px',
    },
    form: {
        width: '400px',
    },
    headerform: {
        position: 'relative',
    },
    submit: {
        margin: '20px 0px',
        padding: '8px 0px',
        width: '100px',
    },
    progress: {
        top: -10,
    },
});

function UpdateInfoForm(props) {
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
                .required('Please enter your date birth'),
        })
        .required();

    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            customer_name: '',
            customer_phone: '',
            customer_address: '',
            customer_gender: '',
            customer_datebirth: '',
        },
        resolver: yupResolver(schema),
    });

    const { isSubmitting } = formState;

    return (
        <Box className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progress} />}
            <div className={classes.headerform}>
                <Typography component="h1" variant="h6">
                    Thông tin tài khoản
                </Typography>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <Box>
                    <Typography variant="subtitle2">Họ tên</Typography>
                    <InputField
                        name="customer_name"
                        control={control}
                        formState={formState}
                        size="small"
                        margin="none"
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle2">Số điện thoại</Typography>
                    <InputField
                        name="customer_phone"
                        control={control}
                        formState={formState}
                        size="small"
                        margin="none"
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle2">Địa chỉ</Typography>
                    <InputField
                        name="customer_address"
                        control={control}
                        formState={formState}
                        size="small"
                        margin="none"
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle2">Ngày sinh</Typography>
                    <DatePickerField
                        name="customer_datebirth"
                        control={control}
                        formState={formState}
                        size="small"
                        margin="none"
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle2">Giới tính</Typography>
                    <GenderRadio name="customer_gender" control={control} formState={formState} />
                </Box>
                <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    className={classes.submit}
                >
                    Cập nhật
                </Button>
            </form>
        </Box>
    );
}

export default UpdateInfoForm;

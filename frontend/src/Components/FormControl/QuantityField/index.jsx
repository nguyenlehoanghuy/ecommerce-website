import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import NumberField from '../NumberField';

QuantityField.propTypes = {
    onBuySubmit: PropTypes.func,
    onAddSubmit: PropTypes.func,
};
const useStyles = makeStyles({
    root: {},
    buy: {
        color: 'white',
        padding: '6px 50px',
        '&:hover': {
            backgroundColor: '#cb1b21',
            color: 'white',
        },
        marginRight: '8px',
    },
    add: {
        border: '1px solid',
        '&:hover': {
            backgroundColor: '#f6f6f6',
        },
    },
    quantity: {
        display: 'flex',
    },
});

function QuantityField(props) {
    const { onBuySubmit, onAddSubmit } = props;
    const classes = useStyles();

    const schema = yup
        .object()
        .shape({
            quantity: yup.number().required('Please enter quantity'),
        })
        .required();

    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema),
    });

    const { isSubmitting } = formState;

    return (
        <Box className={classes.root}>
            <form className={classes.form}>
                <Box>
                    <Typography variant="subtitle2">Số lượng</Typography>
                    <Box className={classes.quantity}>
                        <NumberField
                            name="quantity"
                            control={control}
                            formState={formState}
                            size="small"
                            margin="none"
                        />
                    </Box>
                    <Box sx={{ marginTop: '20px' }}>
                        <Button
                            className={classes.buy}
                            disabled={isSubmitting}
                            onClick={handleSubmit(onBuySubmit)}
                            variant="contained"
                        >
                            MUA NGAY
                        </Button>
                        <Button
                            className={classes.add}
                            disabled={isSubmitting}
                            type="submit"
                            variant="outlined"
                            onClick={handleSubmit(onAddSubmit)}
                        >
                            THÊM VÀO GIỎ HÀNG
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
}

export default QuantityField;

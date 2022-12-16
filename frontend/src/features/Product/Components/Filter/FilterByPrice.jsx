import React from 'react';
import { useState } from 'react';

import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GRAY_COLOR } from 'constants/index';
import NumberFormat from 'react-number-format';

FilterByPrice.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
        />
    );
});

const useStyles = makeStyles({
    root: { padding: '20px', borderTop: `1px solid ${GRAY_COLOR}` },
    range: { display: 'flex', margin: '20px 0', '& > span': { margin: '0 20px' } },
});

function FilterByPrice({ onChange, filters }) {
    const classes = useStyles();
    const gteInput = React.useRef(null);
    const lteInput = React.useRef(null);

    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (onChange) onChange({ ...filters, ...values });
        setValues({
            salePrice_gte: 0,
            salePrice_lte: 0,
        });
    };

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2" fontWeight="bold">
                CHỌN KHOẢNG GIÁ
            </Typography>
            <Box className={classes.range}>
                <TextField
                    variant="standard"
                    name="salePrice_gte"
                    value={values.salePrice_gte}
                    onChange={handleChange}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }}
                    inputRef={gteInput}
                ></TextField>
                <span>-</span>
                <TextField
                    variant="standard"
                    name="salePrice_lte"
                    value={values.salePrice_lte}
                    onChange={handleChange}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }}
                    inputRef={lteInput}
                ></TextField>
            </Box>
            <Button variant="outlined" color="primary" onClick={handleSubmit}>
                Áp dụng
            </Button>
        </Box>
    );
}

export default FilterByPrice;

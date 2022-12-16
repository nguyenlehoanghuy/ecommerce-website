import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { useState } from 'react';
import { useSelector } from 'react-redux';

CartQuantityField.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    productId: PropTypes.number.isRequired,
    formState: PropTypes.object.isRequired,
    size: PropTypes.string,
    margin: PropTypes.string,

    label: PropTypes.string,
    disabled: PropTypes.bool,
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
            isNumericString
        />
    );
});

function CartQuantityField(props) {
    const {
        name,
        label,
        control,
        disabled,
        formState,
        size = 'medium',
        margin = 'normal',
        productId,
    } = props;
    const { errors } = formState;

    const hasError = !!errors[name];
    const messageError = errors[name]?.message;
    const NumberInput = React.useRef(null);

    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartItemQuantity = cartItems.find((x) => x.product_id === productId);

    const [number, setNumber] = useState(cartItemQuantity?.quantity * 1);
    const handleChange = (value) => {
        setNumber(value);
    };

    return (
        <div>
            <Controller
                control={control}
                name={name}
                label={label}
                disabled={disabled}
                render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                }) => (
                    <Box sx={{ display: 'flex' }}>
                        <Button
                            onClick={() => setNumber((prevValue) => prevValue - 1)}
                            type="submit"
                            sx={{ padding: 0, minWidth: '30px' }}
                        >
                            -
                        </Button>
                        <TextField
                            onChange={(e) => {
                                let value = e.target.value * 1;
                                if (value < 1) value = 1;
                                else if (value === '') value = 1;
                                handleChange(value);
                                onChange(value);
                            }} // send value to hook form
                            onBlur={onBlur} // notify when input is touched/blur
                            value={number} // input value
                            name={name} // send down the input name
                            label={label}
                            error={hasError}
                            helperText={messageError}
                            margin={margin}
                            size={size}
                            sx={{ width: '60px' }}
                            inputProps={{
                                style: {
                                    padding: 5,
                                    textAlign: 'center',
                                },
                            }}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                            inputRef={NumberInput}
                        />
                        <Button
                            onClick={() => setNumber((prevValue) => prevValue + 1)}
                            type="submit"
                            sx={{ padding: 0, minWidth: '30px' }}
                        >
                            +
                        </Button>
                    </Box>
                )}
            />
        </div>
    );
}

export default CartQuantityField;

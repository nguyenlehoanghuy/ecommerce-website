import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { useState } from 'react';

NumberField.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
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
            // isNumericString
        />
    );
});

function NumberField(props) {
    const { name, label, control, disabled, formState, size = 'medium', margin = 'normal' } = props;
    const { errors } = formState;

    const hasError = !!errors[name];
    const messageError = errors[name]?.message;
    const NumberInput = React.useRef(null);
    const [number, setNumber] = useState(1);
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
                    <>
                        <Button onClick={() => setNumber((prevValue) => prevValue - 1)}>-</Button>
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
                        <Button onClick={() => setNumber((prevValue) => prevValue + 1)}>+</Button>
                    </>
                )}
            />
        </div>
    );
}

export default NumberField;

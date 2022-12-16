import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';

PasswordField.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function PasswordField(props) {
    const { name, label, control, disabled, formState } = props;
    const { errors } = formState;

    const hasError = !!errors[name];
    const messageError = errors[name]?.message;

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword((x) => !x);
    };

    return (
        <FormControl fullWidth variant="outlined" margin={'normal'} error={hasError}>
            <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
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
                    <OutlinedInput
                        id={name}
                        type={showPassword ? 'text' : 'password'}
                        label={label}
                        onChange={onChange} // send value to hook form
                        onBlur={onBlur} // notify when input is touched/blur
                        value={value} // input value
                        name={name} // send down the input name
                        inputRef={ref} // send input ref, so we can focus on input when error appear
                        error={hasError}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                )}
            />
            <FormHelperText>{messageError}</FormHelperText>
        </FormControl>
    );
}

export default PasswordField;

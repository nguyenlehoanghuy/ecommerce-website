import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    formState: PropTypes.object.isRequired,
    size: PropTypes.string,
    margin: PropTypes.string,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputField(props) {
    const { name, label, control, disabled, formState, size = 'medium', margin = 'normal' } = props;
    const { errors } = formState;

    const hasError = !!errors[name];
    const messageError = errors[name]?.message;
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
                    <TextField
                        onChange={onChange} // send value to hook form
                        onBlur={onBlur} // notify when input is touched/blur
                        value={value} // input value
                        name={name} // send down the input name
                        label={label}
                        inputRef={ref} // send input ref, so we can focus on input when error appear
                        error={hasError}
                        helperText={messageError}
                        margin={margin}
                        size={size}
                        fullWidth
                    />
                )}
            />
        </div>
    );
}

export default InputField;

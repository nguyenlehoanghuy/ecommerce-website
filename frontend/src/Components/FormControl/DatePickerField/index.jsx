import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

DatePickerField.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    formState: PropTypes.object.isRequired,
    size: PropTypes.string,
    margin: PropTypes.string,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function DatePickerField(props) {
    const { name, label, control, disabled, formState, size = 'medium', margin = 'dense' } = props;
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label={label}
                            disableFuture
                            value={value === '' ? null : value}
                            onChange={onChange}
                            renderInput={(params) => (
                                <TextField
                                    error={hasError}
                                    helperText={hasError ? messageError : null}
                                    id="dateOfBirth"
                                    fullWidth
                                    color="primary"
                                    autoComplete="bday"
                                    size={size}
                                    margin={margin}
                                    {...params}
                                />
                            )}
                        />
                    </LocalizationProvider>
                )}
            />
        </div>
    );
}

export default DatePickerField;

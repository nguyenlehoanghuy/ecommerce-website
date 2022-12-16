import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { makeStyles } from '@mui/styles';

InvoiceSearchField.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    formState: PropTypes.object.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

const useStyles = makeStyles({
    field: {
        backgroundColor: '#EAEAEA',
        '& .MuiInputBase-root': {
            borderRadius: 0,
        },
    },
    input: {
        border: 0,
        resize: 'both',
    },
});

function InvoiceSearchField(props) {
    const classes = useStyles();
    const { name, label, control, disabled, formState } = props;
    const { errors } = formState;

    const hasError = !!errors[name];
    const messageError = errors[name]?.message;

    return (
        <Box sx={{ flex: 1 }}>
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
                        onChange={(e) => {
                            onChange(e);
                        }}
                        onBlur={onBlur}
                        value={value}
                        name={name}
                        label={label}
                        inputRef={ref}
                        error={hasError}
                        helperText={messageError}
                        margin={'none'}
                        size="small"
                        className={classes.field}
                        variant="outlined"
                        autoComplete="off"
                        color="secondary"
                        fullWidth
                        InputProps={{
                            classes: { notchedOutline: classes.input },
                        }}
                    />
                )}
            />
        </Box>
    );
}

export default InvoiceSearchField;

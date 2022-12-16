import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormLabel } from '@mui/material';

GenderRadio.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    formState: PropTypes.object.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function GenderRadio(props) {
    const { name, label, control, disabled, formState } = props;
    const { errors } = formState;

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
                    <>
                        <FormLabel error>{messageError}</FormLabel>
                        <RadioGroup
                            row
                            name={name} // send down the input name
                            label={label}
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            onChange={onChange}
                            onBlur={onBlur}
                            margin={'normal'}
                        >
                            <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                            <FormControlLabel value="Nu" control={<Radio />} label="Nu" />
                        </RadioGroup>
                    </>
                )}
            />
        </div>
    );
}

export default GenderRadio;

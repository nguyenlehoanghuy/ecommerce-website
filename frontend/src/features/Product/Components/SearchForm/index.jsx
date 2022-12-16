import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import SearchField from 'Components/FormControl/SearchField';
import { useState } from 'react';

SearchForm.propTypes = {
    onSubmit: PropTypes.func,
};
const useStyles = makeStyles({
    form: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '48px',
    },
    submit: {
        backgroundColor: '#1A1A1A',
        borderRadius: '0%',
        height: '100%',
    },
    searchIcon: {
        color: 'white',
    },
});

function SearchForm(props) {
    const { onSubmit } = props;
    const classes = useStyles();
    const [label, setLabel] = useState('Tìm tên sản phẩm mong muốn');
    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            product_name: '',
        },
    });
    return (
        <div>
            <form
                onSubmit={() => {
                    handleSubmit(onSubmit);
                    setLabel('Tìm tên sản phẩm mong muốn');
                }}
                className={classes.form}
            >
                <SearchField
                    name="product_name"
                    label={label}
                    control={control}
                    formState={formState}
                    className={classes.input}
                />
                <IconButton type="submit" variant="contained" className={classes.submit}>
                    <SearchIcon className={classes.searchIcon} />
                </IconButton>
            </form>
        </div>
    );
}

export default SearchForm;

import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import InvoiceSearchField from '../InvoiceSearchField';

InvoiceSearchForm.propTypes = {
    onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '48px',
        position: 'relative',
    },
    submit: {
        backgroundColor: '#1A1A1A',
        borderRadius: '0%',
        borderTopRightRadius: '20%',
        height: '100%',
    },
    searchIcon: {
        color: '#BBBBBB',
        position: 'absolute',
        right: '10px',
        [theme.breakpoints.down('400')]: {
            display: 'none',
        },
    },
}));

function InvoiceSearchForm(props) {
    const { onSubmit } = props;
    const classes = useStyles();
    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            invoice_id: '',
        },
    });

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <InvoiceSearchField
                    name="invoice_id"
                    label="Tìm kiếm theo mã hoá đơn mong muốn"
                    control={control}
                    formState={formState}
                    className={classes.input}
                />
                <SearchIcon className={classes.searchIcon} />
            </form>
        </div>
    );
}

export default InvoiceSearchForm;

import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import ProductListSearch from 'features/Product/Components/ProductListSearch';
import { Tooltip } from 'react-tippy';
import productAPI from 'api/productAPI';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

SearchField.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    formState: PropTypes.object.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

const useStyles = makeStyles({
    field: {
        width: '500px',
        backgroundColor: 'white',
        borderTopLeftRadius: '5px',
        borderBottomLeftRadius: '5px',
        '& .MuiInputBase-root': {
            borderRadius: 0,
        },
    },
    input: {
        '&:before': {
            border: 0,
        },
    },
});

function SearchField(props) {
    const classes = useStyles();
    const { name, label, control, disabled, formState } = props;
    const { errors } = formState;

    const hasError = !!errors[name];
    const messageError = errors[name]?.message;

    const [inputValue, setInputValue] = useState('');

    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const [productList, setProductList] = useState([]);

    const handleSearchChange = async (e) => {
        const searchInput = e.target.value;
        setInputValue(searchInput);
    };

    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (inputValue.length >= 2) {
                    const { data } = await productAPI.getAll({ name: inputValue });
                    if (data.length > 0) {
                        setProductList(data);
                        show();
                    } else hide();
                } else hide();
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch Category: ', error);
        }
    }, [inputValue]);

    const navigate = useNavigate();

    const handleClickProduct = (productId) => {
        navigate(`/product/${productId}`);
        hide();
        setInputValue('');
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
                    <Tooltip
                        html={<ProductListSearch data={productList} onClick={handleClickProduct} />}
                        open={visible}
                        theme="light"
                        offset="0, 27"
                        interactive="true"
                        onRequestClose={hide}
                    >
                        <TextField
                            onChange={(e) => {
                                onChange(e);
                                handleSearchChange(e);
                            }}
                            onBlur={onBlur}
                            value={inputValue}
                            name={name}
                            label={label}
                            inputRef={ref}
                            error={hasError}
                            helperText={messageError}
                            margin={'none'}
                            size="small"
                            className={classes.field}
                            variant="filled"
                            autoComplete="off"
                            color="secondary"
                            // InputProps={{
                            //     className: classes.input,
                            // }}
                        />
                    </Tooltip>
                )}
            />
        </div>
    );
}

export default SearchField;

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Container, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import userAPI from 'api/userAPI';
import { useEffect } from 'react';
import InvoiceList from 'features/Invoice/Components/InvoiceList';
import adminAPI from 'api/adminAPI';
import InvoiceListAdmin from 'features/Invoice/Components/InvoiceListAdmin';

AdminInvoice.propTypes = {
    closeDialog: PropTypes.func,
};

const useStyles = makeStyles({
    root: {
        marginTop: '20px',
    },
    tabLabel: {
        fontSize: '16px',
    },
});

function AdminInvoice(props) {
    const classes = useStyles();

    const [value, setValue] = useState('new');
    const [invoiceList, setInvoiceList] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        try {
            const fetchCategory = async () => {
                let list;
                if (value === 'new') list = await userAPI.getInvoiceNew();
                else if (value === 'accept') list = await userAPI.getInvoiceAccept();
                else if (value === 'cancel') list = await userAPI.getInvoiceCancel();
                setInvoiceList(list.data);
            };
            fetchCategory();
        } catch (error) {
            console.log('Failed to fetch Category: ', error);
        }
    }, [value]);

    const onChangeInvoice = async () => {
        try {
            const fetchCategory = async () => {
                const list = await userAPI.getInvoiceNew();
                setInvoiceList(list.data);
            };
            fetchCategory();
        } catch (error) {
            console.log('Failed to fetch Category: ', error);
        }
    };

    return (
        <Box className={classes.root}>
            <Container sx={{ maxWidth: '1250px' }} maxWidth={false}>
                <Grid container>
                    <Grid className={classes.left} xs={12} sm={12} md={12} lg={12}>
                        <Paper elevation={0} className={classes.rootPromotion}>
                            <Box sx={{ width: '100%' }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    textColor="secondary"
                                    indicatorColor="secondary"
                                    aria-label="secondary tabs example"
                                    variant="fullWidth"
                                    sx={{
                                        '& .MuiTabs-flexContainer': {
                                            flexWrap: 'wrap',
                                        },
                                    }}
                                >
                                    <Tab
                                        value="new"
                                        label={
                                            <span className={classes.tabLabel}>Chờ xác nhận</span>
                                        }
                                    />
                                    <Tab
                                        value="accept"
                                        label={
                                            <span className={classes.tabLabel}>Đã xác nhận</span>
                                        }
                                    />
                                    <Tab
                                        value="cancel"
                                        label={<span className={classes.tabLabel}>Bị huỷ</span>}
                                    />
                                </Tabs>
                            </Box>
                        </Paper>
                        {/* <Box>
                            <InvoiceSearch />
                        </Box> */}
                        <Paper elevation={0} className={classes.rootPromotion}>
                            <InvoiceListAdmin
                                data={invoiceList}
                                onChangeInvoice={onChangeInvoice}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default AdminInvoice;

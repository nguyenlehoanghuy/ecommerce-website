import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Container, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InvoiceSearch from '../Components/InvoiceSearch';
import InvoiceList from '../Components/InvoiceList';
import userAPI from 'api/userAPI';
import { useEffect } from 'react';

InvoiceFeature.propTypes = {
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

function InvoiceFeature(props) {
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
                if (value === 'new') list = await userAPI.getUserInvoiceNew();
                else if (value === 'accept') list = await userAPI.getUserInvoiceAccept();
                else if (value === 'cancel') list = await userAPI.getUserInvoiceCancel();
                setInvoiceList(list.data);
            };
            fetchCategory();
        } catch (error) {
            console.log('Failed to fetch Category: ', error);
        }
    }, [value]);
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
                            <InvoiceList data={invoiceList} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default InvoiceFeature;

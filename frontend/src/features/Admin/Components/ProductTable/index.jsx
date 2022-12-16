import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
// import Alert from '@mui/material/Alert';
import productAPI from 'api/productAPI';
import { Box } from '@mui/material';
import UploadImage from '../UploadImage';
import Grid from '@mui/material/Unstable_Grid2';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

// const api = axios.create({
//     baseURL: `https://reqres.in/api`,
// });

function validateEmail(email) {
    // const re =
    //     /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    // return re.test(String(email).toLowerCase());
}

function ProductTable() {
    var columns = [
        { title: 'id', field: 'product_id', hidden: true },
        {
            title: 'Avatar',
            cellStyle: {
                width: '10%',
            },
            render: (rowData) => (
                <Box sx={{ height: '50px', width: '50px' }}>
                    <img
                        src={rowData.product_url}
                        alt={rowData.product_name}
                        width="100%"
                        style={{ objectFit: 'contain' }}
                    ></img>
                </Box>
            ),
            field: 'product_url',
        },
        {
            title: 'Product name',
            field: 'product_name',
            cellStyle: {
                width: '40%',
            },
        },
        {
            title: 'Price',
            field: 'product_price',
            cellStyle: {
                width: '10%',
            },
        },
        {
            title: 'Category',
            field: 'category_id',
            cellStyle: {
                width: '20%',
            },
        },
        {
            title: 'Promotion',
            field: 'promotion_id',
            cellStyle: {
                width: '20%',
            },
        },
    ];
    const [data, setData] = useState([]); //table data

    //for error handling
    // const [iserror, setIserror] = useState(false);
    // const [errorMessages, setErrorMessages] = useState([]);

    // useEffect(() => {
    //     api.get('/users')
    //         .then((res) => {
    //             setData(res.data.data);
    //         })
    //         .catch((error) => {
    //             console.log('Error');
    //         });
    // }, []);

    useEffect(() => {
        const fectProduct = async () => {
            try {
                const { data } = await productAPI.getAll({ isLimit: false });
                setData(data);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        };
        fectProduct();
    }, []);

    const getProduct = async () => {
        try {
            const { data } = await productAPI.getAll({ isLimit: false });
            setData(data);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    };

    const handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        let errorList = [];
        if (newData.product_id === '') {
            errorList.push('Please enter product id');
        }
        if (newData.product_url === '') {
            errorList.push('Please enter url');
        }
        if (newData.product_name === '') {
            errorList.push('Please enter name');
        }
        if (newData.product_price === '') {
            errorList.push('Please enter price');
        }
        if (newData.category_id === '') {
            errorList.push('Please enter category id');
        }
        if (newData.promotion_id === '') {
            errorList.push('Please enter promotion id');
        }

        if (errorList.length < 1) {
            const updateProduct = async () => {
                try {
                    const { data } = await productAPI.update(oldData.product_id, newData);
                    getProduct();
                } catch (error) {
                    console.log('Failed to update product list: ', error);
                }
            };
            updateProduct();
            resolve();
        } else {
            // thong bao that bai
            console.log('loi');
            resolve();
        }
        // if (errorList.length < 1) {
        //     api.patch('/users/' + newData.id, newData)
        //         .then((res) => {
        //             const dataUpdate = [...data];
        //             const index = oldData.tableData.id;
        //             dataUpdate[index] = newData;
        //             setData([...dataUpdate]);
        //             resolve();
        //             setIserror(false);
        //             setErrorMessages([]);
        //         })
        //         .catch((error) => {
        //             setErrorMessages(['Update failed! Server error']);
        //             setIserror(true);
        //             resolve();
        //         });
        // } else {
        //     setErrorMessages(errorList);
        //     setIserror(true);
        //     resolve();
        // }
    };

    const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = [];
        if (newData.product_id === '') {
            errorList.push('Please enter product id');
        }
        if (newData.product_url === '') {
            errorList.push('Please enter url');
        }
        if (newData.product_name === '') {
            errorList.push('Please enter name');
        }
        if (newData.product_price === '') {
            errorList.push('Please enter price');
        }
        if (newData.category_id === '') {
            errorList.push('Please enter category id');
        }
        if (newData.promotion_id === '') {
            errorList.push('Please enter promotion id');
        }

        if (errorList.length < 1) {
            const addProduct = async () => {
                try {
                    const { data } = await productAPI.add(newData);
                    getProduct();
                } catch (error) {
                    console.log('Failed to update product list: ', error);
                }
            };
            addProduct();
            resolve();
        } else {
            // thong bao that bai
            console.log('loi');
            resolve();
        }
    };

    const handleRowDelete = (oldData, resolve) => {
        const deleteProduct = async () => {
            try {
                const { data } = await productAPI.delete(oldData.product_id);
                getProduct();
            } catch (error) {
                console.log('Failed to update product list: ', error);
            }
        };
        deleteProduct();
        resolve();
        // api.delete('/users/' + oldData.id)
        //     .then((res) => {
        //         const dataDelete = [...data];
        //         const index = oldData.tableData.id;
        //         dataDelete.splice(index, 1);
        //         setData([...dataDelete]);
        //         resolve();
        //     })
        //     .catch((error) => {
        //         setErrorMessages(['Delete failed! Server error']);
        //         setIserror(true);
        //         resolve();
        //     });
    };

    return (
        <Box>
            <Grid container>
                <Grid xs={12} sm={12} md={12} lg={12}>
                    {/* <div>
                        {iserror && (
                            <Alert severity="error">
                                {errorMessages.map((msg, i) => {
                                    return <div key={i}>{msg}</div>;
                                })}
                            </Alert>
                        )}
                    </div> */}
                    <UploadImage />
                    <MaterialTable
                        title="Dữ liệu các sản phẩm có trong hệ thống"
                        columns={columns}
                        data={data}
                        icons={tableIcons}
                        options={{
                            rowStyle: {
                                overflowWrap: 'break-word',
                            },
                            tableLayout: 'auto',
                        }}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    handleRowUpdate(newData, oldData, resolve);
                                }),
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    handleRowAdd(newData, resolve);
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    handleRowDelete(oldData, resolve);
                                }),
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProductTable;

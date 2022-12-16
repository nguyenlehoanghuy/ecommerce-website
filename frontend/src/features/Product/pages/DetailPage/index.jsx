import React from 'react';
import { Box, Container } from '@mui/system';
import { Breadcrumbs, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import useProductDetail from 'features/Product/hooks/useProductDetail';
import Grid from '@mui/material/Unstable_Grid2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import AddCartItemForm from 'features/Product/pages/DetailPage/Components/AddCartItemForm';
import NotFound from 'Components/NotFound';
import TabPanel from 'Components/TabPanel';
import { useEffect } from 'react';
import { useState } from 'react';
import categoryAPI from 'api/categoryAPI';
import { useMemo } from 'react';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import GppGoodIcon from '@mui/icons-material/GppGood';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SettingsIcon from '@mui/icons-material/Settings';
import ComputerIcon from '@mui/icons-material/Computer';
import { numberToVND } from 'constants/common';
const ListImage = [
    {
        id: 0,
        alt: 'anh1',
        url_Img:
            'https://salt.tikicdn.com/cache/750x750/ts/product/af/be/de/f941be7b685f23ffa0870f3eeca139f6.png.webp',
    },
    {
        id: 1,
        alt: 'anh2',
        url_Img:
            'https://lh3.googleusercontent.com/RAC9X_B8NmKCcTIOPbZcPVSno85kAqwIf5Xdk-9rCmlT-lijLSJNvk5eH0rN0jwWxZ4V445hDKFea0DqWXfjjo9ydaQPocQ=w500-rw',
    },
    {
        id: 2,
        alt: 'anh3',
        url_Img:
            'https://lh3.googleusercontent.com/_szl5eQtmhgxl5VUFSxT_ymjOyNXwf-sfsPydd2VRMVwVJhcEwAPsZ2hobuXatsRKxYu4wOqRSs94yxmNYj0YYOSVFQiRzY7=w500-rw',
    },
    {
        id: 3,
        alt: 'anh4',
        url_Img:
            'https://lh3.googleusercontent.com/Zr2k5HwHb1LL4krdGiQqrm5B30wKI27WMbWtg1RN0NVOgsomB4LVI4tRXgMXKZqwy8anFBwe1Ql9PANSoGylCwXja0xXc0ry=w500-rw',
    },
    {
        id: 4,
        alt: 'anh5',
        url_Img:
            'https://lh3.googleusercontent.com/uWrdxQddEDcPwcQBh5oXv14SdVKqKUn04iJu4WMkhDnHMbARY6BtTFWfCTLZXw7LYtDj0OvtOrDFajPAmXZ2S6yYOLNvP2I=w500-rw',
    },
    {
        id: 5,
        alt: 'anh6',
        url_Img:
            'https://lh3.googleusercontent.com/oEmEV__xwZ7FJlqdlnMsNiU6B4ZsgtBRxagWIR1t3BprxjQzmxTJetFqRGt4uf-H2RsA-8dPm_PWGnD_j-sKcI8C9g2_3V8L=w1000-rw',
    },
];
const ChinhSach = [
    {
        id: 1,
        name: 'Cam kết hàng chính hãng 100%',
        path: <GppGoodIcon />,
    },
    {
        id: 2,
        name: 'Đổi trả trong vòng 10 ngày',
        path: <AutorenewIcon />,
    },
    {
        id: 3,
        name: 'Sửa chữa đồng giá 150.000đ.',
        path: <SettingsIcon />,
    },
    {
        id: 4,
        name: 'Vệ sinh máy tính, laptop.',
        path: <ComputerIcon />,
    },
    {
        id: 5,
        name: 'Bảo hành tại nhà.',
        path: <GppGoodIcon />,
    },
];
const useStyles = makeStyles((theme) => ({
    root: (cssValue) => ({
        backgroundColor: cssValue.backgroundColor,
    }),
    left: {
        padding: '24px 24px 0px 24px',
    },
    center: {
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    right: {
        padding: '24px',
        marginLeft: '16px',
        backgroundColor: 'white',
    },
    rightbelow: {
        paddingRight: '24px',
        paddingLeft: '24px',
        paddingTop: '10px',
        marginLeft: '16px',
        backgroundColor: 'white',
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        backgroundColor: '#333333d1',
        color: 'white',
        padding: '32px 25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    checkCircleIcon: {
        color: '#FEBD17',
        fontSize: '62px',
    },

    images: {
        backgroundColor: 'white',
    },

    tab: {
        minWidth: 0,
        padding: '0px 5px',
        '& > div': {
            width: '70px',
            height: '70px',
        },
    },
}));

function DetailPage(props) {
    const cssValue = {
        // backgroundColor: 'green',
        // color: 'white',
    };
    // if lightmode cssValue =... else cssValue =...
    const classes = useStyles(cssValue);
    const { productId } = useParams();
    const { product, loading } = useProductDetail(productId);
    const hasProduct = !!product.product_id;
    const [categoryList, setCategoryList] = useState([]);
    ListImage.forEach((x) => (x.url_Img = product.product_url));
    useEffect(() => {
        try {
            const fetchCategory = async () => {
                const list = await categoryAPI.getAll();
                setCategoryList(list.data);
            };
            fetchCategory();
        } catch (error) {
            console.log('Failed to fetch Category: ', error);
        }
    }, []);

    const category = useMemo(
        () => categoryList.find((x) => x.category_id === product.category_id),
        [categoryList, product.category_id]
    );

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [checked, setChecked] = React.useState(true);

    const handleChangeCheck = (event) => {
        setChecked(event.target.checked);
    };
    const [value, setValue] = React.useState(0);

    if (loading) return <Box>Loading when fetch product...... (update)</Box>;
    if (!hasProduct) return <NotFound />;
    return (
        <Box className={classes.root}>
            <Container sx={{ maxWidth: '1250px' }} maxWidth={false}>
                <Grid container>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <NavLink to="/">Trang chủ </NavLink>
                            <NavLink to={`/product?category_id=${product.category_id}`}>
                                {category?.category_name}
                            </NavLink>
                            <Typography color="text.primary">{product.product_name}</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid container md={9}>
                        <Grid xs={12} sm={12} md={5} lg={6} sx={{ backgroundColor: 'white' }}>
                            <Paper elevation={0} className={classes.left}>
                                {/* <ProductThumbnail product={product} /> */}
                                {ListImage.map((image) => (
                                    <TabPanel value={value} index={image.id} key={image.id}>
                                        <Box sx={{ height: '400px' }}>
                                            <img
                                                className={classes.img}
                                                alt={image.alt}
                                                src={image.url_Img}
                                                height="100%"
                                                width="100%"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </Box>
                                    </TabPanel>
                                ))}
                            </Paper>

                            <Tabs
                                className={classes.images}
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                            >
                                {ListImage.map((image) => (
                                    <Tab
                                        className={classes.tab}
                                        key={image.id}
                                        icon={<Avatar alt={image.alt} src={image.url_Img} />}
                                        // onMouseEnter={(e) => setValue(e)}
                                        // onMouseLeave={(e) => setValue(e)}
                                    />
                                ))}
                            </Tabs>
                        </Grid>
                        <Grid xs={12} sm={12} md={7} lg={6} sx={{ backgroundColor: 'white' }}>
                            <Paper elevation={0} className={classes.center}>
                                <Typography variant="h5" sx={{ fontWeight: '500' }}>
                                    {product.product_name}{' '}
                                </Typography>
                                <Typography
                                    variant="button"
                                    sx={{ color: '#82869E', fontWeight: '400' }}
                                    gutterBottom
                                >
                                    Thương hiệu
                                    <span style={{ color: 'rgb(20, 53, 195)' }}> APPLE</span>
                                </Typography>
                                <Typography
                                    variant="overline"
                                    sx={{ color: '#82869E', fontWeight: '500' }}
                                    gutterBottom
                                >
                                    MÀU SẮC:...
                                </Typography>
                                <Typography
                                    variant="overline"
                                    sx={{ color: '#82869E', fontWeight: '500' }}
                                    gutterBottom
                                >
                                    DUNG LƯỢNG (ROM):...
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{ color: 'rgb(20, 53, 195)', fontWeight: '700' }}
                                    gutterBottom
                                >
                                    {numberToVND(product.product_price)}
                                </Typography>
                                <AddCartItemForm productId={productId} />
                            </Paper>
                            <Grid className={classes.center}>
                                <Typography variant="h6" sx={{ fontWeight: '500' }}>
                                    Chọn 1 khuyến mãi trong danh sách
                                </Typography>
                                <Grid
                                    container
                                    spacing={2}
                                    columns={16}
                                    marginTop="10px"
                                    sx={{ border: 1 }}
                                >
                                    <Tab xs={4} md={4} icon={<CardGiftcardRoundedIcon />}></Tab>
                                    <Grid xs={11} md={11}>
                                        Giảm 6.660.000đ / Chiếc Khi mua từ 1 Chiếc trở lên HSD:
                                        31/10/2022
                                    </Grid>
                                    <Grid xs={1} md={1}>
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleChangeCheck}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid md={3}>
                        <Paper elevation={0} className={classes.right}>
                            <p>CHÍNH SÁCH BÁN HÀNG</p>
                        </Paper>
                        {ChinhSach.map((chinhsach) => (
                            <Grid
                                key={chinhsach.id}
                                container
                                columns={16}
                                className={classes.rightbelow}
                            >
                                <Grid md={2}>{chinhsach.path}</Grid>
                                <Grid md={14}>
                                    <Paper elevation={0}>
                                        <p>{chinhsach.name}</p>
                                    </Paper>
                                </Grid>
                            </Grid>
                        ))}
                        <Paper className={classes.right}>
                            <a href="https://www.youtube.com/watch?v=1GFWuzYrOYI">Xem chi tiết</a>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* <NavLink to="sub1">LinkA </NavLink>
            <NavLink to="sub2">LinkB</NavLink> */}
            <Outlet />
        </Box>
    );
}

export default DetailPage;

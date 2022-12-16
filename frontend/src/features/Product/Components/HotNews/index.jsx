import React from 'react';
import { Slide } from 'react-slideshow-image';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

HotNews.propTypes = {};

const useStyles = makeStyles({
    root: {
        paddingTop: '10px',
        marginTop: '50px',
        marginBottom: '10px',
        color: '#db1d24',
    },
    title: {
        fontFamily: 'semibold',
        display: 'flex',
        fontSize: '20px',
        color: 'red',
        fontWeight: 'bold',
    },
    text: {
        color: 'red',
        marginTop: '4px',
    },
});
const buttonStyle = {
    width: '20px',
    background: 'none',
    border: '1px',
};
const properties = {
    prevArrow: (
        <button style={{ ...buttonStyle, marginLeft: '820px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#000000">
                <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
            </svg>
        </button>
    ),
    nextArrow: (
        <button style={{ ...buttonStyle, marginRight: '50px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#000000">
                <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
            </svg>
        </button>
    ),
};

function HotNews(props) {
    const classes = useStyles();

    return (
        <Box sx={{ flexGrow: 1 }} className={classes.root}>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={2}>
                    <div className={classes.title}>
                        <img src="https://didongthongminh.vn/images/hot_new.svg" alt="tinhieu" />
                        <p>TIN HOT:</p>
                    </div>
                </Grid>
                <Grid item xs={14}>
                    <Slide {...properties}>
                        <a href="https://didongthongminh.vn/tuyen-dung-nhan-vien-ban-hang-thu-nhap-hap-dan-6-12-tr-di-dong-thong-minh">
                            <p className={classes.text}>
                                Khởi Nghiệp Công Việc Chuyên Viên Tư Vấn Bán Hàng Di Động Thông Minh
                            </p>
                        </a>
                        <a href="https://didongthongminh.vn/danh-gia-camera-iphone-13-pro-max-tot-nhung-van-con-nhieu-1">
                            <p className={classes.text}>
                                iPhone 13 Pro Max: Đánh giá siêu chi tiết camera
                            </p>
                        </a>
                    </Slide>
                </Grid>
            </Grid>
        </Box>
    );
}

export default HotNews;

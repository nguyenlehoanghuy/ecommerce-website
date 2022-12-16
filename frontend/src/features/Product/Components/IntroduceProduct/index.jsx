import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from '@mui/styles';
import TabPanel from 'Components/TabPanel';

const introduceVideo = [
    {
        id: 1,
        url_img:
            'https://lh3.googleusercontent.com/emiOAdOg2qxqYHNwvT-vOzJ50jd7xgMiiecXah9OJO68MsikovAbM11zALX8xqfR_mGQ0a-OP71xfRqnZloC-dIlNuGt97lp=w308-rw',
        url_video: 'https://www.youtube.com/watch?v=LbTMBHXpZ-4&feature=youtu.be',
    },
    {
        id: 2,
        url_img:
            'https://lh3.googleusercontent.com/WRPx5IU-zXfCOAxiuZ5kXLkgdbM6m3LgY8OQCQ5WXMpk67RcazMiseg92f4r1EgKe1NJkVkhhBP2ZqmzuiJuHugNNAL4rmip=w308-rw',
        url_video: 'https://www.youtube.com/watch?v=B3s9_HGD_9c&feature=youtu.be',
    },
    {
        id: 3,
        url_img:
            'https://lh3.googleusercontent.com/YMqsAP13m7Ko4XMQSuhkuf6SI3f1suAH3tCmGQM_fktJs4LC1PTWa-VPbB0eeugqu8MlTYTzhq5y-PE_lPuFXlP2cFzZ6Oc=w308-rw',
        url_video: 'youtube.com/watch?v=hvKgfG9fOL8&feature=youtu.be',
    },
    {
        id: 4,
        url_img:
            'https://lh3.googleusercontent.com/RUah6nLmEFFnGMxhxfaG5Rf4HofTU6NBToJKSX-YvsyURIZt13Hys-4-ckC1RpafU4IX12vjC2I9qx8stii5E5DxY448r2jHZw=w308-rw',
        url_video: 'https://www.youtube.com/watch?v=DtrdB8jf0d0&feature=youtu.be',
    },
];

const url = 'https://didongthongminh.vn/images/video/resized/1-1_1663333793.jpg';

const useStyles = makeStyles({
    root: {
        paddingTop: '10px',
        height: '350px',
    },

    box: {
        height: 170,
        width: 170,
        backgroundImage: `url('${url}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    img: { width: '100%' },
    label: {
        fontSize: '14px',
    },
    tabs: {
        marginTop: '8px',
    },
});
export default function IntroduceProduct() {
    const classes = useStyles();
    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ flexGrow: 1 }} className={classes.root}>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={11}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabPanel value={value} index={0}>
                                <a href="https://didongthongminh.vn/dtime">
                                    <img
                                        className={classes.img}
                                        src="https://lh3.googleusercontent.com/YhZudHDQJp7_NPPmxmk0VQXLg2fNrPKuj7c3nm2EfxbqvnBAoouf3oUng2AGD2-p59RxobXMEqcoGMqWr9KFNmfdB6Cz9E3MsQ=w1920-rw"
                                        alt="anh1"
                                    />
                                </a>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <a href="https://didongthongminh.vn/samsung-galaxy-z-fold4-12gb256gb-chinh-hang">
                                    <img
                                        className={classes.img}
                                        src="https://lh3.googleusercontent.com/CEuRzZgHC30aXTU-1ebKndEUlc1ByOsWQV66D9KnlYWbs1MNXxv_SpkgH6kXJ0Co8p3QArOKI9f8LJj9QKyas2eJl5eazKVm=w1920-rw"
                                        alt="anh2"
                                    />
                                </a>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <a href="https://didongthongminh.vn/iphone-14-series">
                                    <img
                                        className={classes.img}
                                        src="https://didongthongminh.vn/images/slideshow/2022/10/03/slideshow_large/laptop-doanh-nhân-4_1664761080.jpg"
                                        alt="anh3"
                                    />
                                </a>
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <a href="https://didongthongminh.vn/iphone-11-64gb-chinh-hang-vna">
                                    <img
                                        className={classes.img}
                                        src="https://didongthongminh.vn/images/slideshow/2022/10/03/slideshow_large/laptop-doanh-nhân-4_1664761080.jpg"
                                        alt="anh4"
                                    />
                                </a>
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                <a href="https://didongthongminh.vn/laptop-lg-gram-2021-16zd90p-gax54a5-16-inch">
                                    <img
                                        className={classes.img}
                                        src="https://lh3.googleusercontent.com/CEuRzZgHC30aXTU-1ebKndEUlc1ByOsWQV66D9KnlYWbs1MNXxv_SpkgH6kXJ0Co8p3QArOKI9f8LJj9QKyas2eJl5eazKVm=w1920-rw"
                                        alt="anh5"
                                    />
                                </a>
                            </TabPanel>
                        </Box>

                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="wrapped label tabs example"
                            centered
                            variant="fullWidth"
                            className={classes.tabs}
                        >
                            {/* Chỉ nên đặt tối đa 7 ký tự trở lại trong tab để hiển thị đẹp nhất */}
                            <Tab
                                className={classes.label}
                                label="Smartwatch giá rẻ Giá từ 1 triệu"
                            />
                            <Tab
                                className={classes.label}
                                label="Mua ngay Galaxy Z Fold4 | Flip4"
                            />
                            <Tab className={classes.label} label="Đăng kí đặt iPhone 14 Series " />
                            <Tab className={classes.label} label="iPhone 11 Sập giá" />
                            <Tab className={classes.label} label="Xả kho LG Gram 16 " />
                        </Tabs>
                    </Box>
                </Grid>

                <Grid item xs={5}>
                    <Grid container spacing={2} columns={16}>
                        {introduceVideo.map((video) => (
                            <Grid key={video.id} item xs={8} md={8}>
                                <a href={video.url_video}>
                                    <Paper
                                        style={{
                                            backgroundImage: `url('${video.url_img}')`,
                                        }}
                                        className={classes.box}
                                    />
                                </a>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

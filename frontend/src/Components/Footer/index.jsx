import { Box, Container } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Unstable_Grid2';

const useStyles = makeStyles({
    footer: {
        paddingTop: '20px',
        fontSize: '14px',
        marginTop: '10px',
    },
    add: {
        color: 'red',
        backgroundColor: 'yellow',
    },
    footerul: {
        padding: '0',
        margin: '10px 0',
        listStyle: 'none outside none',
    },

    footerli: {
        lineHeight: '30px',
    },
    container: {
        padding: '10px',
        margin: '0 20px',
        lineHeight: '17px',
    },
    imgspt: {
        display: 'block',
        width: '30px',
        height: '30px',
        paddingRight: '5px',
    },
    // hottrott: {
    //     alignItems: 'center',
    // },
    pttt: {
        display: 'grid',
        gridTemplateColumns: '54px 54px 54px 54px',
        gridGap: '10px',
        //       textAlign: 'center',
        fontSize: '13px',
        // display: 'inline-flex',
    },
    ytb: {
        margin: 'left',
        padding: '5px 5px',
    },
    copyright: {
        padding: '15px',
        lineHeight: '20px',
        color: '#444',
        backgroundColor: '#eee',
        textAlign: 'center',
    },
});

function Footer(props) {
    const classes = useStyles();

    return (
        <Container sx={{ maxWidth: '1250px' }} maxWidth={false}>
            <Box className={classes.footer}>
                <div className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid xs={12} sm={6} md={3}>
                            <div className={classes.footertitle}>
                                <h3 className={classes.title}>Thông tin và Chính sách</h3>
                                <ul className={classes.footerul}>
                                    <li className={classes.footerli}>
                                        <a href="/">Giới thiệu công ty</a>
                                    </li>
                                    <li className={classes.footerli}>
                                        <a href="/">Hệ thống cửa hàng</a>
                                    </li>
                                    <li className={classes.footerli}>
                                        <a href="/">Chính sách bảo mật</a>
                                    </li>
                                    <li className={classes.footerli}>
                                        support@mobilesmilephone.com
                                    </li>
                                </ul>
                            </div>
                        </Grid>

                        <Grid xs={12} sm={6} md={3}>
                            <div className={classes.footertitle}>
                                <h3 className={classes.title}>Liên hệ và Thanh toán</h3>
                                <ul className={classes.footerul}>
                                    <li className={classes.footerli}>
                                        <p>Địa chỉ: Quận Ninh Kiều, TP Cần Thơ</p>
                                    </li>
                                    <li className={classes.footerli}>
                                        <p>Mua hàng: 0912345678 </p>
                                    </li>
                                    <li className={classes.footerli}>
                                        <p>Hỗ trợ kỹ thuật: 0987654321 </p>
                                    </li>
                                    <li className={classes.footerli}>
                                        <p>Hợp tác Kinh doanh: 0123987465</p>
                                    </li>
                                </ul>
                            </div>
                        </Grid>

                        <Grid xs={12} sm={6} md={3}>
                            <div className={classes.hotrott}>
                                <h3>Hỗ trợ thanh toán</h3>
                                <div className={classes.pttt}>
                                    <div className={classes.htttctn}>
                                        <img
                                            src="https://shopfront-cdn.tekoapis.com/static/7534c48e46ec507e.svg"
                                            alt="qrcode"
                                            className={classes.imgspt}
                                        />
                                        QR Code
                                    </div>
                                    <div>
                                        <img
                                            src="	https://shopfront-cdn.tekoapis.com/static/0e924ede5a93187b.svg"
                                            alt="money"
                                            className={classes.imgspt}
                                        />
                                        Tiền mặt
                                    </div>
                                    <div>
                                        <img
                                            src="	https://shopfront-cdn.tekoapis.com/static/b2c29b7046b45840.svg"
                                            alt="banking"
                                            className={classes.imgspt}
                                        />
                                        Trả góp
                                    </div>
                                    <div>
                                        <img
                                            src="https://shopfront-cdn.tekoapis.com/static/abf02ec95226fd05.svg"
                                            alt="trả góp"
                                            className={classes.imgspt}
                                        />
                                        Internet Banking
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid xs={12} sm={6} md={3}>
                            <div className={classes.footertitle}>
                                <h3 className={classes.title}>Kết nối với chúng tôi</h3>

                                <a href="/" className={classes.fb}>
                                    <img
                                        src="https://img.icons8.com/office/2x/facebook-new.png"
                                        width="38"
                                        height="33"
                                        alt="fcebook"
                                    />
                                </a>

                                <a href="/" className={classes.ytb}>
                                    <img
                                        src="https://img.icons8.com/office/2x/youtube-play.png"
                                        width="42"
                                        height="36"
                                        alt="facebook"
                                    />
                                </a>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.copyright}>
                    @ Copyright © 2022 SMILEPHONE _ Smile for your Phone
                </div>
            </Box>
        </Container>
    );
}

export default Footer;

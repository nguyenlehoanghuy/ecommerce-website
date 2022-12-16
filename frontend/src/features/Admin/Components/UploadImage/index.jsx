import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, IconButton, Snackbar, Typography } from '@mui/material';
import adminAPI from 'api/adminAPI';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles({
    root: {
        padding: 20,
    },
    wrapImg: {
        maxWidth: '200px',
        maxHeight: '200px',
    },
    wrapUpload: {
        display: 'flex',
        minHeight: '40px',
        borderRadius: '5px',
        backgroundColor: 'white',
        border: '1px solid #ced4da',
        alignItems: 'center',
        maxWidth: '500px',
    },
    btn: {
        padding: '8px 10px',
        backgroundColor: '#E9ECEF',
        BorderRadiusTopleft: '5px',
        BorderRadiusBottomleft: '5px',
        cursor: 'pointer',
        height: '100%',
    },
    wrapLink: {
        display: 'flex',
        minHeight: '40px',
        borderRadius: '5px',
        backgroundColor: '#292929',
        border: '1px solid #ced4da',
        alignItems: 'center',
        width: '500px',
        wordBreak: 'break-word',
        maxWidth: '100%',
        maxHeight: '100%',
        marginTop: '12px',
        position: 'relative',
    },
    copyIcon: {
        color: '#ced4da',
    },
    copyBtn: {
        color: '#ced4da',
        position: 'absolute',
        right: 0,
        top: 0,
        '&:hover': {
            backgroundColor: '#ced4da26',
            borderRadius: 0,
        },
    },
});

function UploadImage() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState('https://....');
    const [imageReviewSrc, setImageReviewSrc] = useState('');
    const [fileName, setFileName] = useState('No file chosen');
    const onFileChange = (event) => {
        const getFile = event.target.files[0];

        if (getFile) {
            setFileName(getFile.name);
            const url = URL.createObjectURL(getFile);
            setImageReviewSrc(url);
        } else {
            setImageReviewSrc('');
        }
        handleUpload(getFile);
    };

    const handleUpload = async (file) => {
        const formdata = new FormData();
        formdata.append('image', file);
        try {
            const uploadImage = async () => {
                const result = await adminAPI.upload(formdata);
                setImageSrc(result.data.link);
            };
            uploadImage();
            enqueueSnackbar('Upload image successfull', {
                variant: 'info',
                autoHideDuration: 800,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
        } catch (error) {
            console.log('Failed to upload image: ', error);
            enqueueSnackbar('Failed to upload image', { variant: 'error', autoHideDuration: 800 });
        }
    };

    const handleClickCopy = () => {
        setOpen(true);
        console.log(imageSrc);
        navigator.clipboard.writeText(imageSrc);
    };
    return (
        <Box className={classes.root}>
            <Typography variant="h6">Nhấn upload để tải lên hình ảnh của sản phẩm</Typography>
            <Box className={classes.wrapUpload}>
                <label
                    htmlFor="upload-photo"
                    onChange={onFileChange}
                    style={{ dispaly: 'flex', height: '100%' }}
                >
                    <input style={{ display: 'none' }} id="upload-photo" name="file" type="file" />
                    <Box variant="subtitle1" className={classes.btn}>
                        Choose File
                    </Box>
                </label>
                <Box>
                    <Typography variant="subtitle1" sx={{ ml: '8px', wordBreak: 'break-word' }}>
                        {fileName}
                    </Typography>
                </Box>
            </Box>
            <Box className={classes.wrapImg}>
                <img
                    src={imageReviewSrc}
                    alt={'review img'}
                    width="100%"
                    style={{ objectFit: 'contain', display: imageReviewSrc ? 'flex' : 'none' }}
                ></img>
            </Box>
            <Box className={classes.wrapLink}>
                <div style={{ color: 'white' }}>
                    <Typography variant="caption" sx={{ padding: '2px 8px' }}>
                        {imageSrc}
                    </Typography>
                    <IconButton
                        aria-label="copy"
                        size="small"
                        className={classes.copyBtn}
                        onClick={handleClickCopy}
                    >
                        <ContentCopyIcon fontSize="inherit" className={classes.copyIcon} />
                    </IconButton>
                    <Snackbar
                        open={open}
                        onClose={() => setOpen(false)}
                        autoHideDuration={800}
                        message="Copied to clipboard"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    />
                </div>
            </Box>
        </Box>
    );
}

export default UploadImage;

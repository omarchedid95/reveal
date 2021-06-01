import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography, Slide, IconButton } from '@material-ui/core';
import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {storage} from '../../firebase';
import './index.css';
import Loading from '../Loading';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ImageUploader extends Component {
    state = {
        picture: undefined,
        loading: false
    }
    handleImageDrop = (picture) => {
        const reader = new FileReader();
        let file = undefined;
        if (picture.target.files.length > 0) {
            file = picture.target.files[0];
        }
        if (file) {
            reader.onload = () => {
                if (reader.readyState === 2) {
                    this.setState({
                        picture: file
                    });
                }
            }
            reader.readAsDataURL(file);
        } else {
            this.setState({
                picture: undefined
            });
        }
    }
    deleteImage = () => {
        this.setState({
            picture: undefined
        })
    }
    uploadImage = () => {
        this.setState({
            loading: true
        });
        setTimeout(() => {
            storage.ref(`/pictures/1/picture1`).put(this.state.picture);
            this.setState({
                loading: false
            });
            this.props.toggleDialog();
        }, 1000);
    }
    render() {
        return (
            <Dialog
                open={this.props.open}
                fullWidth
                TransitionComponent={Transition}
                className='image-uploader-component-wrapper'
            >
                <DialogTitle disableTypography>
                    <Typography variant='h4' align='center'>
                        Upload a picture
                    </Typography>
                    <Divider />
                </DialogTitle>
                <DialogContent className='content'>
                    <div className='preview-wrapper'>
                        {
                            this.state.picture === undefined &&
                            <label htmlFor='image-uploader-input'>
                                <IconButton component='span'>
                                    <AddIcon className='default-image'/>
                                </IconButton>
                            </label> 
                        }
                        {
                            this.state.picture !== undefined &&
                            !this.state.loading &&
                            <div>
                                <img src={URL.createObjectURL(this.state.picture)} alt='uploaded-file' className='uploaded-image'/>
                                <IconButton className='delete-button' onClick={this.deleteImage}>
                                    <HighlightOffIcon />
                                </IconButton>
                            </div>
                        }
                        {
                            this.state.picture !== undefined &&
                            this.state.loading &&
                            <div>
                                <Loading />
                            </div>
                        }
                    </div>
                    <input
                        accept='.jpg, .png, .jpeg'
                        id='image-uploader-input'
                        type='file'
                        hidden
                        value={this.state.picture ? '' : null}
                        onChange={this.handleImageDrop}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.toggleDialog}>Cancel</Button>
                    <Button
                        disabled={this.state.picture === undefined || this.state.loading}
                        onClick={this.uploadImage}>Upload</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default ImageUploader;
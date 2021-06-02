import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography, Slide, IconButton } from '@material-ui/core';
import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Loading from '../Loading';
import {storage} from '../../firebase';
import './index.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ImageUploader extends Component {
    state = {
        picture: undefined,
        loading: true,
        oldPicture: undefined
    }
    init = () => {
        this.setState({
            picture: undefined,
            loading: false,
            oldPicture: this.props.pictureURL
        })
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
    // Deletes the new image (local change only)
    deleteNewImage = () => {
        this.setState({
            picture: undefined
        })
    }
    // Deletes the old image from the server and from local state
    deleteOldPicture = () => {
        if (this.props.pictureName === 'main') {
            this.setState({
                oldPicture: undefined
            });
            return;
        }
        this.setState({
            loading: true
        });
        storage.ref(`/pictures/1/${this.props.pictureName}`).delete().then(() => {
            setTimeout(() => {
                this.props.updateImageURL(undefined);
                this.setState({
                    oldPicture: undefined
                });
                this.setState({
                    loading: false
                });
            }, 500);
        })
    }
    // Upload the new image
    uploadImage = () => {
        this.setState({
            loading: true
        });
        storage.ref(`/pictures/1/${this.props.pictureName}`).put(this.state.picture).then(() => {
            storage.ref(`/pictures/1/${this.props.pictureName}`).getDownloadURL().then((url) => {
                setTimeout(() => {
                    this.props.updateImageURL(url);
                    this.props.toggleDialog();
                    this.setState({
                        loading: false
                    });
                }, 500);
            })
        });
    }
    render() {
        return (
            <Dialog
                open={this.props.open}
                fullWidth
                onEnter={this.init}
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
                            this.state.oldPicture === undefined &&
                            !this.state.loading &&
                            <div className='default-wrapper'>
                            <label htmlFor='image-uploader-input'>
                                <IconButton component='span'>
                                    <AddIcon className='default-image'/>
                                </IconButton>
                            </label>
                            {
                                this.props.pictureName === 'main' &&
                                <Typography align='center'>You must have a 5 minute reveal picture</Typography>
                            }
                            </div>
                        }
                        {
                            // Handle existing image
                            this.state.oldPicture !== undefined &&
                            !this.state.loading &&
                            <div>
                                <img src={this.state.oldPicture} alt='uploaded-file' className='uploaded-image'/>
                                <IconButton className='delete-button' onClick={this.deleteOldPicture}>
                                    <HighlightOffIcon />
                                </IconButton>
                            </div>
                        }
                        {
                            // Handle new image
                            this.state.picture !== undefined &&
                            !this.state.loading &&
                            <div>
                                <img src={URL.createObjectURL(this.state.picture)} alt='uploaded-file' className='uploaded-image'/>
                                <IconButton className='delete-button' onClick={this.deleteNewImage}>
                                    <HighlightOffIcon />
                                </IconButton>
                            </div>
                        }
                        {
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
                        disabled={
                            this.state.picture === undefined ||
                            this.state.oldPicture !== undefined ||
                            this.state.loading
                        }
                        onClick={this.uploadImage}>Upload</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default ImageUploader;
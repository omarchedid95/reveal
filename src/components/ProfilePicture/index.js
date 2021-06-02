import { Card, IconButton } from '@material-ui/core'
import React, { Component } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ImageUploader from '../ImageUploader';
import Loading from '../Loading';
import {storage} from '../../firebase';
import './index.css';

export default class ProfilePicture extends Component {
    state = {
        loading: true,
        error: false,
        openImageUploader: false,
        pictureURL: undefined
    }
    toggleDialog = () => {
        this.setState((state) => ({
            openImageUploader: !state.openImageUploader
        }));
    }
    componentDidMount = () => {
        storage.ref(`/pictures/1/${this.props.pictureName}`).getDownloadURL().then((url) => {
            this.setState({
                loading: true,
                pictureURL: url
            });
        }).catch(() => {
            this.setState({
                loading: false,
                pictureURL: undefined,
                error: true
            });
        })
    }
    handleLoad = () => {
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 500);
    }
    handleError = () => {
        this.setState({
            loading: false,
            pictureURL: undefined,
            error: true
        });
    }
    updateImageURL = (url) => {
        this.setState({
            loading: url !== undefined ? true : false,
            pictureURL: url
        });
    }
    render() {
        return (
            <Card className='profile-picture-component-wrapper'>
                <ImageUploader
                    open={this.state.openImageUploader}
                    toggleDialog={this.toggleDialog}
                    pictureURL={this.state.pictureURL}
                    updateImageURL={this.updateImageURL}
                    pictureName={this.props.pictureName}
                />
                {
                    this.state.loading &&
                    <Loading />
                }
                <div hidden={this.state.loading}>
                    <IconButton onClick={this.toggleDialog} className='edit-button'>
                        <EditIcon />
                    </IconButton>
                    {
                        this.state.pictureURL &&
                        <img
                            onLoad={this.handleLoad} 
                            onError={this.handleError}
                            src={this.state.pictureURL}
                            alt='profile'
                        />
                    }
                    {
                        (this.state.pictureURL === undefined || this.state.error) &&
                        <AccountCircleIcon className='fallback-icon'/>
                    }
                </div>
            </Card>
        )
    }
}

import { Card, IconButton } from '@material-ui/core'
import React, { Component } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import './index.css';

export default class ProfilePicture extends Component {
    render() {
        return (
            <Card className='profile-picture-component-wrapper'>
                <div>
                    <IconButton className='edit-button'>
                        <EditIcon />
                    </IconButton>
                    <img src='https://picsum.photos/300' alt='profile'/>
                </div>
            </Card>
        )
    }
}

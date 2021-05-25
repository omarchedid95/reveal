import { Typography } from '@material-ui/core';
import React, { Component } from 'react'
import './index.css';

export default class Message extends Component {
    render () {
        const message = this.props.message;
        return (
            <Typography className={`message ${this.props.state}`}>
                {message.content}
            </Typography>
        )
    }
}

import { Typography, Paper, Divider, TextField, IconButton } from '@material-ui/core';
import React, { Component } from 'react'
import Message from '../Message';
import SendIcon from '@material-ui/icons/Send';
import './index.css';
export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: ''
        }
        this.lastMessageRef = React.createRef();
    }
    addMessage = () => {
        const message = this.state.message;
        if (message !== '') {
            this.setState((state) => ({
                messages: [...state.messages, {sender: {name: 'Omar', uuid: 99}, content: message, timeStamp: new Date()}],
                message: ''
            }));
            setTimeout(() => {
                this.setState((state) => ({
                    messages: [...state.messages, {sender: {name: 'Grace', uuid: 1897234}, content: 'Testing', timeStamp: new Date()}],
                    message: ''
                }));
            }, 2000);
        }
    }
    handleMessageChange = (e) => {
        if (e.target.value !== '\n') {
            this.setState({
                message: e.target.value
            });
        }
    }
    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            if (this.state.message !== undefined) {
                this.addMessage();
            }
        }
    }
    render() {
        const match = this.props.match;
        const user = {
            uuid: 99,
            name: 'Omar'
        }
        return (
            <div className='chat-component-wrapper'>
                <section className='messages-section'>
                {
                    this.state.messages.map((message, index) => {
                        if (message.sender.uuid === match.uuid) {
                            return <Message key={index} message={message} state='received'/>
                        } else if (message.sender.uuid === user.uuid) {
                            return <Message key={index} message={message} state='sent'/>
                        }
                    })
                }
                </section>
                <Divider />
                <Paper className='actions-section'>
                    <TextField
                        fullWidth
                        multiline
                        rowsMax={3}
                        onChange={this.handleMessageChange}
                        value={this.state.message}
                        onKeyDown={this.handleKeyDown}
                        autoFocus={true}
                        className='text-field'
                    />
                    <IconButton className='send-button'>
                        <SendIcon />
                    </IconButton>
                </Paper>
            </div>
        )
    }
}

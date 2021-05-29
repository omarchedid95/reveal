import { Avatar, Divider, List, ListItem, ListItemAvatar, Typography } from '@material-ui/core'
import React, { Component } from 'react';
import {selectChat} from '../../redux/actions/chats/actions';
import { connect } from 'react-redux';
import './index.css';

class ChatsList extends Component {
    state = {
        chats: []
    }
    componentDidMount = () => {
        // Hook into firestore and keep getting a list of all the chats in real time
    }
    render() {
        return (
            <div className='chats-list-component-wrapper'>
                {
                    this.state.chats.length > 0 &&
                    <List>
                        {
                            this.state.chats.map((chat, index) => {
                                return (
                                    <div key={index}>
                                        <ListItem
                                            selected={this.props.selectedChat.chatId === chat.chatId}
                                            button
                                            className='chat-wrapper'
                                        >
                                            <ListItemAvatar className='avatar-wrapper'>
                                                <Avatar className='avatar' alt='profile-picture' src='https://picsum.photos/50' />
                                            </ListItemAvatar>
                                            <section>
                                                <Typography variant='h6' noWrap>Omar</Typography>
                                                <Typography noWrap>The last message sent was a long one that is very long</Typography>
                                            </section>
                                        </ListItem>
                                        <Divider />
                                    </div>
                                )
                            })
                        }
                    </List>
                }
                {
                    this.state.chats.length === 0 &&
                    <section className='empty-chats-section'>
                        <Typography variant='h5' align='center'>Your chats will appear here</Typography>
                    </section>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        selectedChat: state.chats.selectedChat
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        selectChat: (chat) => dispatch(selectChat(chat))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatsList);
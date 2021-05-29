import { Avatar, Divider, List, ListItem, ListItemAvatar, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import './index.css';

export default class ChatsList extends Component {
    render() {
        // Get the matches from redux
        // const matches = this.props.matches;
        const chats = [
            {
                id: 'hlkjashdf9erjlkhasdf',
                members: [
                    {
                        uid: 'alsdfjlaskdf',
                        firstName: 'Sarah',
                        avatarURL: 'https://picsum.photos/50'
                    },
                    {
                        uid: 'kjasdhfklaysdif',
                        firstName: 'Omar',
                        avatarURL: 'https://picsum.photos/50'
                    }
                ],
                lastMessage: 'This is the last message sent',
                lastMessageDate: new Date()
            }
            // {

            // },
            // {

            // },
            // {

            // },
            // {

            // },
            // {

            // },
            // {

            // },
            // {

            // },
            // {

            // },
            // {

            // },
            // {

            // },
            // {

            // },
            // {

            // },
            // {

            // },
            // {

            // },
            // {

            // },
            // {

            // },
            // {

            // },
            // {

            // },
            // ,
            // {

            // },
            // ,
            // {

            // }
        ]
        return (
            <div className='chats-list-component-wrapper'>
                {
                    chats.length > 0 &&
                    <List>
                        {
                            chats.map((chat, index) => {
                                return (
                                    <div key={index}>
                                        <ListItem button className='chat-wrapper'>
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
                    chats.length === 0 &&
                    <section className='empty-chats-section'>
                        <Typography variant='h5' align='center'>Your chats will appear here</Typography>
                    </section>
                }
            </div>
        )
    }
}

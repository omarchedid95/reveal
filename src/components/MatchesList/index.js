import { Avatar, Divider, List, ListItem, ListItemAvatar, Paper, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import './index.css';

export default class MatchesList extends Component {
    render() {
        // Get the matches from redux
        // const matches = this.props.matches;
        const matches = [
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

            // }
        ]
        return (
            <div className='matches-list-component-wrapper'>
                {
                    matches.length > 0 &&
                    <List>
                        {
                            matches.map((match, index) => {
                                return (
                                    <div key={index}>
                                        <ListItem button className='match-wrapper'>
                                            <ListItemAvatar className='avatar-wrapper'>
                                                <Avatar className='avatar' alt='profile-picture' src='https://picsum.photos/50' />
                                            </ListItemAvatar>
                                            <section>
                                                <Typography variant='h6' noWrap>Omar</Typography>
                                                <Typography noWrap>The last message sent was a long one</Typography>
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
                    matches.length === 0 &&
                    <section className='empty-matches-section'>
                        <Typography variant='h5' align='center'>You matches will appear here</Typography>
                    </section>
                }
            </div>
        )
    }
}

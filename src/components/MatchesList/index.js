import { Avatar, Divider, List, ListItem, ListItemAvatar, Paper, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import './index.css';

export default class MatchesList extends Component {
    render() {
        // Get the matches from redux
        // const matches = this.props.matches;
        const matches = [
            {

            },
            {

            },
            {

            },
            {

            },
            {

            },
            {

            },
            {

            },
            {

            },
            {

            },
            {

            },
            {

            }
        ]
        return (
            <Paper className='matches-list-component-wrapper'>
                <List>
                    {
                        matches.map((match, index) => {
                            return (
                                <div >
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
            </Paper>
        )
    }
}

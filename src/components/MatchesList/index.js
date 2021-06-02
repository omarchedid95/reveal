import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, Typography } from '@material-ui/core'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectMatch } from '../../redux/actions/matches/actions';
import './index.css';

class MatchesList extends Component {
    render() {
        const matches = this.props.matches;
        const selectedMatch = this.props.selectedMatch;
        return (
            <div className='matches-list-component-wrapper'>
                <Button fullWidth onClick={() => this.props.selectMatch(undefined)}>
                    <Typography variant='h4'>Find Someone</Typography>
                </Button>
                {
                    matches.length > 0 &&
                    <List>
                        {
                            matches.map((match, index) => {
                                const matchName = match.partner.name;
                                const matchAvatarURL = match.partner.avatarURL;
                                const lastMessage = match.lastMessage;
                                return (
                                    <div key={index}>
                                        <ListItem
                                            selected={selectedMatch ? selectedMatch.chatId === match.chatId : false}
                                            button
                                            onClick={() => this.props.selectMatch(match)}
                                            className='match-wrapper'
                                        >
                                            <ListItemAvatar className='avatar-wrapper'>
                                                <Avatar className='avatar' alt='profile-picture' src={matchAvatarURL} />
                                            </ListItemAvatar>
                                            <section>
                                                <Typography variant='h6' noWrap>{matchName}</Typography>
                                                <Typography noWrap>{lastMessage}</Typography>
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
                    <section className='empty-chats-section'>
                        <Typography variant='h5' align='center'>Your matches will appear here</Typography>
                    </section>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        matches: state.matches.matches,
        selectedMatch: state.matches.selectedMatch
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        selectMatch: (match) => dispatch(selectMatch(match))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MatchesList);
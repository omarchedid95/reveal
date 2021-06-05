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
                {
                    selectMatch &&
                    <div className='matchmaking-button-wrapper'>
                        <Button
                            variant='outlined'
                            onClick={() => this.props.selectMatch(undefined)}>
                            <Typography>Matchmaking</Typography>
                        </Button>
                    </div>
                }
                <Divider />
                {
                    matches.length > 0 &&
                    <List>
                        {
                            matches.map((match, index) => {
                                const partnerName = match.partner.firstName;
                                const partnerAvatarURL = match.partner.profilePictureURL;
                                const lastMessage = match.lastMessage;
                                return (
                                    <div key={index}>
                                        {/* TODO: turn this into a component because we need to use storage ref to load the avatarURL on mount */}
                                        <ListItem
                                            selected={selectedMatch ? selectedMatch.matchId === match.matchId : false}
                                            button
                                            onClick={() => this.props.selectMatch(match)}
                                            className='match-wrapper'
                                        >
                                            <ListItemAvatar className='avatar-wrapper'>
                                                <Avatar className='avatar' alt='profile-picture' src={partnerAvatarURL} />
                                            </ListItemAvatar>
                                            <section>
                                                <Typography variant='h6' noWrap>{partnerName}</Typography>
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
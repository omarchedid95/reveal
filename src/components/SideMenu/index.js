import { Avatar, Divider, ListItem, ListItemAvatar, MenuItem, Tab, Tabs, Typography } from '@material-ui/core';
import React, { Component } from 'react'
import { withRouter } from 'react-router';
import MatchesList from '../MatchesList'
import './index.css';

class SideMenu extends Component {
    state = {
        chatMenuView: true
    }
    changeMenuView = () => {
        this.setState((state) => ({
            chatMenuView: !state.chatMenuView
        }), () => {
            if (this.state.chatMenuView) {
                this.props.history.push('/app');
            } else {
                this.props.history.push('/app/profile')
            }
        });
    }
    render() {
        return (
            <div className='side-menu-component-wrapper'>
                <header>
                    <MenuItem onClick={this.changeMenuView} className='header-content-wrapper'>
                        <Avatar alt='profile-picture' src='https://picsum.photos/50' className='avatar'/>
                        <Typography variant='h5'>Omar</Typography>
                    </MenuItem>
                </header>
                <Divider />
                <main>
                    {
                        this.state.chatMenuView  &&
                        <MatchesList />
                    }
                    {
                        !this.state.chatMenuView &&
                        <p>Settings</p>
                    }
                </main>
            </div>
        )
    }
}
export default withRouter(SideMenu);
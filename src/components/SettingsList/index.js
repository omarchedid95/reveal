import { List, ListItem, Typography } from '@material-ui/core';
import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { withAuth } from '../HOC';
import LogoutDialog from '../LogoutDialog';
import './index.css';

class SettingsList extends Component {
    state = {
        openLogoutDialog: false
    }
    toggleDialog = () => {
        this.setState((state) => ({
            openLogoutDialog: !state.openLogoutDialog
        }));
    }
    changeMenuView = (url) => {
        this.props.history.push(url);
    }
    render() {
        const pathName = this.props.location.pathname;
        return (
            <div className='settings-list-component-wrapper'>
                <LogoutDialog open={this.state.openLogoutDialog} toggleDialog={this.toggleDialog}/>
                <section>
                    <List>
                        <ListItem
                            onClick={() => this.changeMenuView('/app/profile')}
                            selected={pathName === '/app/profile'}
                            button
                            className='setting-wrapper'
                        >
                            <Typography variant='h5' align='center'>Profile</Typography>
                        </ListItem>
                        <ListItem
                            onClick={() => this.changeMenuView('/app/account')}
                            selected={pathName === '/app/account'}
                            button
                            className='setting-wrapper'
                        >
                            <Typography variant='h5' align='center'>Account</Typography>
                        </ListItem>
                        <ListItem
                            onClick={() => this.changeMenuView('/app/help')}
                            selected={pathName === '/app/help'}
                            button
                            className='setting-wrapper'
                        >
                            <Typography variant='h5' align='center'>Contact and Help</Typography>
                        </ListItem>
                        <ListItem
                            onClick={this.toggleDialog}
                            button
                            className='setting-wrapper'
                        >
                            <Typography variant='h5' align='center'>Log Out</Typography>
                        </ListItem>
                    </List>
                </section>
            </div>
        )
    }
}
export default withRouter(withAuth(SettingsList));
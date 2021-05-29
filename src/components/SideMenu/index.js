import { Avatar, Divider, MenuItem, Typography } from '@material-ui/core';
import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router';
import ChatsList from '../ChatsList'
import './index.css';

class SideMenu extends Component {
    changeMenuView = () => {
        const pathName = this.props.location.pathname;
        if (pathName === '/app') {
            this.props.history.push('/app/profile')
        } else if (pathName === '/app/profile') {
            this.props.history.push('/app')
        }
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
                    <Switch>
                        <Route exact path='/app' component={() => <ChatsList />} />
                        <Route exact path='/profile' component={() => <p>Settigns</p>} />
                    </Switch>
                </main>
            </div>
        )
    }
}
export default withRouter(SideMenu);
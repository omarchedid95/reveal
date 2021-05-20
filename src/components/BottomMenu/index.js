import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import React, { Component } from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';
import './index.css';
import { withRouter } from 'react-router';

class BottomMenu extends Component {
    render() {
        return (
            <BottomNavigation className='bottom-menu-component-wrapper'>
                <BottomNavigationAction
                    label='home'
                    icon={<FavoriteIcon />}
                    onClick={() => this.props.history.push('/')}
                />
                <BottomNavigationAction
                    label='chats'
                    icon={<ChatIcon />}
                    onClick={() => this.props.history.push('/chat')}
                />
                <BottomNavigationAction
                    label='profile'
                    icon={<PersonIcon />}
                    onClick={() => this.props.history.push('/profile')}
                />
            </BottomNavigation>
        )
    }
}
export default withRouter(BottomMenu);
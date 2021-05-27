import { IconButton, Typography } from '@material-ui/core';
import { Component } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';
import { Link } from 'react-router-dom';
import './index.css';

class NavBar extends Component {
    render() {
        return (
            <nav className='nav-wrapper'>
                <section className='title-section'>
                    <Link to='/home' className='link'>
                        <Typography 
                            variant='h2'
                        >
                            [Reveal]
                        </Typography>
                    </Link>
                </section>
                <section className='links-section'>
                    <Link to='/chat' className='link'>
                        <IconButton className='chat-button'>
                            <ChatIcon />
                        </IconButton>
                    </Link>
                    <Link to='/profile' className='link'>
                        <IconButton className='profile-button'>
                            <PersonIcon />
                        </IconButton>
                    </Link>
                </section>
            </nav>
        )
    }
}
export default NavBar;
import { Typography } from '@material-ui/core';
import { Component } from 'react';
import './index.css';

class NavBar extends Component {
    render() {
        return (
            <nav className='nav-wrapper'>
                <section className='title-section'>
                    <Typography variant='h2'>
                        [Reveal]
                    </Typography>
                </section>
            </nav>
        )
    }
}
export default NavBar;
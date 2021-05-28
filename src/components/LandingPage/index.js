import { Typography, Button } from '@material-ui/core';
import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router';

class LandingPage extends Component {
    render() {
        return (
            <div className='landing-page-component-wrapper'>
                <section className='welcome-section'>
                    <Typography variant='h2' align='center'>
                        Welcome to Reveal, a social experiment
                    </Typography>
                    <Typography variant='h4' align='center'>
                        you're about to be part of something <span style={{color: 'red'}}>special</span>
                    </Typography>
                    <div>
                        <Button onClick={() => this.props.history.push('/login')}>Go to Login</Button>
                        <Button onClick={() => this.props.history.push('/signup')}>Go to Signup</Button>
                        <Button onClick={() => this.props.history.push('/home')}>Go to Home</Button>
                        <Button onClick={() => this.props.history.push('/chat')}>Go to Chat</Button>
                        <Button onClick={() => this.props.history.push('/profile')}>Go to Profile</Button>
                    </div>
                </section>
            </div>
        )
    }
}
export default withRouter(LandingPage);
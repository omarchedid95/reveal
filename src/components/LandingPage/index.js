import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router'

class LandingPage extends Component {
    render() {
        return (
            <div>
                <Button onClick={() => this.props.history.push('/login')}>Go to Login</Button>
                <Button onClick={() => this.props.history.push('/signup')}>Go to Signup</Button>
                <Button onClick={() => this.props.history.push('/home')}>Go to Home</Button>
                <Button onClick={() => this.props.history.push('/chat')}>Go to Chat</Button>
                <Button onClick={() => this.props.history.push('/profile')}>Go to Profile</Button>
            </div>
        )
    }
}
export default withRouter(LandingPage);
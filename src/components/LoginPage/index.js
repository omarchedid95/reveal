import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { withAuth } from '../HOC';
class LoginPage extends Component {
    handleLogin = () => {
        this.props.auth.signInWithGoogle().then((res) => console.log(res)).catch((err) => console.log(err))
    }
    render() {
        return (
            <div>
                <Button onClick={() => this.props.history.push('/')}>Go to landing</Button>
                <Button onClick={() => this.props.history.push('/signup')}>Go to signup</Button>
                <Button onClick={this.handleLogin}>Login with Google</Button>
            </div>
        )
    }
}
export default withRouter(withAuth(LoginPage));
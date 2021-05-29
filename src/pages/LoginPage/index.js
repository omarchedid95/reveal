import { Button, Divider, Link, TextField, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { withAuth } from '../../components/HOC';
import './index.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.auth = this.props.auth;
        this.signInWithGoogle = this.auth.signInWithGoogle;
    }
    state = {
        email: '',
        password: '',
        error: undefined
    }
    continueWithGoogle = () => {
        this.signInWithGoogle().then((res) => {
            console.log(res)
        }).catch((err) => {
            // const errorCode = err.code;
            // const errorMessage = err.message;
            // Account exists (this is for sign up)
            // if (errorCode === 'auth/account-exists-with-different-credential') {

            // }
            // console.log(err)
        });
    }
    render() {
        return (
            <div className='login-page-component-wrapper'>
                <Typography variant='h2' align='center'>Login</Typography>
                <section className='login-section'>
                    <Button
                        variant='outlined'
                        className='button google'
                        onClick={this.continueWithGoogle}
                    >
                        Continue with Google
                    </Button>
                    <Button
                        variant='outlined'
                        className='button apple'
                    >
                        Continue with Apple
                    </Button>
                    <Divider />
                </section>
                <section className='form-section'>
                    <TextField
                        fullWidth
                        autoFocus
                        variant='outlined'
                        type='email'
                        placeholder='Email'
                        className='email-field'
                        error={this.state.error}
                    />
                    <TextField
                        fullWidth
                        variant='outlined'
                        type='password'
                        placeholder='Password'
                        className='password-field'
                        error={this.state.error}
                    />
                    <Button
                        variant='outlined'
                        className='button email'
                    >
                        Continue with email
                    </Button>
                    <Link onClick={() => this.props.history.push('/forgot')}>
                        <Typography align='center'>Forgot password?</Typography>
                    </Link>
                    <Typography align='center'>or</Typography>
                    <Link onClick={() => this.props.history.push('/signup')}>
                        <Typography align='center'>Create an account</Typography>
                    </Link>
                </section>
            </div>
        )
    }
}
export default withRouter(withAuth(LoginPage));
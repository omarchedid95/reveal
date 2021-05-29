import { Container } from '@material-ui/core';
import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import ProfilePage from './components/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { AuthProvider } from './auth/AuthProvider';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Container disableGutters maxWidth='lg' className='app-component-wrapper'>
        <AuthProvider>
        <Switch>
          <PublicRoute exact path='/' component={() => <LandingPage />} />
          <PublicRoute exact path='/login' component={() => <LoginPage />} />
          <PublicRoute exact path='/signup' component={() => <SignupPage />} />
          <PrivateRoute path='/app' component={() => <HomePage />} />
          {/* <PrivateRoute exact path='/chat' component={() => <ChatPage />} />
          <PrivateRoute exact path='/profile' component={() => <ProfilePage />} /> */}
        </Switch>
        </AuthProvider>
      </Container>
    )
  }
}

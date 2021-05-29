import { Container } from '@material-ui/core';
import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
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
          <PrivateRoute path='/app' component={() => <MainPage />} />
        </Switch>
        </AuthProvider>
      </Container>
    )
  }
}

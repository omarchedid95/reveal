import { Container, Hidden } from '@material-ui/core'
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import ChatPage from './components/ChatPage';
import NavBar from './components/NavBar';
import './App.css';
import BottomMenu from './components/BottomMenu';

export default class App extends Component {
  render() {
    return (
      <Container disableGutters maxWidth='md' className='app-component-wrapper'>
        <Hidden xsDown>
          <NavBar />
        </Hidden>
        <Switch>
          <Route exact path='/' component={() => <HomePage />} />
          <Route exact path='/chat' component={() => <ChatPage />} />
          <Route exact path='/profile' component={() => <ProfilePage />} />
        </Switch>
        <Hidden smUp>
          <BottomMenu />
        </Hidden>
      </Container>
    )
  }
}

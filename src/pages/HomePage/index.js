import { Button, Divider, Hidden, Paper } from '@material-ui/core'
import React, { Component } from 'react'
import SideMenu from '../../components/SideMenu';
import BottomMenu from '../../components/BottomMenu';
import { withAuth } from '../../components/HOC'
import MatchesList from '../../components/MatchesList';
import NavBar from '../../components/NavBar';
import './index.css';
import { Route, Switch } from 'react-router';
import Chat from '../../components/Chat';
import ProfilePage from '../ProfilePage';
class HomePage extends Component {
    
    render() {
        return (
            <div className='home-page-component-wrapper'>
                <aside className='home-page-aside'>
                    <SideMenu />
                </aside>
                <main className='home-page-main-section'>
                    <Switch>
                        <Route exact path='/app' component={() => <Chat />} />
                        <Route exact path='/app/profile' component={() => <ProfilePage />} />
                    </Switch>
                </main>
            </div>
        )
    }
}
export default withAuth(HomePage);
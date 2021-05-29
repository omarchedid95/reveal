import React, { Component } from 'react'
import SideMenu from '../../components/SideMenu';
import { withAuth } from '../../components/HOC'
import Chat from '../../components/Chat';
import ProfilePage from '../ProfilePage';
import { Route, Switch } from 'react-router';
import './index.css';

class MainPage extends Component { 
    render() {
        return (
            <div className='main-page-component-wrapper'>
                <aside>
                    <SideMenu />
                </aside>
                <main>
                    <Switch>
                        <Route exact path='/app' component={() => <Chat />} />
                        <Route exact path='/app/profile' component={() => <ProfilePage />} />
                    </Switch>
                </main>
            </div>
        )
    }
}
export default withAuth(MainPage);
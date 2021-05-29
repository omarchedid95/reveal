import React, { Component } from 'react'
import SideMenu from '../../components/SideMenu';
import { withAuth } from '../../components/HOC'
import Chat from '../../components/Chat';
import UserProfile from '../../components/UserProfile';
import { Paper } from '@material-ui/core';
import { Route, Switch } from 'react-router';
import './index.css';

class MainPage extends Component { 
    render() {
        return (
            <Paper className='main-page-component-wrapper'>
                <aside>
                    <SideMenu />
                </aside>
                <main>
                    <Switch>
                        <Route exact path='/app' component={() => <Chat />} />
                        <Route exact path='/app/profile' component={() => <UserProfile />} />
                        <Route exact path='/app/account' component={() => <p>account here</p>} />
                        <Route exact path='/app/help' component={() => <p>help here</p>} />
                    </Switch>
                </main>
            </Paper>
        )
    }
}
export default withAuth(MainPage);
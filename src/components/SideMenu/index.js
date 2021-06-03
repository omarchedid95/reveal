import { Avatar, Divider, IconButton, MenuItem, Typography } from '@material-ui/core';
import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MatchesList from '../MatchesList'
import SettingsList from '../SettingsList';
import {storage} from '../../firebase';
import './index.css';
import { connect } from 'react-redux';

class SideMenu extends Component {
    state = {
        pictureURL: undefined
    }
    changeMenuView = () => {
        const pathName = this.props.location.pathname;
        if (pathName === '/app') {
            this.props.history.push('/app/profile')
        } else {
            this.props.history.push('/app')
        }
    }
    componentDidMount = () => {
        storage.ref(`/pictures/1/main`).getDownloadURL().then((url) => {
            this.setState({
                pictureURL: url
            });
        }).catch(() => {
            this.setState({
                pictureURL: undefined
            });
        });
    }
    render() {
        const pathName = this.props.location.pathname;
        return (
            <div className='side-menu-component-wrapper'>
                <header>
                    <MenuItem onClick={this.changeMenuView} className='header-content-wrapper'>
                        {
                            pathName !== '/app' &&
                            <IconButton>
                                <ArrowBackIcon />
                            </IconButton>
                        }
                        <Avatar
                            src={this.state.pictureURL}
                            alt='profile'
                            className='avatar'
                        />
                        <Typography variant='h5'>{this.props.firstName}</Typography>
                    </MenuItem>
                </header>
                <Divider />
                <main>
                    <Switch>
                        <Route exact path='/app' component={() => <MatchesList />} />
                        <Route exact path='/app/profile' component={() => <SettingsList />} />
                        <Route exact path='/app/account' component={() => <SettingsList />} />
                        <Route exact path='/app/help' component={() => <SettingsList />} />
                    </Switch>
                </main>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        firstName: state.profile.firstName
    }
}
export default connect(mapStateToProps, null)(withRouter(SideMenu));
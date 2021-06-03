import React, { Component } from 'react'
import SideMenu from '../../components/SideMenu';
import Main from '../../components/Main';
import UserProfile from '../../components/UserProfile';
import Loading from '../../components/Loading';
import { Paper } from '@material-ui/core';
import { Route, Switch } from 'react-router';
import {firestore} from '../../firebase';
import { connect } from 'react-redux';
import { loadMatches } from '../../redux/actions/matches/actions';
import './index.css';
import { syncProfile } from '../../redux/actions/profile/actions';

class MainPage extends Component {
    state = {
        loading: true
    }
    componentDidMount = () => {
        this.subscribeToUserProfile();
        this.loadUserMatches();
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 2000);
    }
    componentWillUnmount = () => {
        this.unsubFromUserProfile();
    }
    // Monitor any changes that happen to the user object and sync them immediately
    subscribeToUserProfile = () => {
        this.unsubFromUserProfile = firestore.collection('user').doc('1').onSnapshot((doc) => {
            try {
                if (!doc.exists) {
                    throw Error('User does not exist')
                }
                const user = doc.data();
                const firstName = user.firstName ? user.firstName : '';
                const lastName = user.lastName ? user.lastName : '';
                const dob = user.dob ? user.dob : new Date();
                const reveal0 = user.reveal0 ? user.reveal0 : {number: 0, time: 1, prompt: '', answer: ''}
                const reveal1 = user.reveal1 ? user.reveal1 : {number: 1, time: 3, prompt: '', answer: ''}
                const reveal2 = user.reveal2 ? user.reveal2 : {number: 2, time: 7, prompt: '', answer: ''}
                const reveal3 = user.reveal3 ? user.reveal3 : {number: 3, time: 10, prompt: '', answer: ''}
                const preferences = {
                    sexPreference: user.sexPreference ? user.sexPreference : 'anyone',
                    agePreference: user.agePreference ? user.agePreference : [18, 30]
                }
                const profile = {
                    firstName: firstName,
                    lastName: lastName,
                    dob: dob,
                    reveals: [
                    reveal0,
                    reveal1,
                    reveal2,
                    reveal3,
                    ],
                    preferences: preferences
                }
                this.props.syncProfile(profile);
            } catch (error) {
                console.log(error)
            }
        })

    }
    loadUserMatches = () => {
        // Hook into firestore and keep getting a list of all the current matches in real time
        // get these from /user/1/matches
        this.props.loadMatches([
            {
                chatId: 1,
                partner: {
                    name: 'Omar',
                    avatarURL: 'https://picsum.photos/50'
                },
                lastMessage: 'test'
            },
            {
                chatId: 2,
                partner: {
                    name: 'Sarah',
                    avatarURL: 'https://picsum.photos/50'
                },
                lastMessage: 'testing a longer message that takes space'
            },
            {
                chatId: 3,
                partner: {
                    name: 'Alex',
                    avatarURL: 'https://picsum.photos/50'
                },
                lastMessage: 'test'
            }
        ])
    }
    render() {
        if (this.state.loading) {
            return (
                <Paper className='main-page-component-wrapper'>
                    <Loading />
                </Paper>
            )
        }
        return (
            <Paper className='main-page-component-wrapper'>
                <aside>
                    <SideMenu />
                </aside>
                <main>
                    <Switch>
                        <Route exact path='/app' component={() => <Main />} />
                        <Route exact path='/app/profile' component={() => <UserProfile />} />
                        <Route exact path='/app/account' component={() => <p>account here</p>} />
                        <Route exact path='/app/help' component={() => <p>help here</p>} />
                    </Switch>
                </main>
            </Paper>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadMatches: (matches) => dispatch(loadMatches(matches)),
        syncProfile: (profile) => dispatch(syncProfile(profile))
    }
}
export default connect(null, mapDispatchToProps)(MainPage);
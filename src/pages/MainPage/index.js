import React, { Component } from 'react'
import SideMenu from '../../components/SideMenu';
import Main from '../../components/Main';
import UserProfile from '../../components/UserProfile';
import Loading from '../../components/Loading';
import { Paper } from '@material-ui/core';
import { Route, Switch } from 'react-router';
import { firestore } from '../../firebase';
import { connect } from 'react-redux';
import { syncMatches } from '../../redux/actions/matches/actions';
import { syncProfile } from '../../redux/actions/profile/actions';
import { sanitizeProfile } from '../../sanitize';
import './index.css';

class MainPage extends Component {
    state = {
        loading: true
    }
    componentDidMount = () => {
        this.subscribeToUserProfile();
        this.subscribeToUserMatches();
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 2000);
    }
    componentWillUnmount = () => {
        this.unsubFromUserProfile();
        this.unsubscribeFromUserMatches();
    }
    // Monitor any changes that happen to the user object and sync them immediately
    subscribeToUserProfile = () => {
        this.unsubFromUserProfile = firestore.collection('user').doc('1').onSnapshot((doc) => {
            try {
                if (!doc.exists) {
                    throw Error('User does not exist')
                }
                const profile = sanitizeProfile(doc.data());
                this.props.syncProfile(profile);
            } catch (error) {
                console.log(error)
            }
        })
    }
    // Monitor any changes that happen to the user matches and sync them immediately
    subscribeToUserMatches = () => {
        this.unsubscribeFromUserMatches = firestore.collection('match').where('members', 'array-contains', '1').orderBy('lastMessageDate', 'desc').onSnapshot((snapshot) => {
            if (snapshot.empty) {
                this.props.syncMatches([]);
                return;
            }
            let matches = [];
            snapshot.docs.forEach(async (doc) => {
                const matchId = doc.id;
                const match = doc.data();
                const lastMessage = match.lastMessage;
                const members = match.members;
                const partnerId = members.filter((uuid) => uuid !== '1')[0];
                // Get the profiles of the partner
                await firestore.collection('user').doc(partnerId).get().then((doc) => {
                    if (!doc.exists) {
                        // Match deleted account
                        return;
                    }
                    const profile = sanitizeProfile(doc.data());
                    matches.push({
                        matchId: matchId,
                        lastMessage: lastMessage,
                        partner: {uuid: partnerId, ...profile}
                    });
                })
            })
            this.props.syncMatches(matches);
        });
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
        syncMatches: (matches) => dispatch(syncMatches(matches)),
        syncProfile: (profile) => dispatch(syncProfile(profile))
    }
}
export default connect(null, mapDispatchToProps)(MainPage);
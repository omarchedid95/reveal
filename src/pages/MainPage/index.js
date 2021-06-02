import React, { Component } from 'react'
import SideMenu from '../../components/SideMenu';
import Main from '../../components/Main';
import UserProfile from '../../components/UserProfile';
import Loading from '../../components/Loading';
import { Paper } from '@material-ui/core';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { loadMatches } from '../../redux/actions/matches/actions';
import './index.css';

class MainPage extends Component {
    state = {
        loading: true
    }
    componentDidMount = () => {
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
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 2000);
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
        loadMatches: (matches) => dispatch(loadMatches(matches))
    }
}
export default connect(null, mapDispatchToProps)(MainPage);
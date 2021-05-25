import { Paper, Tab, Tabs } from '@material-ui/core'
import React, { Component } from 'react'
import Chat from '../Chat';
import MatchProfile from '../MatchProfile';
import './index.css';

export default class Match extends Component {
    state = {
        selectedTab: 0
    }
    componentDidUpdate = (prevProps) => {
        if (this.props.match !== prevProps.match) {
            this.setState({
                selectedTab: 0
            });
        }
    }
    selectTab = (_, tab) => {
        this.setState({
            selectedTab: tab
        });
    }
    render() {
        // Get the selected match from redux
        // const match = this.props.match;
        const match = {
            uuid: 1897234
        }
        console.log(this.state.messages);
        return (
            <Paper className='match-component-wrapper'>
                <Tabs
                    variant='fullWidth'
                    indicatorColor='primary'
                    value={this.state.selectedTab}
                    onChange={this.selectTab}
                    className='tabs'
                >
                    <Tab label='Chat' />
                    <Tab label='Profile' />
                </Tabs>
                {
                    this.state.selectedTab === 0 &&
                    <div className='chat-wrapper'>
                        <Chat match={match}/>
                    </div>
                }
                {
                    this.state.selectedTab === 1 &&
                    <div className='profile-wrapper'>
                        <MatchProfile />
                    </div>
                }
            </Paper>
        )
    }
}

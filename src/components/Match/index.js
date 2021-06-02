import { Divider, Tab, Tabs, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Chat from '../Chat';
import MatchProfile from '../MatchProfile';
import './index.css';

class Match extends Component {
    state = {
        selectedTab: 0
    }
    selectTab = (_, tab) => {
        this.setState({
            selectedTab: tab
        });
    }
    render() {
        const selectedMatch = this.props.selectedMatch;
        const partner = selectedMatch.partner;
        return (
            <div className='match-component-wrapper'>
                <header>
                    <Typography variant='h4'>{partner.name}</Typography>
                </header>
                <Divider />
                <main>
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
                        <Chat />
                    }
                    {
                        this.state.selectedTab === 1 &&
                        <MatchProfile />
                    }
                </main>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        selectedMatch: state.matches.selectedMatch
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Match);
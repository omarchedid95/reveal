import { Divider, Typography, Paper } from '@material-ui/core';
import React, { Component } from 'react'
import Match from '../Match';
import MatchesList from '../MatchesList';
import './index.css';

export default class ChatPage extends Component {
    componentDidMount = () => {
        // TODO: load matches here and insert them into redux
    }
    render() {
        return (
            <div className='chat-page-component-wrapper'>
                <header>
                    <Typography variant='h4'>Matches</Typography>
                </header>
                <Divider />
                <main>
                    <section className='matches-list-section'>
                        <MatchesList />
                    </section>
                    <section className='match-section'>
                        <Match />
                    </section>
                </main>
            </div>
        )
    }
}

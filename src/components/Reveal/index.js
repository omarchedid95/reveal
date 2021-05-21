import { Chip, Card, Divider, IconButton, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import './index.css';
import RevealDialog from '../RevealDialog';

const availableReveals = {
    1: [
        {
            id: 0,
            prompt: 'my all time favorite movie is'
        },
        {
            id: 1,
            prompt: 'best album of all time'
        }
    ],
    2: [
        {
            id: 0,
            prompt: 'if i won the lottery i would'
        },
        {
            id: 1,
            prompt: 'craziest travel story'
        }
    ],
    3: [
        {
            id: 0,
            prompt: 'some prompt here'
        },
        {
            id: 2,
            prompt: 'some prompt here number two'
        },
        {
            id: 3,
            prompt: 'some prompt here number three'
        },
    ],
    4: [
        {
            id: 0,
            prompt: 'some prompt here'
        },
        {
            id: 1,
            prompt: 'some prompt here 1'
        },
        {
            id: 2,
            prompt: 'some prompt here 2'
        },
        {
            id: 3,
            prompt: 'some prompt here 3'
        },
        {
            id: 4,
            prompt: 'some prompt here 4'
        },
    ]
}

export default class Reveal extends Component {
    state = {
        openDialog: false,
        promptTitle: '',
        promptContent: ''        
    }
    toggleDialog = () => {
        this.setState((state) => ({
            openDialog: !state.openDialog
        }));
    }
    render() {
        return (
            <Card className='reveal-component-wrapper'>
                {/* TODO: remove the dialog from the reveal component so that its not spawned N times. Render once and populate as needed after redux is added. */}
                <RevealDialog
                    open={this.state.openDialog}
                    toggleDialog={this.toggleDialog}
                    revealTime={this.props.revealTime}
                    availableReveals={availableReveals[this.props.revealTime]}
                />
                <header>
                    <div className='title-container'>
                        <Typography variant='h6' align='center'>{this.state.promptTitle}</Typography>
                    </div>
                    <div className='edit-container'>
                        <IconButton onClick={this.toggleDialog}>
                            <EditIcon />
                        </IconButton>
                    </div>
                </header>
                <Divider />
                <main>
                    <Chip
                        size='small'
                        label={`${this.props.revealTime} minute reveal`}
                        className='reveal-time'
                        color='primary'
                    />
                    <section className='reveal-content-section'>
                        <Typography variant='h5'>{this.state.promptContent}</Typography>
                    </section>
                </main>
            </Card>
        )
    }
}

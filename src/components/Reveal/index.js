import React, { Component } from 'react';
import { Chip, Card, Divider, IconButton, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import RevealDialog from '../RevealDialog';
import PropTypes from 'prop-types';
import './index.css';
class Reveal extends Component {
    state = {
        openEditDialog: false
    }
    toggleDialog = () => {
        this.setState((state) => ({
            openEditDialog: !state.openEditDialog
        }));
    }
    render() {
        const reveal = this.props.reveal;
        return (
            <Card className='reveal-component-wrapper'>
                <RevealDialog
                    open={this.state.openEditDialog}
                    toggleDialog={this.toggleDialog}
                    reveal={reveal}
                    prompts={this.props.prompts}
                />
                <header>
                    <div className='title-container'>
                        <Typography variant='h6' align='center'>{reveal.prompt}</Typography>
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
                        label={`${reveal.time} minute reveal`}
                        className='reveal-time'
                        color='primary'
                    />
                    <section className='reveal-content-section'>
                        <Typography variant='h5'>{reveal.answer}</Typography>
                    </section>
                </main>
            </Card>
        )
    }
}
Reveal.propTypes = {
    reveal: PropTypes.shape({
        number: PropTypes.number.isRequired,
        time: PropTypes.number.isRequired,
        prompt: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired
    })
}
Reveal.defaultProps = {
    reveal: {
        number: -1,
        time: -1,
        prompt: 'prompt',
        answer: 'answer'
    }
}
export default Reveal;
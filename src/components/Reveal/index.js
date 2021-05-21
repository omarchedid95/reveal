import { Chip, Card, Divider, IconButton, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import './index.css';
import PropTypes from 'prop-types';
import { setEditedReveal } from '../../redux/actions/profile/actions';
import { connect } from 'react-redux';

class Reveal extends Component {
    render() {
        const reveal = this.props.reveal;
        return (
            <Card className='reveal-component-wrapper'>
                <header>
                    <div className='title-container'>
                        <Typography variant='h6' align='center'>{reveal.prompt}</Typography>
                    </div>
                    <div className='edit-container'>
                        <IconButton onClick={() => this.props.setEditedReveal(reveal.number)}>
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
const mapDispatchToProps = (dispatch) => {
    return {
        setEditedReveal: (revealNumber) => dispatch(setEditedReveal(revealNumber))
    }
}
export default connect(null, mapDispatchToProps)(Reveal);
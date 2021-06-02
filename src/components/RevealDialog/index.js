import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Divider, Slide, Paper, TextField, Hidden } from '@material-ui/core';
import Loading from '../Loading';
import Carousel from 'react-material-ui-carousel';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {firestore} from '../../firebase';
import { withMediaQuery } from '../HOC';
import './index.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class RevealDialog extends Component {
    state = {
        loading: false,
        prompt: '',
        answer: '',
        error: undefined
    }
    init = () => {
        const filteredPrompts = this.filterPrompts(this.props.prompts);
        if (this.props.reveal.prompt.length > 0) {
            this.setState({
                loading: false,
                prompt: this.props.reveal.prompt,
                answer: this.props.reveal.answer,
                error: undefined
            });
        } else {
            this.setState({
                loading: false,
                prompt: filteredPrompts[0],
                answer: '',
                error: undefined
            });
        }
    }
    reset = () => {
        this.setState({
            loading: false,
            prompt: '',
            answer: '',
            error: undefined
        });
    }
    updateAnswer = (e) => {
        this.setState({
            answer: e.target.value
        }, this.validateAnswer);
        
    }
    validateAnswer = () => {
        if (this.state.answer.length > 120) {
            this.setState({
                error: 'Your answer is too long'
            });
            return false;
        }
        if (this.state.answer.length === 0) {
            this.setState({
                error: 'Your answer cant be empty'
            });
            return false;
        }
        if (this.state.error) {
            this.setState({
                error: undefined
            });
        }
        return true;
    }
    saveChanges = () => {
        if (this.validateAnswer()) {
            this.setState({
                loading: true
            });
            const revealKey = `reveal${this.props.reveal.number}`;
            let updated = {}
            updated[revealKey] = {
                number: this.props.reveal.number,
                time: this.props.reveal.time,
                prompt: this.state.prompt,
                answer: this.state.answer
            }
            firestore.collection('user').doc('1')
            .update(updated).then(() => {
                setTimeout(() => {
                    this.reset();
                    this.props.toggleDialog();
                }, 500);
            }).catch((error) => {
                console.log(error)
            })
        }
    }
    discardChanges = () => {
        this.reset();
        this.props.toggleDialog();
    }
    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            if (this.state.error === undefined) {
                e.preventDefault();
                this.saveChanges();
            }
        }
    }
    filterPrompts = (prompts) => {
        return prompts.filter((prompt) => {
            if (this.props.reveal.prompt === prompt ||
                this.state.prompt === prompt) {
                return prompt;
            }
            if (!this.props.reveals.some((reveal) => reveal.prompt === prompt)) {
                return prompt;
            }
            return null;
        });
    }
    render() {
        const isMobile = this.props.isMobile;
        const filteredPrompts = this.filterPrompts(this.props.prompts);
        const promptIndex = this.state.prompt.length > 0 ? filteredPrompts.indexOf(this.state.prompt) : 0;
        return (
            <Dialog
                open={this.props.open}
                TransitionComponent={Transition}
                fullWidth={!isMobile}
                fullScreen={isMobile}
                className='reveal-dialog-component-wrapper'
                onEnter={this.init}
                onExit={this.reset}
            >
                <Hidden smUp>
                    <DialogActions>
                        <div className='actions-wrapper-mobile'>
                            <Button
                                onClick={this.discardChanges}
                                className='cancel-button'
                                color='secondary'
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={this.state.error !== undefined}
                                onClick={this.saveChanges}
                                className='save-button'
                                color='primary'
                            >
                                Save
                            </Button>
                        </div>
                    </DialogActions>
                </Hidden>
                <DialogTitle disableTypography>
                    <Typography variant='h4' align='center'>
                        {this.props.reveal.time} minute reveal
                    </Typography>
                    <Divider />
                </DialogTitle>
                <DialogContent>
                    <section className={isMobile ? 'carousel-section-mobile' : 'carousel-section'} >
                        <Carousel
                            autoPlay={false}
                            navButtonsAlwaysVisible={true}
                            animation='slide'
                            swipe={isMobile}
                            className={isMobile ? 'carousel-mobile' : 'carousel'}
                            next={(next) => {
                                this.setState({
                                    prompt: filteredPrompts[next],
                                    answer: ''
                                });
                            }}
                            prev={(prev) => {
                                this.setState({
                                    prompt: filteredPrompts[prev],
                                    answer: ''
                                });
                            }}
                            index={promptIndex}
                        >
                            {
                                filteredPrompts.map((prompt, index) => {
                                    return (
                                        <Paper
                                            key={index}
                                            className={isMobile ? 'carousel-item-mobile':'carousel-item'} 
                                        >
                                            <Typography variant='h4' align='center'>
                                                {prompt}
                                            </Typography>
                                        </Paper>
                                    );
                                })
                            }
                        </Carousel>
                    </section>
                    <TextField
                        autoFocus
                        multiline
                        fullWidth
                        row={2}
                        rowsMax={3}
                        placeholder='your answer'
                        variant='outlined'
                        className='answer-textfield'
                        value={this.state.answer}
                        onChange={this.updateAnswer}
                        error={this.state.error !== undefined}
                        helperText={this.state.error}
                        onKeyDown={this.handleKeyDown}
                    />
                </DialogContent>
                <Hidden xsDown>
                    {
                        this.state.loading &&
                        <div className='loading-wrapper'>
                            <Loading />
                        </div>
                    }
                    <DialogActions>
                        <Button
                            onClick={this.discardChanges}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={this.state.loading || this.state.error !== undefined}
                            onClick={this.saveChanges}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Hidden>
            </Dialog>
        )
    }
}
RevealDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    reveal: PropTypes.shape({
        number: PropTypes.number.isRequired,
        time: PropTypes.number.isRequired,
        prompt: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired
    }),
    prompts: PropTypes.arrayOf(PropTypes.string).isRequired,
    reveals: PropTypes.arrayOf(
        PropTypes.shape({
          number: PropTypes.number.isRequired,
          time: PropTypes.number.isRequired,
          prompt: PropTypes.string.isRequired,
          answer: PropTypes.string.isRequired
        })
    ).isRequired,
}
RevealDialog.defaultProps = {
    open: false,
    toggleDialog: () => {},
    reveal: {
        number: 0,
        time: -1,
        prompt: 'prompt',
        answer: 'answer'
    },
    prompts: ['default prompt'],
    reveals: [
        {
          number: 0,
          time: -1,
          prompt: 'prompt',
          answer: 'answer'
        },
        {
          number: 1,
          time: -1,
          prompt: 'prompt',
          answer: 'answer'
        },
        {
          number: 2,
          time: -1,
          prompt: 'prompt',
          answer: 'answer'
        },
        {
          number: 3,
          time: -1,
          prompt: 'prompt',
          answer: 'answer'
        }
    ]
}
const mapStateToProps = (state) => {
    return {
        reveals: state.profile.reveals
    }
}
export default connect(mapStateToProps, null)(withMediaQuery(RevealDialog));
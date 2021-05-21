import { Button, Dialog, DialogActions, DialogContent, useTheme, useMediaQuery, DialogTitle, Typography, Divider, Slide, Paper, TextField } from '@material-ui/core'
import React from 'react'
import Carousel from 'react-material-ui-carousel';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEditedReveal } from '../../redux/actions/profile/actions';
import './index.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function RevealDialog(props) {
    const editedReveal = props.editedReveal;
    let reveal;
    if (editedReveal === undefined) {
        reveal = {
            number: -1,
            time: -1,
            prompt: 'prompt',
            answer: 'answer'
        }
    } else {
        reveal = props.reveals[editedReveal];
    }
    const theme = useTheme();
    const onMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const closeDialog = () => {
        props.setEditedReveal(undefined);
    }
    return (
        <Dialog
            open={editedReveal !== undefined}
            TransitionComponent={Transition}
            fullWidth={!onMobile}
            fullScreen={onMobile}
            className='reveal-dialog-component-wrapper'
        >
            {
                onMobile &&
                <DialogActions>
                    <div className='actions-wrapper-mobile'>
                        <Button onClick={closeDialog} className='cancel-button' color='secondary'>Cancel</Button>
                        <Button onClick={closeDialog} className='save-button' color='primary'>Save</Button>
                    </div>
                </DialogActions>
            }
            <DialogTitle disableTypography>
                <Typography variant='h4' align='center'>
                    {reveal.time} minute reveal
                </Typography>
                <Divider />
            </DialogTitle>
            <DialogContent>
                <section className={onMobile ? 'carousel-section-mobile' : 'carousel-section'} >
                    <Carousel
                        autoPlay={false}
                        navButtonsAlwaysVisible={true}
                        animation='slide'
                        swipe={onMobile}
                        className={onMobile ? 'carousel-mobile' : 'carousel'}
                    >
                        {
                            props.availableReveals.map((reveal, index) => {
                                return (
                                    <Paper
                                        key={index}
                                        className={onMobile ? 'carousel-item-mobile':'carousel-item'} 
                                    >
                                        <Typography variant='h4' align='center'>
                                            {reveal.prompt}
                                        </Typography>
                                    </Paper>
                                );
                            })
                        }
                    </Carousel>
                </section>
                <TextField
                    multiline
                    fullWidth
                    row={2}
                    rowsMax={3}
                    placeholder='your answer'
                    variant='outlined'
                    className='answer-textfield'
                />
            </DialogContent>
            {
                !onMobile &&
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button onClick={closeDialog}>Save</Button>
                </DialogActions>
            }
        </Dialog>
    )
}
RevealDialog.propTypes = {
    reveals: PropTypes.arrayOf(PropTypes.shape({
        number: PropTypes.number.isRequired,
        time: PropTypes.number.isRequired,
        prompt: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired
    })).isRequired,
    editedReveal: PropTypes.number
}
RevealDialog.defaultProps = {
    reveals: [{
        number: -1,
        time: -1,
        prompt: 'prompt',
        answer: 'answer'
    }],
    editedReveal: undefined
}
const mapStateToProps = (state) => {
    return {
        reveals: state.profile.reveals,
        editedReveal: state.profile.editedReveal,
        availableReveals: []
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setEditedReveal: (revealNumber) => dispatch(setEditedReveal(revealNumber))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RevealDialog);
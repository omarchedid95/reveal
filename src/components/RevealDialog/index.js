import { Button, Dialog, DialogActions, DialogContent, useTheme, useMediaQuery, DialogTitle, Typography, Divider, Slide, Paper, TextField } from '@material-ui/core'
import React from 'react'
import Carousel from 'react-material-ui-carousel';
import './index.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function RevealDialog(props) {
    const theme = useTheme();
    const onMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            fullWidth={!onMobile}
            fullScreen={onMobile}
            className='reveal-dialog-component-wrapper'
        >
            {
                onMobile &&
                <DialogActions>
                    <div className='actions-wrapper-mobile'>
                        <Button onClick={props.toggleDialog} className='cancel-button' color='secondary'>Cancel</Button>
                        <Button onClick={props.toggleDialog} className='save-button' color='primary'>Save</Button>
                    </div>
                </DialogActions>
            }
            <DialogTitle disableTypography>
                <Typography variant='h4' align='center'>
                    {props.revealTime} minute reveal
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
                    <Button onClick={props.toggleDialog}>Cancel</Button>
                    <Button onClick={props.toggleDialog}>Save</Button>
                </DialogActions>
            }
        </Dialog>
    )
}
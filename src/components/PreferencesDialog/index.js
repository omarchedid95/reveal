import { Dialog, DialogActions, DialogContent, DialogTitle, Hidden, Button, Typography, ButtonGroup, Slide, Divider, Slider } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePreferences } from '../../redux/actions/profile/actions';
import {withMediaQuery} from '../HOC';
import './index.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class PreferencesDialog extends Component {
    state = {
        sexPreference: '',
        agePreference: []
    }
    discardChanges = () => {
        this.props.toggleDialog();
    }
    saveChanges = () => {
        this.props.updatePreferences(this.state.sexPreference, this.state.agePreference)
        this.props.toggleDialog();
    }
    updateSexPreference = (sex) => {
        this.setState({
            sexPreference: sex
        });
    }
    updateAgePreference = (_, ageRange) => {
        let min = Math.min(...ageRange);
        let max = Math.max(...ageRange);
        if (min === max) {
            if (max !== 100) {
                max += 1;
            } else {
                min -= 1;
            }
        }
        this.setState({
            agePreference: [min, max]
        })
    }
    init = () => {
        this.setState({
            sexPreference: this.props.preferences.sexPreference,
            agePreference: this.props.preferences.agePreference
        })
    }
    render() {
        const isMobile = this.props.isMobile;
        return (
            <Dialog
                open={this.props.open}
                onEnter={this.init}
                TransitionComponent={Transition}
                fullWidth={!isMobile}
                fullScreen={isMobile}
                className='preferences-dialog-component-wrapper'
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
                        Preferences
                    </Typography>
                    <Divider />
                </DialogTitle>
                <DialogContent className='content'>
                    <section className='sex-selection'>
                        <Typography variant='h6'>connect with {this.state.sexPreference}</Typography>
                        <ButtonGroup fullWidth>
                            <Button
                                onClick={() => this.updateSexPreference('men')}
                                disabled={this.state.sexPreference === 'men'}
                            >
                                Men
                            </Button>
                            <Button
                                onClick={() => this.updateSexPreference('women')}
                                disabled={this.state.sexPreference === 'women'}
                            >
                                Women
                            </Button>
                            <Button
                                onClick={() => this.updateSexPreference('anyone')}
                                disabled={this.state.sexPreference === 'anyone'}
                            >
                                Anyone
                            </Button>
                        </ButtonGroup>
                    </section>
                    <section className='age-selection'>
                        <Typography variant='h6'>between the ages of {this.state.agePreference[0]} and {this.state.agePreference[1]}</Typography>
                        <Slider
                            min={18}
                            max={100}
                            valueLabelDisplay='off'
                            value={this.state.agePreference}
                            onChange={this.updateAgePreference}
                        />
                    </section>
                </DialogContent>
                <Hidden xsDown>
                    <DialogActions>
                        <Button
                            onClick={this.discardChanges}
                        >
                            Cancel
                        </Button>
                        <Button
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
const mapStateToProps = (state) => {
    return {
        preferences: state.profile.preferences
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updatePreferences: (sexPreference, agePreference) => dispatch(updatePreferences(sexPreference, agePreference))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withMediaQuery(PreferencesDialog));
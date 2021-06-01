import { Dialog, DialogActions, DialogContent, DialogTitle, Hidden, Button, Typography, ButtonGroup, Slide, Divider, Slider } from '@material-ui/core';
import React, { Component } from 'react';
import {firestore} from '../../firebase';
import { connect } from 'react-redux';
import { updatePreferences } from '../../redux/actions/profile/actions';
import {withMediaQuery} from '../HOC';
import './index.css';
import Loading from '../Loading';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class PreferencesDialog extends Component {
    state = {
        loading: false,
        sexPreference: '',
        agePreference: []
    }
    discardChanges = () => {
        this.props.toggleDialog();
    }
    saveChanges = () => {
        this.setState({
            loading: true
        });
        firestore.collection('user').doc('1')
        .update({
            sexPreference: this.state.sexPreference,
            agePreference: this.state.agePreference
        }).then(() => {
            setTimeout(() => {
                this.props.updatePreferences(this.state.sexPreference, this.state.agePreference)
                this.setState({
                    loading: false
                });
                this.props.toggleDialog();
            }, 500);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            
        })
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
            loading: false,
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
                        <Typography variant='h6'>connect with <span style={{fontWeight: 'bold'}}>{this.state.sexPreference}</span></Typography>
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
                        <Typography variant='h6'>between the ages of <span style={{fontWeight: 'bold'}}>{this.state.agePreference[0]}</span> and <span style={{fontWeight: 'bold'}}>{this.state.agePreference[1]}</span></Typography>
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
                            onClick={this.saveChanges}
                            disabled={this.state.loading}
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
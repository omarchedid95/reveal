import React, { Component } from 'react';
import { Badge, Divider, Typography, Grid, IconButton, Chip } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import Reveal from '../Reveal';
import PropTypes from 'prop-types';
import PreferencesDialog from '../PreferencesDialog';
import ProfilePicture from '../ProfilePicture';
import {Prompts} from '../../prompts';
import { connect } from 'react-redux';
import {withAuth} from '../HOC';
import './index.css';

class UserProfile extends Component {
  state = {
    openPreferences: false
  }

  togglePreferencesDialog = () => {
    this.setState((state) => ({
      openPreferences: !state.openPreferences
    }));
  }
  calculateAge = (dob) => {
    const dobDate = new Date(1970, 0, 1);
    dobDate.setSeconds(dob.seconds);
    const ageDiffMs = Date.now() - dobDate.getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  render() {
      const {reveal0, reveal1, reveal2, reveal3} = {...this.props};
      return (
          <div className='user-profile-component-wrapper'>
            <PreferencesDialog
              open={this.state.openPreferences}
              toggleDialog={this.togglePreferencesDialog}
            />
            <header>
              <Typography variant='h4'>Profile</Typography>
              <IconButton onClick={this.togglePreferencesDialog} className='preferences-button'>
                <TuneIcon />
              </IconButton>
            </header>
            <Divider />
            <main>
              <section className='main-profile-section'>
                  <Badge
                      badgeContent='5 minute reveal'
                      color='primary'
                      anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                      }}
                  >
                    <ProfilePicture pictureName='main'/>
                  </Badge>
                  <Typography variant='h5' className='name'>{this.props.firstName}, {this.calculateAge(this.props.dob)}</Typography>
              </section>
              <section className='reveal-section'>
                  <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                      <Reveal reveal={reveal0} prompts={Prompts[0]}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Reveal reveal={reveal1} prompts={Prompts[1]}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Reveal reveal={reveal2} prompts={Prompts[2]}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Reveal reveal={reveal3} prompts={Prompts[3]}/>
                    </Grid>
                  </Grid>
              </section>
              <Divider />
              <section className='pictures-section'>
                <div className='reveal-time'>
                    <Chip
                      size='small'
                      label='revealed on match'
                      color='primary'
                    />
                </div>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <ProfilePicture pictureName='picture1'/>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ProfilePicture pictureName='picture2'/>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ProfilePicture pictureName='picture3'/>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ProfilePicture pictureName='picture4'/>
                  </Grid>
                </Grid>
              </section>
            </main>
          </div>
      )
  }
}
UserProfile.propTypes = {
  reveal0: PropTypes.shape({
    number: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    prompt: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
  }).isRequired,
  reveal1: PropTypes.shape({
    number: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    prompt: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
  }).isRequired,
  reveal2: PropTypes.shape({
    number: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    prompt: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
  }).isRequired,
  reveal3: PropTypes.shape({
    number: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    prompt: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
  }).isRequired,
  firstName: PropTypes.string.isRequired,
  dob: PropTypes.object.isRequired

}
UserProfile.defaultProps = {
  reveal0: {
      number: 0,
      time: -1,
      prompt: 'prompt',
      answer: 'answer'
  },
  reveal1: {
    number: 1,
    time: -1,
    prompt: 'prompt',
    answer: 'answer'
  },
  reveal2: {
    number: 2,
    time: -1,
    prompt: 'prompt',
    answer: 'answer'
  },
  reveal3: {
    number: 3,
    time: -1,
    prompt: 'prompt',
    answer: 'answer'
  },
}
const mapStateToProps = (state) => {
  return {
      firstName: state.profile.firstName,
      dob: state.profile.dob,
      reveal0: state.profile.reveal0,
      reveal1: state.profile.reveal1,
      reveal2: state.profile.reveal2,
      reveal3: state.profile.reveal3
  }
}
export default connect(mapStateToProps, null)(withAuth(UserProfile));
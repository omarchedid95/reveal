import React, { Component } from 'react';
import { Avatar, Badge, Divider, Typography, Grid, IconButton, Chip } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import Reveal from '../Reveal';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import PreferencesDialog from '../PreferencesDialog';
import ProfilePicture from '../ProfilePicture';
import Loading from '../Loading';
import {firestore} from '../../firebase';
import {Prompts} from '../../prompts';
import { connect } from 'react-redux';
import {withAuth} from '../HOC';
import './index.css';
import { initProfile } from '../../redux/actions/profile/actions';

class UserProfile extends Component {
  state = {
    loading: true,
    openPreferences: false
  }
  componentDidMount = () => {
    this.setState({
      loading: true
    });
    firestore.collection('user').doc('1').get()
    .then((doc) => {
      if (!doc.exists) {
        throw Error('User does not exist');
      }
      // Sanitize data first
      const user = doc.data();
      const firstName = user.firstName ? user.firstName : '';
      const lastName = user.lastName ? user.lastName : '';
      const dob = user.dob ? user.dob : new Date();
      const reveal0 = user.reveal0 ? user.reveal0 : {number: 0, time: 1, prompt: '', answer: ''}
      const reveal1 = user.reveal1 ? user.reveal1 : {number: 1, time: 3, prompt: '', answer: ''}
      const reveal2 = user.reveal2 ? user.reveal2 : {number: 2, time: 7, prompt: '', answer: ''}
      const reveal3 = user.reveal3 ? user.reveal3 : {number: 3, time: 10, prompt: '', answer: ''}
      const preferences = {
        sexPreference: user.sexPreference ? user.sexPreference : 'anyone',
        agePreference: user.agePreference ? user.agePreference : [18, 30]
      }
      const profile = {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        reveals: [
          reveal0,
          reveal1,
          reveal2,
          reveal3,
        ],
        preferences: preferences
      }
      this.props.initProfile(profile);
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setTimeout(() => {
        this.setState({
          loading: false
        })
      }, 500);
    })
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
      const reveals = this.props.reveals;
      if (this.state.loading) {
        return (
          <div className='user-profile-component-wrapper'>
            <Loading />
          </div>
        )
      }
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
                    <IconButton className='edit-avatar'>
                      <EditIcon />
                    </IconButton>
                    <Avatar alt='profile-picture' src='https://picsum.photos/200' className='avatar'/>
                  </Badge>
                  <Typography variant='h5'>{this.props.firstName}, {this.calculateAge(this.props.dob)}</Typography>
              </section>
              <section className='reveal-section'>
                  <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                      <Reveal reveal={reveals[0]} prompts={Prompts[0]}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Reveal reveal={reveals[1]} prompts={Prompts[1]}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Reveal reveal={reveals[2]} prompts={Prompts[2]}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Reveal reveal={reveals[3]} prompts={Prompts[3]}/>
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
                    <ProfilePicture />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ProfilePicture />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ProfilePicture />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ProfilePicture />
                  </Grid>
                </Grid>
              </section>
            </main>
          </div>
      )
  }
}
UserProfile.propTypes = {
  reveals: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number.isRequired,
      time: PropTypes.number.isRequired,
      prompt: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired
  }))
}
UserProfile.defaultProps = {
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
      reveals: state.profile.reveals,
      firstName: state.profile.firstName,
      dob: state.profile.dob
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      initProfile: (profile) => dispatch(initProfile(profile))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withAuth(UserProfile));
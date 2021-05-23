import React, { Component } from 'react';
import { Avatar, Badge, Divider, Typography, Grid, IconButton } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import Reveal from '../Reveal';
import { connect } from 'react-redux';
import {Prompts} from '../../prompts';
import PropTypes from 'prop-types';
import './index.css';
import PreferencesDialog from '../PreferencesDialog';

class ProfilePage extends Component {
  state = {
    openPreferences: false
  }
  togglePreferencesDialog = () => {
    this.setState((state) => ({
      openPreferences: !state.openPreferences
    }));
  }
  render() {
      const reveals = this.props.reveals;
      return (
          <div className='profile-page-component-wrapper'>
            <PreferencesDialog
              open={this.state.openPreferences}
              toggleDialog={this.togglePreferencesDialog}
            />
            <header className='header'>
              <Typography variant='h4'>Profile</Typography>
              <IconButton onClick={this.togglePreferencesDialog} className='preferences-button'>
                <TuneIcon />
              </IconButton>
            </header>
            <Divider />
            <section className='profile-section'>
                <Badge
                    badgeContent='5 minute reveal'
                    color='primary'
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Avatar alt='profile-picture' src='https://picsum.photos/200' className='avatar'/>
                </Badge>
                <Typography variant='h5'>Omar, 25</Typography>
            </section>
            <section className='reveal-section'>
                <Grid container spacing={3}>
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
          </div>
      )
  }
}
ProfilePage.propTypes = {
  reveals: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number.isRequired,
      time: PropTypes.number.isRequired,
      prompt: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired
  }))
}
ProfilePage.defaultProps = {
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
export default connect(mapStateToProps, null)(ProfilePage);
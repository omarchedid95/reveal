import { Avatar, Badge, Divider, Typography, Grid } from '@material-ui/core';
import React, { Component } from 'react'
// import ProfilePic from '../../img/Profile.jpeg';
import Reveal from '../Reveal';
import './index.css';

export default class ProfilePage extends Component {
    render() {
        return (
            <div className='profile-page-component-wrapper'>
                <Typography variant='h4' className='page-title'>Profile</Typography>
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
                    <Typography>Score: 875</Typography>
                </section>
                <section className='reveal-section'>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Reveal revealTime={1} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Reveal revealTime={2} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Reveal revealTime={3} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Reveal revealTime={4} />
                      </Grid>
                    </Grid>
                </section>
            </div>
        )
    }
}

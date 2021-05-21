import { Avatar, Badge, Divider, Typography, Grid } from '@material-ui/core';
import React, { Component } from 'react'
import Reveal from '../Reveal';
import RevealDialog from '../RevealDialog';
import { connect } from 'react-redux';
import './index.css';

class ProfilePage extends Component {
    render() {
        const reveals = this.props.reveals;
        return (
            <div className='profile-page-component-wrapper'>
                <RevealDialog />
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
                        <Reveal reveal={reveals[0]} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Reveal reveal={reveals[1]} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Reveal reveal={reveals[2]} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Reveal reveal={reveals[3]} />
                      </Grid>
                    </Grid>
                </section>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
      reveals: state.profile.reveals
  }
}
export default connect(mapStateToProps, null)(ProfilePage);
import { Divider, IconButton, Menu, MenuItem, Tab, Tabs, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Chat from '../Chat';
import MatchProfile from '../MatchProfile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './index.css';

const styles = {
    menuItem: {
        width: '200px'
    }
}
class Match extends Component {
    state = {
        selectedTab: 0,
        menuAnchor: null
    }
    selectTab = (_, tab) => {
        this.setState({
            selectedTab: tab
        });
    }
    openMenu = (e) => {
        this.setState({
            menuAnchor: e.currentTarget
        });
    }
    closeMenu = () => {
        this.setState({
            menuAnchor: null
        });
    }
    render() {
        const selectedMatch = this.props.selectedMatch;
        const partner = selectedMatch.partner;
        return (
            <div className='match-component-wrapper'>
                <header>
                    <Typography variant='h4'>{partner.firstName}</Typography>
                    <IconButton
                        className='match-action-button'
                        onClick={this.openMenu}
                        aria-controls='match-menu'
                        aria-haspopup='true'
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={this.state.menuAnchor}
                        open={Boolean(this.state.menuAnchor)}
                        onClose={this.closeMenu}
                        keepMounted
                        id='match-menu'
                        getContentAnchorEl={null}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                        transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    >
                        <MenuItem style={styles.menuItem}>
                            <Typography >We Met</Typography>
                        </MenuItem>
                        <MenuItem style={styles.menuItem}>
                            <Typography>Unmatch</Typography>
                        </MenuItem>
                        <MenuItem style={styles.menuItem}>
                            <Typography>Report</Typography>
                        </MenuItem>
                    </Menu>
                </header>
                <Divider />
                <main>
                    <Tabs
                        variant='fullWidth'
                        indicatorColor='primary'
                        value={this.state.selectedTab}
                        onChange={this.selectTab}
                        className='tabs'
                    >
                        <Tab label='Chat' />
                        <Tab label='Profile' />
                    </Tabs>
                    {
                        this.state.selectedTab === 0 &&
                        <Chat />
                    }
                    {
                        this.state.selectedTab === 1 &&
                        <MatchProfile />
                    }
                </main>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        selectedMatch: state.matches.selectedMatch
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Match);
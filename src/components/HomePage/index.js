import { Button, Divider, Hidden } from '@material-ui/core'
import React, { Component } from 'react'
import BottomMenu from '../BottomMenu';
import { withAuth } from '../HOC'
import NavBar from '../NavBar';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.logout = props.auth.logout;
    }
    handleLogout = () => {
        this.logout().then(res => console.log(res)).catch(err => console.log(err))
    }
    render() {
        const user = this.props.auth.currentUser;
        return (
            <div>
                <Hidden xsDown>
                    <NavBar />
                </Hidden>
                {
                    JSON.stringify(user)
                }
                <Divider />
                <Button onClick={this.handleLogout}>Logout</Button>

                <Hidden smUp>
                    <BottomMenu />
                </Hidden>
            </div>
        )
    }
}
export default withAuth(HomePage);
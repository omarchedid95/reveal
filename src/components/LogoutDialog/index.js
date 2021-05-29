import { Button, Dialog, DialogActions, DialogTitle, Slide, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import { withAuth } from '../HOC';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class LogoutDialog extends Component {
    render() {
        return (
            <Dialog
                open={this.props.open}
                TransitionComponent={Transition}
                fullWidth
            >
                <DialogTitle disableTypography>
                    <Typography variant='h4' align='center'>Are you sure you want to log out?</Typography>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => this.props.auth.logout()}>Log out</Button>
                    <Button onClick={this.props.toggleDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default withAuth(LogoutDialog);
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Slide, Button, Divider } from '@material-ui/core'
import React, { Component } from 'react';
import './index.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class InstructionsDialog extends Component {
    render() {
        return (
            <Dialog
                open={this.props.open}
                onBackdropClick={this.props.toggleDialog}
                onEscapeKeyDown={this.props.toggleDialog}
                TransitionComponent={Transition}
                fullWidth={true}
                maxWidth='md'
                className='instructions-dialog-component-wrapper'
            >
                <DialogTitle disableTypography>
                    <Typography variant='h4' align='center'>
                        Ground Rules
                    </Typography>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Typography variant='h6'>
                        Welcome to Reveal, here's how it works:
                    </Typography>
                    <ul>
                        <li>
                            <Typography variant='h6'>
                                we set you up on real-time, interactive, and virtual blind dates
                            </Typography>
                        </li>
                         <li>
                            <Typography variant='h6'>
                                after 5 minutes, your date's profile is revealed after you give them feedback
                            </Typography>
                         </li>
                         <li>
                             <Typography variant='h6'>
                                leaving early and not engaging your date will result in a date timeout penalty
                             </Typography>
                         </li>
                         <li>
                             <Typography variant='h6'>
                                 any breach of our terms of use is taken seriously and will result in a permanent ban
                             </Typography>
                         </li>
                     </ul>
                </DialogContent>
                <DialogActions className='actions-section'>
                    <Button variant='outlined' onClick={this.props.toggleDialog}>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default InstructionsDialog;
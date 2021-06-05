import { Paper, Divider, TextField, IconButton } from '@material-ui/core';
import React, { Component } from 'react'
import Message from '../Message';
import SendIcon from '@material-ui/icons/Send';
import './index.css';
import { connect } from 'react-redux';
import { firestore } from '../../firebase';
import Loading from '../Loading';
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            messages: [],
            newMessage: ''
        }
        this.lastMessageRef = React.createRef();
    }
    componentDidMount = () => {
        this.subscribeToChat();
    }
    componentDidUpdate = (prevProps) => {
        if (this.props.selectedMatch.matchId !== prevProps.selectedMatch.matchId) {
            this.unsubscribeFromChat();
            this.setState({
                loading: true,
                messages: [],
                newMessage: ''
            })
            this.subscribeToChat();
        }
    }
    componentWillUnmount = () => {
        this.unsubscribeFromChat();
    }
    subscribeToChat = () => {
        this.unsubscribeFromChat = firestore.collection('message').where('matchId', '==', this.props.selectedMatch.matchId).orderBy('timestamp').onSnapshot((snapshot) => {
            if (snapshot.empty) {
                // No messages
                this.setState({
                    messages: []
                });
            }
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const messageData = change.doc.data();
                    const messageId = change.doc.id;
                    const senderUUID = messageData.senderUUID;
                    const content = messageData.content;
                    const timestamp = messageData.timestamp;
                    const message = {
                        messageId: messageId,
                        content: content,
                        senderUUID: senderUUID,
                        timestamp: timestamp
                    }
                    this.setState((state) => ({
                        messages: [...state.messages, message]
                    }));
                }
            });
            if (this.state.loading) {
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                }, 1500);
            }
        })
    }
    addMessage = () => {
        const message = this.state.message;
        if (message !== '') {
            firestore.collection('message').add({
                content: message,
                senderUUID: '1',
                matchId: this.props.selectedMatch.matchId,
                timestamp: Date.now()
            }).then(() => {
                firestore.collection('match').doc(this.props.selectedMatch.matchId).update({
                    lastMessage: message
                })
                this.setState({
                    message: ''
                })
            }).catch((error) => {

            })
        }
    }
    handleMessageChange = (e) => {
        if (e.target.value !== '\n') {
            this.setState({
                message: e.target.value
            });
        }
    }
    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            if (this.state.message !== undefined) {
                this.addMessage();
            }
        }
    }
    render() {
        const match = this.props.selectedMatch;
        if (this.state.loading) {
            return (
                <div className='chat-component-wrapper'>
                    <Loading />
                </div>
            )
        }
        return (
            <div className='chat-component-wrapper'>
                <section className='messages-section'>
                {
                    this.state.messages.map((message, index) => {
                        if (message.senderUUID === match.partner.uuid) {
                            return <Message key={index} message={message} state='received'/>;
                        } else if (message.senderUUID === '1') {
                            return <Message key={index} message={message} state='sent'/>;
                        } else {
                            return null;
                        }
                    })
                }
                </section>
                <Divider />
                <Paper className='actions-section'>
                    <TextField
                        fullWidth
                        multiline
                        rowsMax={3}
                        onChange={this.handleMessageChange}
                        value={this.state.message}
                        onKeyDown={this.handleKeyDown}
                        autoFocus={true}
                        className='text-field'
                    />
                    <IconButton className='send-button'>
                        <SendIcon />
                    </IconButton>
                </Paper>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        selectedMatch: state.matches.selectedMatch
    }
}
export default connect(mapStateToProps, null)(Chat);
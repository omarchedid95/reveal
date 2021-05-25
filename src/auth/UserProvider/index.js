import React, { Component, createContext } from 'react'
import { auth } from '../../firebase';

export const UserContext = createContext({user: null});
export default class UserProvider extends Component {
    state = {
        user: null
    }
    componentDidMount = () => {
        auth.onAuthStateChanged((user) => {
            this.setState({
                user: user
            });
        })
    }
    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

import { CircularProgress } from '@material-ui/core'
import React, { Component } from 'react'
import './index.css';

export default class Loading extends Component {
    render() {
        return (
            <div className='loading-component-wrapper'>
                <CircularProgress />
            </div>
        )
    }
}

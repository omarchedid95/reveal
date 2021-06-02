import React, { Component } from 'react'
import { connect } from 'react-redux';
import Match from '../Match';
import MatchMaking from '../MatchMaking';
import './index.css';

class Main extends Component {
    render() {
        return (
            <div className='main-component-wrapper'>
                {
                    this.props.selectedMatch === undefined &&
                    <MatchMaking />
                }
                {
                    this.props.selectedMatch !== undefined &&
                    <Match />
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        selectedMatch: state.matches.selectedMatch
    }
}
export default connect(mapStateToProps, null)(Main);

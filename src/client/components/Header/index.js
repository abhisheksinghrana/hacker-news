import React, { Component } from 'react';
import './Header.scss';

export default class HeaderComponent extends Component {

    render() {
        return (
            <div className="header-section">
                <h1 className="heading">Hacker News</h1>
            </div>
        );
    }
}

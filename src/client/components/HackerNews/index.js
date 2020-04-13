import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import HeaderComponent from '../Header';
import NewsListComponent from '../NewsList';
import './HackerNews.scss';

export default class HackerNewsComponent extends Component {
    static defaultProps = {
        pageNum: 0
    };

    static propTypes = {
        pageNum: PropTypes.number.isRequired,
        isLoading: PropTypes.bool.isRequired,
        fetchNews: PropTypes.func.isRequired,
        error: PropTypes.object,
    };

    componentDidMount() {
        const { pageNum, fetchNews } = this.props;
        fetchNews(pageNum);
    }

    render() {
        const { error, isLoading } = this.props;
        if (error) {
            console.log(error.message);
            return <div>Something went wrong</div>;
        } else if (isLoading) {
            return <div>Loading!!!...</div>;
        }
        return (
            <Fragment>
                <HeaderComponent />
                <NewsListComponent {...this.props} />
            </Fragment>
        );
    }
}
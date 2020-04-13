import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import NewsListItemComponent from '../NewsListItem';
import './NewsList.scss';

export default class NewsListComponent extends Component {
    static propTypes = {
        newsList: PropTypes.array.isRequired,
        pageNum: PropTypes.number.isRequired,
        isLoading: PropTypes.bool.isRequired,
        fetchNews: PropTypes.func.isRequired,
        updateVotes: PropTypes.func.isRequired,
        hideNews: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.fetchMore = this.fetchMore.bind(this);
    }

    fetchMore() {
        const { pageNum, isLoading, fetchNews } = this.props;
        if (!isLoading) {
            fetchNews(pageNum);
        }
    }

    render() {
        const { newsList, updateVotes, hideNews } = this.props;

        return (
            <Fragment>
                <div className="news-list-section">
                    <table className="news-list">
                        <tbody>
                            {newsList.map((item, index) => (
                                <NewsListItemComponent
                                    key={index}
                                    index={index}
                                    item={item}
                                    updateVotes={updateVotes}
                                    hideNews={hideNews}
                                />
                            ))}
                        </tbody>
                    </table>
                    <span className="more-btn" onClick={this.fetchMore}> More </span>
                </div>
            </Fragment>
        );
    }
}
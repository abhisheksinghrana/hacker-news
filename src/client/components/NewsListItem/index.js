import React from 'react';
import PropTypes from 'prop-types';

import { timeSince } from '../../services/utils';
import './NewsListItem.scss';

export default class NewsListItemComponent extends React.Component {
    static propTypes = {
        updateVotes: PropTypes.func,
        hideNews: PropTypes.func,
        index: PropTypes.number,
        item: PropTypes.object.isRequired,
    };
    constructor(props) {
        super(props);
        this.getHostname = this.getHostname.bind(this);
        this.incrementUpvote = this.incrementUpvote.bind(this);
        this.hideNews = this.hideNews.bind(this);
    }

    getHostname = url => {
        let hostname = '';
        if (url) {
            if (url.includes('www.')) {
                hostname = url.split('www.')[1].split('/')[0];
            }
            return hostname;
        }
    };

    incrementUpvote = () => {
        this.props.updateVotes(this.props.index);
    };

    hideNews = () => {
        this.props.hideNews(this.props.index);
    }

    render() {
        let {
            num_comments,
            points,
            title,
            url,
            author,
            created_at,
        } = this.props.item;
        const site = this.getHostname(url) || 'news.ycombinator.com';
        created_at = created_at ? new Date(created_at) : '';

        return (
            <tr className="news-list-item-section">
                <td className="comments-count">{num_comments || 0}</td>
                <td className="upvote-count">{points || 0}</td>
                <td className="upvote-icon" onClick={this.incrementUpvote}>
                    <div className="vote-arrow" title="upvote">
                    </div>
                </td>
                <td className="details">
                    <span className="title">{title || 'Title Unavailable'}</span>
                    <span className="link-domain">({site})</span>
                    <span className="author"><span className="by">by</span> {author}</span>
                    <span className="created">{timeSince(created_at)}</span>
                    <span className="hide-btn" onClick={this.hideNews}>[ hide ]</span>
                </td>
            </tr>
        );
    }
}
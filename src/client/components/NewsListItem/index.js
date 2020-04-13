import React from 'react';
import PropTypes from 'prop-types';
import './NewsListItem.scss';

export default class NewsListItemComponent extends React.Component {
    static propTypes = {
        updateVotes: PropTypes.func,
        index: PropTypes.number,
        item: PropTypes.object.isRequired,
    };
    constructor(props) {
        super(props);
        this.getHostname = this.getHostname.bind(this);
        this.incrementUpvote = this.incrementUpvote.bind(this);
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

    render() {
        const {
            num_comments,
            points,
            title,
            url,
            author,
            created_at,
        } = this.props.item;
        const site = this.getHostname(url) || 'news.ycombinator.com';
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
                    <span className="created">{created_at}</span>
                    <span className="hide-btn">[ hide ]</span>
                </td>
            </tr>
        );
    }
}
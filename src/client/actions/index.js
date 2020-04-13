import hackerNewsService from '../services/hackerNewsService';

export const FETCH_NEWS = 'FETCH_NEWS';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_ERROR = 'FETCH_NEWS_ERROR';
export const UPDATE_NEWS_VOTES = 'UPDATE_NEWS_VOTES';
export const HIDE_NEWS = 'HIDE_NEWS';

import { getFromLocalStorage } from '../services/utils';

export const fetchNews = data => ({
    type: FETCH_NEWS,
    payload: data,
});

export const fetchNewsSuccess = data => ({
    type: FETCH_NEWS_SUCCESS,
    payload: data,
});

export const fetchNewsError = data => ({
    type: FETCH_NEWS_ERROR,
    payload: data
});


export const fetchHackerNews = pageNum => {
    return dispatch => {
        dispatch(fetchNews(pageNum));
        return hackerNewsService.getHackerNews(pageNum)
            .then(news => {
                const upvotedNews = getFromLocalStorage("upvotedNews");
                if (upvotedNews && upvotedNews.length) {
                    const tempObj = {};
                    for (const item of upvotedNews) {
                        tempObj[item.objectID] = item;
                    }
                    for (const item of news.hits) {
                        if (tempObj[item.objectID]) {
                            item.points = tempObj[item.objectID]['points'] || item.points;
                        }
                    }
                }
                const newsData = {
                    data: news.hits,
                    pageNum: news.page
                }
                dispatch(fetchNewsSuccess(newsData));
                return newsData;
            })
            .catch(err => dispatch(fetchNewsError(err)));
    };
};

export const updateVote = id => ({
    type: UPDATE_NEWS_VOTES,
    payload: id,
});

export const hideNews = id => ({
    type: HIDE_NEWS,
    payload: id,
});
import {
    FETCH_NEWS,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_ERROR,
    UPDATE_NEWS_VOTES,
    HIDE_NEWS
} from '../actions';
import { setToLocalStorage, getFromLocalStorage } from '../services/utils';

const initialState = () => ({
    newsList: [],
    pageNum: 0,
    error: null,
    isLoading: true,
    votes: 0,
});

export default (state = initialState(), action) => {
    switch (action.type) {
        case FETCH_NEWS:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case FETCH_NEWS_SUCCESS:
            return {
                ...state,
                newsList: [...state.newsList, ...action.payload.data],
                isLoading: false,
                pageNum: action.payload.pageNum + 1,
            };
        case FETCH_NEWS_ERROR:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false,
            };
        case UPDATE_NEWS_VOTES:
            const newsList = [...state.newsList];
            if (newsList[action.payload]) {
                newsList[action.payload].points += 1;
                const upvotedNews = getFromLocalStorage("upvotedNews");
                if (upvotedNews && upvotedNews.length) {
                    let flag = false;
                    for (const item of upvotedNews) {
                        if (item.objectID === newsList[action.payload]['objectID']) {
                            item.points = newsList[action.payload].points;
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        setToLocalStorage("upvotedNews", [...upvotedNews, newsList[action.payload]]);
                    } else {
                        setToLocalStorage("upvotedNews", upvotedNews);
                    }
                } else {
                    setToLocalStorage("upvotedNews", [newsList[action.payload]]);
                }
            }
            return {
                ...state,
                newsList
            };
        case HIDE_NEWS:
            const temp = [...state.newsList];
            if (state.newsList[action.payload]) {
                const upvotedNews = getFromLocalStorage("hiddenNews");
                if (upvotedNews && upvotedNews.length) {
                    setToLocalStorage("hiddenNews", [...upvotedNews, state.newsList[action.payload]]);
                } else {
                    setToLocalStorage("hiddenNews", [state.newsList[action.payload]]);
                }
                let index = 0
                for (; index < temp.length; index++) {
                    if (temp[index].objectID === state.newsList[action.payload]['objectID']) {
                        break;
                    }
                }
                temp.splice(index, 1);
            }
            return {
                ...state,
                ...{ newsList: temp }
            };
        default:
            return state;
    }
};
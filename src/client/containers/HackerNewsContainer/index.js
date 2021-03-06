import { connect } from 'react-redux';
import { fetchHackerNews, updateVote, hideNews } from '../../actions';
import HackerNewsComponent from '../../components/HackerNews';

const mapStateToProps = state => ({
    newsList: state.hackerNews.newsList,
    isLoading: state.hackerNews.isLoading,
    error: state.hackerNews.error,
    pageNum: state.hackerNews.pageNum,
});

const mapDispatchToProps = dispatch => ({
    fetchNews: pageNum => dispatch(fetchHackerNews(pageNum)),
    updateVotes: id => dispatch(updateVote(id)),
    hideNews: id => dispatch(hideNews(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HackerNewsComponent);
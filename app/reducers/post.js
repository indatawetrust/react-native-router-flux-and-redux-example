import { ActionConst } from 'react-native-router-flux';

const initialState = {
  posts: [],
  isFetching: false,
  nextPageFetching: false,
  isDone: false,
  total: 0,
  page: 1,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    // get posts
    case 'GET_POST_PENDING':
      return {
        ...state,
        isFetching: true,
      };

    case 'GET_POST_FULFILLED':
      return {
        ...state,
        posts: action.payload.body.posts,
        total: action.payload.body.total,
        isDone: true,
        isFetching: false,
      };

    case 'GET_POST_REJECTED':
      return {
        ...state,
        posts: action.payload.body.posts
      };

    // next page
    case 'NEXT_PAGE_PENDING':
      return {
        ...state,
        nextPageFetching: true,
      };

    case 'NEXT_PAGE_FULFILLED':
      return {
        ...state,
        nextPageDone: true,
        posts: state.posts.concat(action.payload.body.posts),
        total: --state.total,
        page: ++state.page,
      };

    case 'NEXT_PAGE_REJECTED':
      return {
        ...state,
      };

    default:
      return state;

  }
}

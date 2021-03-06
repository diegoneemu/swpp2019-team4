import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: {
    is_authenticated: null,
  },
  buildingList: [],
  timetable: { course: [] },
  timetable_friend: { course: [] },
  timetables: [],
  courses: [],
  rated_course: [],
  unrated_course: [],
  changed_courses: [],
  friend: [],
  friend_send: [],
  friend_receive: [],
  search: {
    exist: false,
    status: '',
    username: '',
  },
  search_auto_complete: false,
  constraints: {
    days_per_week: 5,
    credit_min: 15,
    credit_max: 18,
    major_min: 1,
    major_max: 18,
  },
  time_pref_table: [],
  recommended_timetables: [],
  searched: false,
  ratedSearched: false,
  unratedSearched: false,
  lastPage: 0,
};

const reducer = (state = initialState, action) => {
  const stateFriend = state.friend;
  const stateFriendSend = state.friend_send;
  let stateSearch;
  switch (action.type) {
    case actionTypes.GET_AUTH:
      return { ...state, user: { is_authenticated: action.is_authenticated } };
    case actionTypes.GET_USER: {
      const newUser = action.user;
      newUser.is_authenticated = true;
      return { ...state, user: newUser };
    }
    case actionTypes.GET_TIMETABLE:
      return { ...state, timetable: action.timetable };
    case actionTypes.GET_TIMETABLE_FRIEND:
      return { ...state, timetable_friend: action.timetable };
    case actionTypes.POST_TIMETABLE:
      return { ...state, timetables: state.timetables.concat(action.timetable) };
    case actionTypes.POST_COURSE_TEMP: {
      const course = state.timetable.course.concat(action.course);
      return { ...state, timetable: { ...state.timetable, course } };
    }
    case actionTypes.DELETE_COURSE_TEMP: {
      const course = state.timetable.course.filter((item) => !(item.id === action.course.id && item.temp === true));
      return { ...state, timetable: { ...state.timetable, course } };
    }
    case actionTypes.POST_COURSE:
      return { ...state, timetable: action.timetable };
    case actionTypes.POST_CUSTOM_COURSE:
      return { ...state, timetable: action.timetable };
    case actionTypes.EDIT_TIMETABLE:
      return {
        ...state,
        timetables: state.timetables.map((timetable) => (timetable.id
          === action.timetable.id ? action.timetable : timetable)),
        timetable: action.timetable,
      };
    case actionTypes.DELETE_TIMETABLE:
      return { ...state, timetables: state.timetables.filter((timetable) => timetable.id !== action.deletedTimetable) };
    case actionTypes.GET_COURSES: {
      const newcourses = state.courses.concat(action.courses);
      return { ...state, courses: newcourses };
    }
    case actionTypes.RESET_COURSES:
      return {
        ...state, courses: [],
      };
    case actionTypes.SET_COURSES:
      return {
        ...state, courses: action.course_list, searched: true,
      };
    case actionTypes.GET_FRIEND:
      return {
        ...state,
        friend: action.user.friend,
        friend_send: action.user.friend_send,
        friend_receive: action.user.friend_receive,
      };

    case actionTypes.GET_USER_SEARCH:
      if (action.exist) {
        stateSearch = { exist: action.exist, status: action.status, username: action.user.username };
        if (action.status === 'FRIEND') {
          stateFriend.push(action.user);
          return {
            ...state,
            search: stateSearch,
            friend: stateFriend,
            friend_receive: state.friend_receive.filter((user) => user.id !== action.user.id),
          };
        }
        stateFriendSend.push(action.user);
        return { ...state, search: stateSearch, friend_send: stateFriendSend };
      }
      stateSearch = { exist: action.exist, status: action.status, username: '' };
      return { ...state, search: stateSearch };

    case actionTypes.RECEIVE_FRIEND:
      stateFriend.push(action.user);
      return {
        ...state,
        friend_receive: state.friend_receive.filter((user) => user.id !== action.user.id),
        friend: stateFriend,
      };

    case actionTypes.DELETE_FRIEND:
      return { ...state, friend: state.friend.filter((user) => user.id !== action.user_id) };

    case actionTypes.REJECT_FRIEND:
      return { ...state, friend_receive: state.friend_receive.filter((user) => user.id !== action.user_id) };

    case actionTypes.CANCEL_FRIEND:
      return { ...state, friend_send: state.friend_send.filter((user) => user.id !== action.user_id) };

    case actionTypes.GET_TIMETABLES:
      return { ...state, timetables: action.timetables };

    case actionTypes.POST_MAIN_TIMETABLE: {
      const newuser = state.user;
      newuser.timetable_main = action.timetable_main;
      return { ...state, user: newuser };
    }
    case actionTypes.GET_RECOMMEND: {
      return { ...state, recommended_timetables: action.timetables };
    }
    case actionTypes.GET_LAST_PAGE: {
      return { ...state, lastPage: action.lastPage };
    }
    case actionTypes.EDIT_CONSTRAINTS: {
      return { ...state, constraints: action.constraints };
    }
    case actionTypes.EDIT_TIME_PREF: {
      return { ...state, time_pref_table: action.time_pref_table };
    }
    case actionTypes.GET_RATED_COURSE: {
      const newlist = state.rated_course.concat(action.course_list);
      return { ...state, rated_course: newlist };
    }
    case actionTypes.GET_UNRATED_COURSE: {
      const newlist = state.unrated_course.concat(action.course_list);
      return { ...state, unrated_course: newlist };
    }
    case actionTypes.RESET_RECOMMEND_COURSES:
      return { ...state, rated_course: [], unrated_course: [] };
    case actionTypes.SET_RATED_COURSE:
      return { ...state, rated_course: action.course_list, ratedSearched: true };
    case actionTypes.SET_UNRATED_COURSE:
      return { ...state, unrated_course: action.course_list, unratedSearched: true };
    case actionTypes.PUT_COURSEPREF_TEMP: {
      const ratedCourse = state.rated_course.map(
        ({ id, score, ...item }) => (
          id === action.coursepref.id ? {
            id, score: action.coursepref.score, ...item,
          } : { id, score, ...item }
        ),
      );
      const unratedCourse = state.unrated_course.map(
        ({ id, score, ...item }) => (
          id === action.coursepref.id ? {
            id, score: action.coursepref.score, ...item,
          } : { id, score, ...item }
        ),
      );
      return {
        ...state, rated_course: ratedCourse, unrated_course: unratedCourse,
      };
    }
    case actionTypes.DELETE_COURSEPREF_TEMP: {
      const ratedCourse = state.rated_course.map(
        ({ id, score, ...item }) => (
          id === action.coursepref.id ? {
            id, score: '-', ...item,
          } : { id, score, ...item }
        ),
      );
      const unratedCourse = state.unrated_course.map(
        ({ id, score, ...item }) => (
          id === action.coursepref.id ? {
            id, score: '-', ...item,
          } : { id, score, ...item }
        ),
      );
      return {
        ...state, rated_course: ratedCourse, unrated_course: unratedCourse,
      };
    }
    case actionTypes.SET_SEARCHABLE:
      return { ...state, searched: false };
    case actionTypes.SET_RATED_SEARCHABLE:
      return { ...state, ratedSearched: false };
    case actionTypes.SET_UNRATED_SEARCHABLE:
      return { ...state, unratedSearched: false };
    case actionTypes.SEARCH_BUILDINGS:
      return { ...state, buildingList: action.buildingList, search_auto_complete: action.buildingList.length === 1 };
    case actionTypes.AUTO_COMPLETE:
      return { ...state, search_auto_complete: false };
    default:
      return { ...state };
  }
};

export default reducer;

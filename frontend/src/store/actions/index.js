import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

export {
  postSignup,
  postSignin,
  getUser,
  putUser,
  getSignout,
  getVerify,
  getFriend,
  deleteFriend,
  rejectFriend,
  cancelFriend,
  postUserSearch,
  receiveFriend,
  getCourses,
  resetCourse,
  postCourse,
  getTimetable,
  editTimetable,
  getTimetables,
  getTimetableFriend,
  postTimetable,
  postMainTimetable,
  postCustomCourse,
  deleteCourse,
  deleteTimetable,
  getRatedCourse,
  getUnratedCourse,
  getExceptCourse,
  resetCourseScore,
  putCoursepref,
  putCourseprefTemp,
} from './user';

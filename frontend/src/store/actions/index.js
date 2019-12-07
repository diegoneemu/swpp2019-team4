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
  setCourses,
  postCourse,
  postCourseTemp,
  deleteCourseTemp,
  getTimetable,
  editTimetable,
  editCourse,
  getTimetables,
  getTimetableFriend,
  postTimetable,
  postMainTimetable,
  postCustomCourse,
  deleteCourse,
  deleteTimetable,
  getRecommend,
  editConstraints,
  putConstraints,
  putTimePref,
  getRatedCourse,
  getUnratedCourse,
  setRatedCourse,
  setUnratedCourse,
  putCoursepref,
  putCourseprefTemp,
  setSearchable,
  setRatedSearchable,
  setUnratedSearchable,
  searchBuildings,
} from './user';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

export {
  setSendStatus,
  postSignup,
  postSignin,
  getUser,
  getSignout,
  getVerify,
  getFriend,
  postUserSearch,
} from './user';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import FrontBar from '../../components/FrontBar/FrontBar';
import * as actionCreators from '../../store/actions/index';

import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirm: '',
      username: '',
      grade: '',
      department: '',

      email_valid: true,
      password_valid: true,
      password_confirm_valid: true,
      username_valid: true,
      grade_valid: true,

      email_notice: '',
      password_notice: '',
      password_confirm_notice: '',
      username_notice: '',
      grade_notice: '',

      is_waiting: false,
      is_finished: false,
    };
  }

  componentDidMount() {
    this.props.onGetUser();
  }

  handleSignup(email, password, passwordConfirm, username, department, grade) {
    const regexValid = /^[^@\s]+@[^.@\s]+[.][^@\s]+$/.exec(email);
    const emailValid = (regexValid !== null);
    const passwordValid = (password.length >= 8 && password.length <= 32);
    const passwordConfirmValid = (password === passwordConfirm);
    const usernameValid = (username.length >= 1 && username.length <= 16);
    const gradeValid = (grade >= 1946 && grade <= 2020);
    const sendValid = emailValid && passwordValid && passwordConfirmValid && usernameValid && gradeValid;

    const emailNotice = (emailValid ? '' : '이메일 형식이 올바르지 않습니다.');
    const passwordNotice = (passwordValid ? '' : '비밀번호는 8자 이상 32자 이하로 구성되어야 합니다.');
    const passwordConfirmNotice = (passwordConfirmValid ? '' : '비밀번호와 비밀번호 확인은 같은 값을 가져야 합니다.');
    const usernameNotice = (usernameValid ? '' : '이름은 1자 이상 32자 이하로 구성되어야 합니다.');
    const gradeNotice = (gradeValid ? '' : '입학년도는 1946이상 2020이하의 정수여야 합니다.');

    this.setState((prevState) => ({
      ...prevState,
      email_valid: emailValid,
      password_valid: passwordValid,
      password_confirm_valid: passwordConfirmValid,
      username_valid: usernameValid,
      grade_valid: gradeValid,
      email_notice: emailNotice,
      password_notice: passwordNotice,
      password_confirm_notice: passwordConfirmNotice,
      username_notice: usernameNotice,
      grade_notice: gradeNotice,
    }));
    if (sendValid) {
      this.setState((prevState) => ({ ...prevState, is_waiting: true }));
      this.props.onPostSignup(email, password, username, department, grade)
        .then(() => this.setState((prevState) => ({
          ...prevState,
          is_finished: true,
        })))
        .catch(() => this.setState((prevState) => ({
          ...prevState,
          email_valid: false,
          is_waiting: false,
          email_notice: '이미 존재하는 이메일입니다.',
        })));
    }
  }

  goToLogin() {
    this.props.history.push('/login');
  }

  render() {
    if (this.props.storedUser.is_authenticated === true) {
      return (
        <Redirect to="/main" />
      );
    }

    if (this.state.is_finished) {
      return (
        <div className="Signup background">
          <FrontBar />
          <div className="fixed-top h-100 d-flex flex-column justify-content-center align-items-center">
            <div className="oi oi-envelope-open text-dark my-3" style={{ fontSize: '5em' }} />
            <h4>
              {' '}
              <b>{this.state.email}</b>
            </h4>
            <h4> 인증 메일을 보냈습니다.</h4>
            <button
              className="btn btn-outline-dark my-3"
              type="button"
              id="signup-finish-button"
              onClick={() => this.goToLogin()}
            >
  로그인 화면으로 돌아가기
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="Signup background">
        <FrontBar />
        <div className="col-4 offset-4">
          <form>
            <div className="form-group">
              <input
                className={`form-control ${this.state.email_valid ? '' : 'is-invalid'}`}
                type="text"
                id="email-input"
                placeholder="이메일"
                value={this.state.email}
                onChange={(event) => this.setState({ email: event.target.value })}
              />
              <div className="small text-left violation-notice feedback">{this.state.email_notice}</div>
              <input
                className={`form-control ${this.state.password_valid ? '' : 'is-invalid'}`}
                type="password"
                id="password-input"
                placeholder="비밀번호"
                value={this.state.password}
                onChange={(event) => this.setState({ password: event.target.value })}
              />
              <div className="small text-left violation-notice feedback">{this.state.password_notice}</div>
              <input
                className={`form-control ${this.state.password_confirm_valid ? '' : 'is-invalid'}`}
                type="password"
                id="password-confirm-input"
                value={this.state.password_confirm}
                placeholder="비밀번호 확인"
                onChange={(event) => this.setState({ password_confirm: event.target.value })}
              />
              <div className="small text-left violation-notice feedback">{this.state.password_confirm_notice}</div>
              <input
                className={`form-control ${this.state.username_valid ? '' : 'is-invalid'}`}
                type="text"
                id="username-input"
                value={this.state.username}
                placeholder="이름"
                onChange={(event) => this.setState({ username: event.target.value })}
              />
              <div className="small text-left violation-notice feedback">{this.state.username_notice}</div>
              <input
                className="form-control"
                type="text"
                id="department-input"
                value={this.state.department}
                placeholder="학과"
                onChange={(event) => this.setState({ department: event.target.value })}
              />
              <div className="small text-left violation-notice feedback" />
              <input
                className={`form-control ${this.state.grade_valid ? '' : 'is-invalid'}`}
                type="number"
                id="grade-input"
                value={this.state.grade}
                placeholder="입학년도"
                onChange={(event) => this.setState({ grade: event.target.value })}
              />
              <div className="small text-left violation-notice feedback">{this.state.grade_notice}</div>
            </div>
            <div className="row m-0">
              <button
                className="btn btn-outline-dark col mr-1"
                type="button"
                id="to-login-button"
                onClick={() => this.goToLogin()}
              >
뒤로가기
              </button>
              <button
                className="btn btn-dark col ml-1"
                type="button"
                id="confirm-signup-button"
                disabled={this.state.is_waiting}
                onClick={() => this.handleSignup(this.state.email,
                  this.state.password,
                  this.state.password_confirm,
                  this.state.username,
                  this.state.department,
                  this.state.grade)}
              >
가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  onGetUser: PropTypes.func.isRequired,
  onPostSignup: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  storedUser: PropTypes.shape({
    is_authenticated: PropTypes.bool,
  }).isRequired,
};
const mapStateToProps = (state) => ({
  storedUser: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  onGetUser: () => dispatch(actionCreators.getUser()),
  onPostSignup: (email, password, username, department, grade) => dispatch(
    actionCreators.postSignup(email, password, username, department, grade),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

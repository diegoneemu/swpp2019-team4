import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../../store/actions/index';

class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    componentDidMount(){
        this.props.onGetUser();
    }

    handleLogin(){
        this.props.onLogin(this.state.email, this.state.password)
            .then(() => {
                if(!this.props.storedUser.is_authenticated) {
                    alert('이메일 또는 비밀번호가 잘못되었습니다.');
                }
            })
            .catch(() => {});
    }

    render() {
        if(this.props.storedUser.is_authenticated) {
            return (
                <Redirect to='/main'/>
            );
        }
        return (
            <div className='Login'>
                <input type='text' id='email-input' value={this.state.email} placeholder='Email'
                    onChange={(event) => this.setState({email: event.target.value})}/>
                <input type='password' id='pw-input' value={this.state.pasword} placeholder='Password'
                    onChange={(event) => this.setState({password: event.target.value})}/>
                <button id='login-button' onClick={() => this.handleLogin()}>로그인</button>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        storedUser: state.user.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) =>
            dispatch(actionCreators.postSignin(email, password)),
        onGetUser: () =>
            dispatch(actionCreators.getUser()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
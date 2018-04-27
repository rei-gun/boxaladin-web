import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import jwt from 'jsonwebtoken'
import IconUser from '../asset/Login/user.svg'

import { loginAction, logoutAction, getPhoneNumbers } from '../actions/'

const URL = 'http://localhost:3000/'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      username: ''
    }
  }

  logIn(e) {
    e.preventDefault()
    this.props.setIsLoading(true)
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_HOST}/signin`,
			headers: {
        key: process.env.REACT_APP_KEY
      },
      data: {
        email: this.state.email,
        password: this.state.password
      },
		})
    .then(({data}) => {
      if (data.message === 'username not found') {
        alert(data.message)
      } else if (data.message === 'password incorrect') {
        alert(data.message)
      } else if (data.message === 'login success') {
        localStorage.setItem('token', localStorage.getItem('token') || data.token)

        const decoded = jwt.verify(data.token, 'satekambing')
        this.props.loginAction(decoded)
        this.props.getPhoneNumbers()
      }
    })
    .catch(e => {
      console.log(e)
    })
  }

  logInInputHandler(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    return (
      <div className="Login">
        <div className="Login__container">

          <form className="form-login" onSubmit={ (e) => this.logIn(e)}>

          <div className="Login__container__row1 mx-auto">
            <div className="Login__container__row1">
              <img src={IconUser} alt="IconUser" className="Login__container__icon rounded mx-auto d-block" />
            </div>

            <div className="Login__container__form">
                <div className="form-group">
                  <label>Email address</label>
                  <input name="username" type="username" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter your email or username here" onChange={ (e) => this.logInInputHandler(e) }/>
                  <small id="emailHelp" className="form-text text-muted Login__container__small">We'll never share your email or username with anyone else.</small>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input name="password" type="password"  className="form-control" id="exampleInputPassword" aria-describedby="passwordHelp" placeholder="Enter your password" onChange={ (e) => this.logInInputHandler(e) }/>
                </div>
            </div>

          </div>

          <div className="Login__container__row2">
            <div className="Login__container__button">
              <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
              </div>
              <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-lg btn-block">Connect with Social Account</button>
              </div>
            </div>
          </div>

          <div className="Login__container__row3">
            <label className="Login__container__label">Don't have an account? <a href="/signup"> Sign up</a></label>
          </div>

          </form>

        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.userReducer.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (payload) => dispatch(loginAction(payload)),
    logoutAction: () => dispatch(logoutAction()),
    getPhoneNumbers: () => dispatch(getPhoneNumbers())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Login)

export default connectComponent

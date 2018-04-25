import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom'

import { loginAction, logoutAction, getPhoneNumbers, setModalLogin, setModalRegister, setIsLoading } from '../../../../actions'
import { getUser } from '../../../../actions/userAction'

import Loading from '../../Loading/'

const URL = `${process.env.REACT_APP_API_HOST}/`

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      email: '',
      notif: ''
    }
  }

  logIn(e) {
    e.preventDefault()
    this.props.setIsLoading(true)
    
    axios.post(URL + 'signin', {
      email: this.state.email,
      password: this.state.password
    })
    .then(({data}) => {
      this.props.setIsLoading(false)
      if (data.message === 'username or email not found') {
        console.log(data)
        this.setState({
          notif: "Email Tidak Terdaftar, Silakan Register Jika Belum Memiliki Akun",
        })
      } else if (data.message === 'password incorrect') {
        console.log(data)
        this.setState({
          notif: "Password Yang Anda Masukkan Salah",
        })
      } else if (data.message === 'login success') {
        console.log(data)
        localStorage.setItem('token', data.token)

        // const decoded = jwt.verify(data.token, 'satekambing')

        this.props.loginAction()
        this.props.getUser()
        this.props.getPhoneNumbers()
        this.props.setModalLogin(false)
        this.props.setModalRegister(false)
        this.props.history.push('/')
      }
    })
    .catch(e => {
      console.log(e)
    })
  }

  logInInputHandler(e) {
    this.setState({ [e.target.name]: e.target.value.trim() })
  }

  logInInputToLowerHandler(e) {
    this.setState({ [e.target.name]: e.target.value.trim().toLowerCase() })
  }

  render () {
    console.log('Login State:', this.state);
    console.log('Login Props:', this.props);
    return (
      <div className="Login">

        <Loading isLoading={ this.props.isLoading } />
        
        <form className="form-horizontal" onSubmit={ (e) => this.logIn(e)}>

          <div>
            <label className="Login__Title1">
              Anda harus masuk terlebih dahulu untuk melihat harga
            </label>
          </div>

          <div>
            <label className="Login__Title2">
              Masuk
            </label>
          </div>

          <div className="form-group Login__Form">
            <label>Alamat Email</label>
            <input name="email" type="email" className="form-control inputz" aria-describedby="emailHelp" placeholder="Masukkan Email" onChange={ (e) => this.logInInputToLowerHandler(e) }/>
          </div>

          <div className="form-group Login__Form">
            <label>Password</label>
            <input name="password" type="password"  className="form-control inputz" aria-describedby="passwordHelp" placeholder="Masukkan Password" onChange={ (e) => this.logInInputHandler(e) }/>
            <label className="Login__LupaPassword"><a className="lupapass" href="/requestresetpassword">lupa password?</a></label>
            {/* <Link to="/requestresetpassword" className="Login__LupaPassword lupapass">lupa password?</Link> */}
          </div>

          <label className="alert">{this.state.notif}</label>
          <br/>

          <div className="form-group">
              <Button type="submit" className="Login__ButtonLogin">Login</Button>
          </div>

          <label className="Login__Daftar">Belum memiliki akun? daftar <text onClick={() => this.openRegisterModal()} className="Login__Link"> disini</text></label>

        </form>
      </div>
    )
  }

  openRegisterModal() {
    this.props.setModalLogin(!this.props.modalLogin)
    this.props.setModalRegister(!this.props.modalRegister)
  }

}

const mapStateToProps = (state) => {
  return {
    isLogin: state.userReducer.isLogin,
    dataUser: state.userReducer.dataUser,
    modalLogin: state.modalReducer.modalLogin,
    modalRegister: state.modalReducer.modalRegister,
    isLoading: state.loadingReducer.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: () => dispatch(loginAction()),
    logoutAction: () => dispatch(logoutAction()),
    getPhoneNumbers: () => dispatch(getPhoneNumbers()),
    getUser: () => dispatch(getUser()),
    setModalLogin: (payload) => dispatch(setModalLogin(payload)),
    setModalRegister: (payload) => dispatch(setModalRegister(payload)),
    setIsLoading: (bool) => dispatch(setIsLoading(bool)),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Login)

export default withRouter(connectComponent)
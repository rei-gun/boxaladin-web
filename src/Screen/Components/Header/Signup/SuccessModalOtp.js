import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {setModalRegister, setIsLoading, loginAction } from '../../../../actions/';
import Modal from 'react-modal';
import {Button, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import TextInput from 'react-otp';

class SuccessModalOtp extends Component {
  _toggle() {
    const {loginAction, setModalRegister} = this.props;
    loginAction();
    setModalRegister(false);
  }

  render() {
  let {open} = this.props;
    return (
      <Modal ariaHideApp="false" isOpen={open} toggle={() => this._toggle()} className='modal__otp' >
          <div className="modal__otp__container">
          <ModalHeader toggle={() => this._toggle()} className="modal__otp__header"></ModalHeader>
            <div className="modal__otp__content">
              <h1 className="resetPassword__textSuccess">Nomor kamu berhasil di verifikasi.</h1>
              <h1 className="resetPassword__textSuccess">SELAMAT BERBELANJA!</h1>
              <div className="resetPassword__img">
                <img src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/checked.svg" alt="Check Icon"/>
              </div>
              <div className="resetPassword__wrapper__about">
                <div className="resetPassword__textWarning">
                  <h1>INGAT PULSA ? INGAT</h1>
                </div>
                <div className="resetPassword__image">
                  <img className="resetPassword__logo" src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/logoTextOnly.png" alt="Boxaladin"/>
                </div>
              </div>

            </div>
          </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.userReducer.isLogin,
    modalRegister: state.modalReducer.modalRegister,
    isLoading: state.loadingReducer.isLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginAction: () => dispatch(loginAction()),
    setModalRegister: (payload) => dispatch(setModalRegister(payload)),
    setIsLoading: (payload) => dispatch(setIsLoading(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessModalOtp);
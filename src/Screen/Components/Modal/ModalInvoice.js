//@flow
import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import axios from 'axios';
import FormatRupiah from '../../../utils/formatRupiah'
import productName from '../../../utils/splitProduct'


export default class ModalInvoice extends Component <{}> {

  constructor(props) {
    super(props)
    this.state = {
      invoice: ''
    }
  }

  static propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
    text: PropTypes.string,
  }


  render() {
    console.log('props', this.props.invoice)
    return (
      <Modal ariaHideApp={false} isOpen={this.props.isOpen} className="modal__check">
        <div className="modal__invoice__container">
          <div className="modal__check__container__header">
            <button className="modal__check__button" onClick={this.props.toggle}>X</button>
          </div>
          <div className="modal__invoice__header">
            <label className="modal__invoice__header__label">Detail Tagihan</label>
          </div>
          <div className="modal__invoice__container__detail">
            <label className="modal__invoice__detailText">{this.productName()}</label>
            <label className="modal__check__label">{this.formatRupiah()}</label>
          </div>
      </div>
      </Modal>
    )
  }

  formatRupiah() {
    return this.props.invoice.payment && (
      FormatRupiah(this.props.invoice.payment.amount)
    )
  }

  productName() {
    if (!this.props.invoice) {
      return null
    } else {
      return productName(this.props.invoice.description)
    }
  }

}
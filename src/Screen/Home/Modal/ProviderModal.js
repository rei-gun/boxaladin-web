import React, { Component } from 'react';
import Modal from 'react-modal'
import { ModalHeader} from 'reactstrap'

class ProviderModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 

    }
  }
  render() { 
    return ( 
      <Modal isOpen={this.props.open} className="modal__provider">
          <div>
          <ModalHeader toggle={this.props.buttonToggle} className="modal__provider__header"></ModalHeader>
          </div>
          <div className="modal__provider__container">
            <div className="modal__provider__content">
              <div className="modal__provider__logo">
                <img className="modal__provider__logo__image" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Pulsa/XL.svg' alt="Logo XL"/>
              </div>
              <div className="modal__provider__list">
                <ul style={{listStyle:'none'}}>
                  <li>0817</li>
                  <li>0818</li>
                  <li>0819</li>
                  <li>0859</li>
                  <li>0877</li>
                  <li>0878</li>
                </ul>
              </div>
            </div>
            <div className="modal__provider__content">
              <div className="modal__provider__logo">
                <img className="modal__provider__logo__image" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Pulsa/Telkomsel.svg' alt="Logo Telkomsel"/>
              </div>
              <div className="modal__provider__list">
                <ul style={{listStyle:'none'}}>
                  <li>0811</li>
                  <li>0812</li>
                  <li>0813</li>
                  <li>0821</li>
                  <li>0822</li>
                  <li>0823</li>
                  <li>0852</li>
                  <li>0853</li>
                  <li>0851</li>
                </ul>
              </div>
            </div>
            <div className="modal__provider__content">
              <div className="modal__provider__logo">
                <img className="modal__provider__logo__image" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Pulsa/Smartfren.svg' alt="Logo Smart"/>
              </div>
              <div className="modal__provider__list">
                <ul style={{listStyle:'none'}}>
                <li>0881</li>
                <li>0882</li>
                <li>0883</li>
                <li>0884</li>
                <li>0885</li>
                <li>0886</li>
                <li>0887</li>
                <li>0888</li>
                <li>0889</li>
                </ul>
              </div>
            </div>
            <div className="modal__provider__content">
              <div className="modal__provider__logo">
                <img className="modal__provider__logo__image" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Pulsa/Indosat.svg' alt="Logo Indosat"/>
              </div>
              <div className="modal__provider__list">
                <ul style={{listStyle:'none'}}>
                  <li>0814</li>
                  <li>0815</li>
                  <li>0816</li>
                  <li>0855</li>
                  <li>0856</li>
                  <li>0857</li>
                  <li>0858</li>
                </ul>
              </div>
            </div>
            <div className="modal__provider__content">
              <div className="modal__provider__logo">
                <img className="modal__provider__logo__image" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Pulsa/Tri.svg' alt="Logo Tri"/>
              </div>
              <div className="modal__provider__list">
                <ul style={{listStyle:'none'}}>
                  <li>0895</li>
                  <li>0896</li>
                  <li>0897</li>
                  <li>0898</li>
                  <li>0899</li>
                </ul>
              </div>
            </div>
          </div>
      </Modal>
    )
  }
}

export default ProviderModal;
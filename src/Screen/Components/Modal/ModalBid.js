import React,{Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import axios from 'axios';
import MediaQuery from 'react-responsive';
import { withRouter } from 'react-router-dom'

import ModalConfirm from '../../Home/Modal/ModalConfirm';
import { selectedPriceID } from '../../../actions/productAction';
import {getUser} from '../../../actions/userAction'
import priceProduct from '../../../utils/splitPrice'
import productName from '../../../utils/splitProduct'
import envChecker from '../../../utils/envChecker'
import helperAxios from '../../../utils/axios'

class ModalCheck extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productPrice : 0,
      productName: '',
      modalConfirm : false,
      disabled: false,
      priceId: 0,
      defaultName: '',
      defaultPrice: '',
      paketData: [],
      disabledMobile: true
    }
  }

  toggleConfirm = () => {
    this.setState({
      modalConfirm: !this.state.modalConfirm
    })
  }
  componentDidMount() {
    this.getProduct()
  }

  getProduct = () => {
    axios({
      method: 'GET',
      url: `${envChecker('api')}/api/product/${this.props.priceId}`,
    })
    .then(response => {
      this.setState({
        paketData: response.data.paketData,
        defaultName: response.data.paketData[0].productName,
        priceId: response.data.paketData[0].id,
        defaultPrice: response.data.paketData[0].displayPrice
      })
    })
    .catch(err => console.log('error'))
  }

  choicePulsa = () => {
    const {paketData} = this.state
    if (paketData.length === 0){
      return(
        <label>Produk Sedang Tidak Tersedia</label>
      )
    } else {
        return paketData.map((dataMap, i) => {
          return(
            <button onClick={(e) => this.pulsa(dataMap.id, dataMap)} className="modal__pulsa__content__2__button" key ={i}>
              <div>
                <img className="modal__pulsa__content__2__logo__image"  src={this.props.logo} alt={`Logo ${this.props.brandName}`}/>
              </div>
              {dataMap.displayPrice.toLocaleString(['ban', 'id'])}
            </button>
          )
        })
    }
  }

  mobileChoicePulsa = () => {
    const {paketData} = this.state
    if (paketData.length === 0){
      return(
        <label>Produk Sedang Tidak Tersedia</label>
      )
    } else {
        return paketData.map((dataMap, i) => {
          return(
            <button onClick={() => this.mobilePulsa(dataMap.id, dataMap)} className="mobile-modalBid__button" key ={i}>
              {dataMap.displayPrice.toLocaleString(['ban', 'id'])}
            </button>
          )
        })
    }
  }

  toggle = () => {
    this.setState({
      productName: '',
      disabled: true
    },
      () => this.props.toggle(),
    )
  }

  pulsa = async (id, data) => {
    await this.setState({
      priceId: id,
      productPrice: data.displayPrice,
      productName: data.productName,
      disabled: false,
    })
  }

  mobilePulsa = async (id, data) => {
    await this.props.selectedPriceID(id)
    this.setState({
      priceId: id,
      productPrice: data.displayPrice,
      productName: data.productName,
      disabledMobile: false,
    })
  }

  handleNotLogin() {
    if (localStorage.getItem('token') === null) {
      alert('Anda belum masuk')
    } else {
      this.setState({
        modalConfirm: !this.state.modalConfirm,
      })
    }
  }

  imageProps = () => {
    if ( !this.props.brandName ){
      return (<h1>Loading</h1>)
    } else if ( this.props.brandName === 'Telkomsel' || this.props.brandName === 'Smartfren') {
      return (
        <img className="modal__pulsa__content__1__logo__image__special" src={this.props.logo} alt={`Logo ${this.props.brandName}`}/>
      )
    } else {
      return (
        <img className="modal__pulsa__content__1__logo__image" src={this.props.logo} alt={`Logo ${this.props.brandName}`}/>
      )
    }
  }

    toggleTabs(tab, category) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        category: category,
        productName: '',
        productPrice: '',
        disabled: true
      });
    }
  }

  renderModalBid = () => {
    return (
      <Modal ariaHideApp={false} isOpen={this.props.isOpen} className="modal__pulsa">
        <div className="modal__pulsa__container">
        <div className="modal__pulsa__tabsContainer">
          <div className="modal__pulsa__content">
          <div className="modal__pulsa__content__1">
            <div className="modal__pulsa__content__1__logo">
              <div>
                {this.imageProps()}
              </div>
              <label>{ !this.state.productPrice ? (this.state.defaultPrice.toLocaleString(['ban', 'id'])) : this.state.productPrice.toLocaleString(['ban', 'id'])}</label>
            </div>
          </div>
          <div className="modal__pulsa__content__2">
            {this.choicePulsa()}
          </div>
          </div>
        </div>
          <div className="modal__pulsa__content__3">
            <div className="modal__pulsa__content__3__top">
              <div className="modal__pulsa__content__3__button">
                <button className="modal__pulsa__content__3__button__x" onClick={this.toggle}>X</button>
              </div>
              <label>{ !this.state.productName ?
                      productName(this.state.defaultName) :
                      productName(this.state.productName)}</label>
              <br />
              <label>{ !this.state.productName ?
                      priceProduct(this.state.defaultName) : // penamaan nya masih salah .. ini buat harga
                      priceProduct(this.state.productName)}</label>
            </div>
            <div >
              <button value={this.state.priceId} onClick={() => this.handleNotLogin()} disabled={this.state.disabled} type="button" className="modal__pulsa__content__3__button__price">
                Intip Harga
                <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Bidding/lock.png' alt="LockIcon" className="modal__pulsa__content__3__button__price__image"/>
              </button>
            </div>
          </div>
          <ModalConfirm
            typeBuy={this.props.typeBuy}
            displayPrice={this.state.productPrice}
            firebase={this.props.firebase}
            open={this.state.modalConfirm}
            toggle={this.toggleConfirm}
            priceId={this.state.priceId}
            type={this.props.type}
            />
        </div>
      </Modal>
    )
  }


  renderMobileModalBid = () => {
    return (
      <Modal ariaHideApp={false} isOpen={this.props.isOpen} className="mobile-modalBid">
        <div className="mobile-modalBid__container">
        {this.imageProps()}
          <div className="mobile-modalBid__content">
            {this.mobileChoicePulsa()}
          </div>
          <label style={{marginTop : '3%'}}>{this.state.productName}</label>
          <label style={{marginTop : '3%'}}>1x intip = 1 kunci aladin</label>
          <br/>
          <label>Lanjutkan ?</label>
          <div className="mobile-modalBid__button__container">
            <button className="mobile-modalBid__button__next" onClick={() => this.checkAladinkey(this.state.productPrice)} disabled={this.state.disabledMobile}>Ya</button>
            <button style={{color:'red'}} className="mobile-modalBid__button__next" onClick={this.toggle}>Tidak</button>
          </div>
        </div>
      </Modal>
    )
  }

  checkAladinkey = (displayPrice) => {
    const { priceId, type, userInfo } = this.props
    // const limitWallet = displayPrice - 500
    if ( !userInfo.id && !localStorage.getItem('token')){
      return alert ('Anda Belum Masuk')
    } else if (userInfo.aladinKeys <= 0 ){
      return alert("Anda Tidak Memiliki Aladin Key")
    } 
    // else if (userInfo.wallet < limitWallet) {
    //   alert(`Saldo Wallet Anda Kurang Dari Rp.${limitWallet.toLocaleString(['ban', 'id'])},00`)
    //   this.props.history.push('/dompetaladin')
    // } 
    else {
      helperAxios('PUT', 'logopenv2', { priceId, type, price: 0 })
      .then(async response => {
        if (response.data.status === 401) {
          alert(response.data.message)
          this.props.history.push('/dompetaladin')
        } else if (response.data.status !== 200){
          return alert(response.data.message)
        } else if (response.data.status === 200){
          this.props.getUser()
          await this.props.selectedPriceID(this.state.priceId)
          this.props.history.push('/bidding', {
            displayPrice: this.props.displayPrice,
            firebase: this.props.firebase,
            typeBuy: this.props.typeBuy,
            type: this.props.type,
          })
        }
      })
    }
  }

  render() {
    return (
      <div>
        <MediaQuery query="(max-device-width: 720px)">
          {this.renderMobileModalBid()}
        </MediaQuery>
        <MediaQuery query="(min-device-width: 721px)">
          {this.renderModalBid()}
        </MediaQuery>
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.userInfo,
    selectedPriceID: state.productReducer.selectedPriceID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectedPriceID: (id) => dispatch(selectedPriceID(id)),
    getUser: () => dispatch(getUser()),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalCheck)

export default withRouter(connectComponent)

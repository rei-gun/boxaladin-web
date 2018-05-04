import React, { Component } from 'react';

import { Button, Modal , ModalHeader} from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import RegisterIcon from '../../../asset/user/IconCheck.svg'
import LogoTri from '../../../asset/LandingPage/pulsa/Tri.svg';
import { selectProductID } from '../../../actions/productAction'

class ModalTri extends Component {
  constructor(props) {
    super(props);
    this.pulsa = this.pulsa.bind(this)
    this.state = {  
      pulsaPrice : '',
      pulsaName: ''
    }
  }

  pulsa(e, data){
    this.props.selectProductID(e),
    console.log('data', e)
    this.setState({
      pulsaPrice: data.price,
      pulsaName: data.productName
    })

  }

  choicePulsa = () => {
    if (this.props.products.length === 0) {
      return (
        <h1>Loading</h1>
      )
    } else {
      return(
        this.props.products.filter(data => {
          return data.brand === 'Tri' && data.category === 'Pulsa'
        })
        .map((data, i) => {
          return (
            <button onClick={(e) => this.pulsa(data.id, data)} className="modal__pulsa__content__2__button" value={data.id} key={i}>
              <img className="modal__pulsa__content__2__logo__image"  src={LogoTri} alt="Logo Tri"/>
              {data.price.toLocaleString(['ban', 'id'])}
            </button>
          )
        })
      )
    }
  }

  handleNotLogin = () => {
    if (localStorage.getItem('token') === null) {
      alert('Anda belum masuk')
    }
  }

  checkDisabled = () =>{
    if (this.props.selectedProductID === undefined ){
      return true
    } else if ( this.props.selectedProductID === ''){
      return true
    } else if (this.props.selectedProductID !== ''){
      return false
    }
  }

  render() { 
    console.log(this.props)
    return (  
      <Modal isOpen={this.props.open} className="modal__pulsa">
        <div className="modal__pulsa__container">
          <div className="modal__pulsa__content">
            <div className="modal__pulsa__content__1">
              <div className="modal__pulsa__content__1__logo">
                <div>
                  <img className="modal__pulsa__content__1__logo__image" src={LogoTri} alt="Logo Tri"/>
                </div>
                <label>{this.state.pulsaPrice.toLocaleString(['ban', 'id'])}</label>
              </div>
            </div>
            <div className="modal__pulsa__content__2">
              {this.choicePulsa()}
            </div>
          </div>
          <div className="modal__pulsa__content__3">
          <div>
          <div className="modal__pulsa__content__3__button">
              <button className="modal__pulsa__content__3__button__x" onClick={this.props.buttonToggle}>X</button>
            </div>
            <label>{this.state.pulsaName}</label>
          </div>

              <div >
              <Link to="/bidding">

                <button onClick={() => this.handleNotLogin()} disabled={() => this.checkDisabled()} type="button" className="modal__pulsa__content__3__button__price">
                Intip Harga
                <img src={RegisterIcon} alt="RegisterIcon" className="modal__pulsa__content__3__button__price__image"/>
                </button>
                </Link>

              </div>
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    selectedProductID: state.productReducer.selectedProductID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectProductID: (id) => dispatch(selectProductID(id))
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalTri)

export default connectComponent
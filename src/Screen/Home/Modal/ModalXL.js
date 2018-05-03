import React, { Component } from 'react';

import { Button, Modal , ModalHeader} from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import LogoXL from '../../../asset/LandingPage/pulsa/Xl.svg';
import { selectProductID } from '../../../actions/productAction'

class ModalXL extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      pulsaPrice : '',
      pulsaName: ''
    }
  }

  pulsa =(e, data) => {
    this.props.selectProductID(e.target.value) 
    this.setState({
      pulsaPrice: data.price,
      pulsaName: data.productName
    })
  }

  choicePulsa=()=>{
    if (this.props.products.length === 0) {
      return (
        <h1>Loading</h1>
      )
    } else {
      return(
        this.props.products.filter(data => {
          return data.brand === 'XL' && data.category === 'Pulsa'
        })
        .map((data, i) => {
          return (
            <button onClick={(e) => this.pulsa(e, data)} className="modal__pulsa__content__2__button" value={data.id} key={i}>
              <img className="modal__pulsa__content__2__logo__image"  src={LogoXL} alt="Logo XL"/>
              {data.price.toLocaleString(['ban', 'id'])}
            </button>
          )
        })
      )
    }
  }

  handleNotLogin() {
    if (localStorage.getItem('token') === null) {
      alert('Anda belum masuk')
    }
  }

  render() { 
    return (  
      <Modal isOpen={this.props.open} className="modal__pulsa">
        {/* <div>
          <ModalHeader toggle={this.props.buttonToggle}></ModalHeader>
        </div> */}
        <div className="modal__pulsa__container">
          <div className="modal__pulsa__content">
            <div className="modal__pulsa__content__1">
              <div className="modal__pulsa__content__1__logo">
                <div>
                  <img className="modal__pulsa__content__1__logo__image" src={LogoXL} alt="Logo XL"/>
                </div>
                <label>{this.state.pulsaPrice.toLocaleString(['ban', 'id'])}</label>
              </div>
            </div>
            <div className="modal__pulsa__content__2">
              {this.choicePulsa()}
            </div>
          </div>
          <div className="modal__pulsa__content__3">
            <div className="modal__pulsa__content__3__button">
              <button className="modal__pulsa__content__3__button__x" onClick={this.props.buttonToggle}>X</button>
            </div>
            <label>{this.state.pulsaName}</label>
            <div >
              <Link to="/bidding">
                <button onClick={() => this.handleNotLogin()} disabled={this.props.selectedProductID !== '' ? false : true} type="button" className="modal__pulsa__content__3__button__price">Intip Harga</button>
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

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalXL)

export default connectComponent
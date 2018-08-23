import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';

import moment from 'moment'
import classnames from 'classnames';
import Xendit from 'xendit-js-node'

import Guide from './PaymentGuide'
import ModalInvoice from '../Components/Modal/ModalInvoice'
import envChecker from '../../utils/envChecker'

class InvoiceDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invoice: '',
      activeTab: '1',
      // amount: 0,
      ccNumber: '',
      ccExpiredMonth: '',
      ccExpiredYear: '',
      cvn: '',
      isOpen3dsModal: false,
      payer_auth_url: '',
      time: '',
      modalDetail: false
    }

    this.toggle = this.toggle.bind(this);
    this.toggle3dsModal = this.toggle3dsModal.bind(this)
    this.toggleDetail = this.toggleDetail.bind(this)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleDetail(){
    this.setState({
      modalDetail:!this.state.modalDetail
    })
  }

  handleRetail(){
    if (!this.state.invoice){
      return null
    } else if (this.state.invoice.payment.availableretail === 'BCA') {
      return (
        <div>
        <Guide activeTab= {'4'} invoice={this.state.invoice} />
      </div>
      )
    } else if (this.state.invoice.payment.availableretail !== 'null') {
      return (
        <div>
        <Guide activeTab= {'5'} invoice={this.state.invoice} />
      </div>
      )
    } else if (this.state.invoice.payment.availableretail === 'wallet'){
      return (
        <div>
          <Guide activeTab= {'5'} invoice={this.state.invoice} />
        </div>
      )
    } else if (this.state.invoice.virtualAccount.bankCode === 'MANDIRI') {
      return (
        <div>
        <Guide activeTab= {'1'} invoice={this.state.invoice} />
      </div>
      )
    } else if (this.state.invoice.virtualAccount.bankCode === 'BNI') {
      return (
        <div>
        <Guide activeTab= {'2'} invoice={this.state.invoice} />
      </div>
      )
    } else if (this.state.invoice.virtualAccount.bankCode === 'BRI') {
      return (
        <div>
        <Guide activeTab= {'3'} invoice={this.state.invoice} />
      </div>
      )
    } else {
      return null
    }
  }
  
  getExpired = () => {
    return this.state.invoice.payment.expiredAt && (
      <h2 className="pembayaran__title__infoTime">Selesaikan Pembayaran Sebelum {moment(this.state.invoice.payment.expiredAt, moment.ISO_8601).add(12, 'hours').format('D MMMM YYYY, h:mm:ss a')}</h2>
    )
  }

  render() {
    return (
      <div className="pembayaran">
        <div className="pembayaran__container">
          <h1 className="pembayaran__title__header">Pembayaran {this.state.invoice.virtualAccount ? (this.state.invoice.virtualAccount.bankCode) : null}</h1>
          {this.state.invoice ? (
              <div>
                <div className="pembayaran__content__textDistance">
                  <h1 className="pembayaran__title"> Rp {this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])}</h1>
                  <button className="pembayaran__buttonDetail" onClick={this.toggleDetail}> Detail Tagihan </button>
                </div>
                  {this.getExpired()}
                  {this.handleRetail()}
              </div>
            ) : null
          }
        </div>
        <ModalInvoice isOpen={this.state.modalDetail} toggle={this.toggleDetail} invoice={this.state.invoice} />
      </div>
    )
  }

  componentDidMount() {
    this.getInvoiceById()
  }

  getTime(){
    if (this.state.invoice){

    }
  }

  submitPaymentWithCC(token) {
    axios({
      method: 'POST',
      headers: {
        key: process.env.REACT_APP_KEY
      },
      url: `${envChecker('api')}/creditcard`,

      data: {
        tokenId: token,
        externalId: this.state.invoice.paymentId.toString(),
        amount: this.state.invoice.aladinPrice,
        cardCvn: this.state.cvn
      }
    })
    .then(({data}) => {

    })
    .catch(err => console.log(err))
  }

  toggle3dsModal() {
    this.setState({isOpen3dsModal: !this.state.isOpen3dsModal})
  }

  show3dsModal() {
    return (
      <div>
        <Modal isOpen={this.state.isOpen3dsModal} toggle={this.toggle3dsModal} className={this.props.className}>
          <ModalHeader toggle={this.toggle3dsModal}>Modal title</ModalHeader>
          <ModalBody>
            <iframe src={this.state.payer_auth_url} title="modal3ds"/>
          </ModalBody>
        </Modal>
      </div>
    )
  }

  createCCToken() {
    Xendit.setPublishableKey('xnd_public_development_OImFfL0l07evlc5rd+AaEmTDb9L38NJ8lXbg+Rxi/Gbe8LGkBQ93hg==')
    Xendit.card.createToken({
      amount: this.state.invoice.aladinPrice,
			card_number: this.state.ccNumber,
			card_exp_month: this.state.ccExpiredMonth,
			card_exp_year: this.state.ccExpiredYear,
			card_cvn: this.state.cvn,
			is_multiple_use: false
    }, (err, creditCardCharge) => {
    	if (err) {
    		console.log(err);

    		return;
    	}

    	if (creditCardCharge.status === 'VERIFIED') {
        var token = creditCardCharge.id;
        this.submitPaymentWithCC(token)
    	} else if (creditCardCharge.status === 'IN_REVIEW') {
        this.setState({payer_auth_url: creditCardCharge.payer_authentication_url})
        this.toggle3dsModal()
      } else if (creditCardCharge.status === 'FAILED') {
        console.log(creditCardCharge.status);
      }
    }

  )}

  showTabs() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              <h3>Virtual Account</h3>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              <h3>Credit Card</h3>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {this.state.invoice ? (
                <div>
                  <h5>Silahkan melakukan pembayaran sejumlah {this.state.invoice.payment.amount} ke salah satu virtual bank account di bawah ini:</h5>
                  <ul>
                    {this.state.invoice.payment.availableBanks.map((bank, idx) => {
                      return (
                        <li key={idx}>{bank.bank_code}: {bank.bank_account_number}</li>
                      )
                    })}
                  </ul>
                </div>
              ) : null
            }
          </TabPane>
          <TabPane tabId="2">
          <h5>Credit Card</h5>

          <Form>

            <FormGroup>
              <Input type="text" value={this.state.invoice !== null ? this.state.invoice.aladinPrice : ''} disabled />
            </FormGroup>

            <FormGroup>
              <Input type="text" placeholder="ccNumber" onChange={(e) => this.setState({ccNumber: e.target.value})} />
            </FormGroup>

            <FormGroup>
              <Input type="text" placeholder="ccExpiredMonth" onChange={(e) => this.setState({ccExpiredMonth: e.target.value})} />
            </FormGroup>

            <FormGroup>
              <Input type="text" placeholder="ccExpiredYear" onChange={(e) => this.setState({ccExpiredYear: e.target.value})} />
            </FormGroup>

            <FormGroup>
              <Input type="text" placeholder="cvn" onChange={(e) => this.setState({cvn: e.target.value})} />
            </FormGroup>

            <FormGroup>
              <Button onClick={() => this.createCCToken()}>Submit</Button>
            </FormGroup>

          </Form>

          </TabPane>
        </TabContent>
      </div>
    )
  }

  // toggle(tab) {
  //   if (this.state.activeTab !== tab) {
  //     this.setState({activeTab: tab})
  //   }
  // }

  getInvoiceById() {
    axios({
      method: 'GET',
      headers: {
        key: process.env.REACT_APP_KEY
      },
      url: `${envChecker('api')}/transaction/${this.props.match.params.id}`
    })
    .then(({data}) => {
    this.setState({
      invoice: data
    })
    if (data.virtualAccount === null){
      this.setState({
        activeTab: '5'
      })
    } else if ( data.virtualAccount.bankCode === 'MANDIRI'){
      this.setState({
        activeTab: '1'
      })
    } else if (data.virtualAccount.bankCode === 'BNI'){
      this.setState({
        activeTab: '2'
      })
    } else if (data.virtualAccount.bankCode === 'BRI'){
      this.setState({
        activeTab: '3'
      })
    } else if (data.virtualAccount.bankCode === 'BCA'){
      this.setState({
        activeTab: '4'
      })
    }
  })
  .catch(err => console.log(err))
}

}

const mapStateToProps = (state) => {
  return {
    //
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail)

export default connectComponent

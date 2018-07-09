import React from 'react'
import { connect } from 'react-redux'
import {
  Table,
  Button
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import moment from 'moment'

import { getUserPendingTopupTransactions, getUserTopupTransactions } from '../../actions/topupAction'

class TopupInvoice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="invoice">
        <div className="invoice__container">
					{ this.showInvoice() }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.getUserPendingTopupTransactions()
    this.props.getUserTopupTransactions()
  }

	showInvoice() {
    return (
      <Table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Key</th>
            <th>Nominal Transfer</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.userTopupTransactions.map((data, idx) => {
            if (data.createdAt === '' || data.createdAt === undefined || data.payment.invoiceId === 'null'){
              return null
            } else {
              const time = moment().toISOString()
              if (data.payment.status === 'CANCELLED') {
                return (
                  <tr key={idx}>
                    <th scope="row">{idx+1}</th>
                    <td>{moment(data.createdAt, moment.ISO_8601).format('L, h:mm:ss a')}</td>
                    <td>{ data.product ? data.product.productName : data.description }</td>
                    <td>{ data.payment ? `Rp.${data.payment.amount.toLocaleString(['ban', 'id'])}` : null }</td>
                    <td>{ data.number ? data.number : (<h3>Anda Tidak Memasukkan no Hp</h3>) }</td>
                    <td>{ data.payment ? data.payment.status : 'CANCELLED' }</td>
                    <td></td>
                  </tr>
                )
              } else if (time <= data.payment.expiredAt) {
              return (
              <tr key={idx}>
                <th scope="row">{idx+1}</th>
                <td>{data.key.keyAmount}</td>
                <td>{ data.payment ? `Rp.${data.payment.amount.toLocaleString(['ban', 'id'])}` : null }</td>
                <td>{ data.payment? data.payment.status : null }</td>
                <td>{ data.payment.status === 'PENDING'  ? (
                  <Button className="pembayaran__button__invoice" color="success" onClick={() => this.showMetodePembayaran(data.id)}>Bayar</Button>
                ) : null}</td>
              </tr>
            )
              } else {
                return (
                  <tr key={idx}>
                    <th scope="row">{idx+1}</th>
                    <td>{data.key.keyAmount}</td>
                    <td>{ data.payment ? `Rp.${data.payment.amount.toLocaleString(['ban', 'id'])}` : null }</td>
                    <td>{ data.payment? data.payment.status : null }</td>
                    <td>{ data.payment.status === 'PENDING'  ? (
                  <label>Expired</label>
                ) : null}</td>
                  </tr>
                )
              }
            }
          })}
        </tbody>
      </Table>
    )
  }

  showMetodePembayaran(id) {
    this.props.history.push(`/topupinvoice/${id}`)
  }
}

const mapStateToProps = (state) => {
  return {
    userPendingTopupTransactions: state.topupReducer.userPendingTopupTransactions,
    userTopupTransactions: state.topupReducer.userTopupTransactions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserPendingTopupTransactions: () => dispatch(getUserPendingTopupTransactions()),
    getUserTopupTransactions: () => dispatch(getUserTopupTransactions())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(withRouter(TopupInvoice))

export default connectComponent

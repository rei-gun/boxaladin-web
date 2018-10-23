import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Button } from 'reactstrap';
import {withRouter} from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import HelperAxios from '../../utils/axios'
import envChecker from '../../utils/envChecker'
class Invoice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1',
      transaction: [],
      pages: [],
      pageCount: 0,
      pageNumber: 1
    };
  }

  componentDidMount() {
    this.getUserInvoice()
  }

  getUserInvoice = () => {
    HelperAxios('GET', 'users/invoicegame')
    .then(response => {
      this.setState({
        transaction: response.data.dataTransaction,
        pages: response.data.pages,
        pageCount: response.data.pageCount
      })
    })
    .catch(err => console.log(err))
  }

  showInvoice = () => {
    const {transaction} = this.state
    return (
      <Table>
        <thead>
        <tr>
            <th>No.</th>
            <th>Tanggal</th>
            <th>Barang</th>
            <th>Nominal Transfer</th>
            <th>ID Tujuan</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {transaction.map((data, idx) => {
            if (!data.createdAt){
              return null
            } else {
              const time = moment().toISOString()
              let statusComponent = ''
              if (data.status === 'CANCELLED'){
                statusComponent = <td>{'CANCELLED'}</td>
              } else if (data.status === 'PAID') {
                statusComponent = <td>{'SUKSES'}</td>
              } else if (data.status !== 'PAID' && data.status !== 'CANCELLED' && data.status !== 'PENDING'){
                statusComponent = <td>{data.status}</td>
              } else if (time <= data.expiredAt){
                statusComponent = <td><Button className="pembayaran__button__invoice" color="success" onClick={() => this.showMetodePembayaran(data.id)}>Bayar</Button></td>
              } else if (time >= data.expiredAt){
                statusComponent = <td>Expired</td>
              }

              return(
                <tr key={idx}>
                  <th scope="row">{idx+1}</th>
                  <td>{moment(data.createdAt, moment.ISO_8601).format('L, h:mm:ss a')}</td>
                  <td>{data.description}</td>
                  <td>{`Rp.${data.aladinPrice.toLocaleString(['ban', 'id'])}`}</td>
                  <td>{ data.number ? data.number : (<h3>Anda Tidak Memasukkan no Hp</h3>) }</td>
                  {statusComponent}
                </tr>
              )
            }
          })}
        </tbody>
      </Table>
    )
  }

  pagination = () => {
    const { pages, pageCount} = this.state
    if (pageCount <= 1) {
      return null
    }
    return (
      <div className="pagination-container">
        <button className="pagination-button" onClick={() => this.firstOrLast(1)}>First</button>
        {pages.map((data, index) => {
          return (
            <button 
            className={`pagination-button ${this.checkActive(data.number)}`} 
            onClick={() => this.changePage(data.url, data.number)}
            key={index} 
            >
            {data.number}
            </button>
          )
        })}
        <button className="pagination-button" onClick={() => this.firstOrLast(pageCount)}>Last</button>
      </div>
    )
  }

  checkActive = (value) => {
    const { pageNumber } = this.state
    if (value === pageNumber) {
      return 'pagination-active'
    }
  }

  changePage = (url, pageNumber) => {
    axios({
      method: 'GET',
      url: `${envChecker('api')}/users/invoicegame?page=${pageNumber}&limit=20`,
      headers: {
        token: localStorage.getItem('token'),
      }
		})
    .then(({data}) => {
      this.setState({
        pageNumber: pageNumber,
        transaction: data.dataTransaction,
        pages: data.pages
      })
    })
    .catch(err => console.log(err))
  }

  firstOrLast = (page) => {
    HelperAxios('GET', `users/invoicegame?page=${page}&limit=20`)
    .then(({data}) => {
      this.setState({
        pageNumber: page,
        transaction: data.dataTransaction,
        pages: data.pages
      })
    })
    .catch(err => console.log(err))
  }

  showMetodePembayaran(id) {
    this.props.history.push('/invoice', {
      id,
      endpoint: 'transaction'
    })
  }

  render() {
    console.log('state', this.state)
    return (
    <div className="invoice">
      <div className="invoice__container">
        {this.showInvoice()}
        {this.pagination()}
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userTransactions: state.transactionReducer.userTransactions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}
const enhance = connect(mapStateToProps, mapDispatchToProps);
const connectComponent = enhance(withRouter(Invoice))

export default connectComponent

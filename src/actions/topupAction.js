import axios from 'axios'
import envChecker from '../utils/envChecker'

  export const getUserPendingTopupTransactionsAction = (payload) => ({
    type: 'GET_USER_PENDING_TOPUP_TRANSACTIONS',
    payload
  })

  export const getUserTopupTransactionsAction = (payload) => ({
    type: 'GET_USER_TOPUP_TRANSACTIONS',
    payload
  })

  export const getUserPendingTopupTransactions = () => {
    return (dispatch) => {
      axios({
        method: 'GET',
        url: `${envChecker('api')}/topup/userPending`,
        headers: {
          token: localStorage.getItem('token'),
          key: process.env.REACT_APP_KEY
        }
      })
      .then(({data}) => {
        dispatch(getUserPendingTopupTransactionsAction(data))
      })
      .catch(err => console.log(err))
    }
  }

  export const getUserTopupTransactions = () => {
    return (dispatch) => {
      axios({
        method: 'GET',
        url: `${envChecker('api')}/topup/user`,
        headers: {
          token: localStorage.getItem('token'),
          key: process.env.REACT_APP_KEY
        }
      })
      .then(({data}) => {
        dispatch(getUserTopupTransactionsAction(data))
      })
      .catch(err => console.log(err))
    }
  }

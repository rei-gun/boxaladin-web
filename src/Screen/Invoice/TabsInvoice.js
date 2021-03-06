import React from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import Invoice from './Invoice'
import GameInvoice from './GameInvoice'
import TopUpInvoice from './TopupInvoice'
import WalletInvoice from'./TopupWalletInvoice'
import PlnInvoice from'./PlnInvoice'
// import { getUserTransactions } from '../../actions/transactionAction'
// import { getUserTopupTransactions } from '../../actions/topupAction'
// import { getUserWalletTransactions } from '../../actions/walletTransactionAction'

class TabsInvoice extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  

  // componentDidMount() {
  //   const {getUserTopupTransactions, getUserTransactions, getUserWalletTransactions } = this.props
  //   getUserTransactions()
  //   getUserTopupTransactions()
  //   getUserWalletTransactions()
  // }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem className="invoice__tab">
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Invoice Pulsa/Data
            </NavLink>
          </NavItem>
          <NavItem className="invoice__tab">
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Invoice Key
            </NavLink>
          </NavItem>
          <NavItem className="invoice__tab">
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Invoice Uang
            </NavLink>
          </NavItem>
          <NavItem className="invoice__tab">
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Invoice PLN
            </NavLink>
          </NavItem>
          <NavItem className="invoice__tab">
            <NavLink
              className={classnames({ active: this.state.activeTab === '5' })}
              onClick={() => { this.toggle('5'); }}
            >
              Invoice Game
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Invoice/>
          </TabPane>
          <TabPane tabId="2">
            <TopUpInvoice/>
          </TabPane>
          <TabPane tabId="3">
            <WalletInvoice/>
          </TabPane>
          <TabPane tabId="4">
            <PlnInvoice/>
          </TabPane>
          <TabPane tabId="5">
            <GameInvoice/>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // userTransactions: state.transactionReducer.userTransactions,
    // userTopupTransactions: state.topupReducer.userTopupTransactions,
    // userWalletTransactions: state.walletReducer.userWalletTransactions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getUserTransactions: () => dispatch(getUserTransactions()),
    // getUserTopupTransactions: () => dispatch(getUserTopupTransactions()),
    // getUserWalletTransactions: () => dispatch(getUserWalletTransactions())
    }
}
const enhance = connect(mapStateToProps, mapDispatchToProps);
const connectComponent = enhance(withRouter(TabsInvoice))

export default connectComponent
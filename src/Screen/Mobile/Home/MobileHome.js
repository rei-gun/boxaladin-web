import React, { Component } from 'react';
import Price from './Price'
import PaketData from './PaketData'
import TokenListrik from './TokenPln'
import VGame from './VcGame'

export default class MobileHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1
    }
  }
  renderTab = () => {
    const {tab} = this.state
    switch (tab) {
      case 1:
        return <Price/>;
      case 2:
        return <PaketData/>;
      case 3:
        return <TokenListrik/>;
      case 4:
        return <VGame/>
      default:
        return tab
    }
  }

  changeTab = (value) => {
    this.setState({
      tab: value
    });
  }

  checkActive = (value) => {
    const { tab } = this.state
    if (value === tab) {
      return 'tabactive'
    }
  }

  render() {
    return (
      <div>
        <div className='mobile-home-tab-container'>
          <button className={`${this.checkActive(1)} mobile-home-tab`} onClick={() => this.changeTab(1)}>PULSA</button>
          <button className={`${this.checkActive(2)} mobile-home-tab`} onClick={() => this.changeTab(2)}>PAKET DATA</button>
          <button className={`${this.checkActive(3)} mobile-home-tab`} onClick={() => this.changeTab(3)}>TOKEN PLN</button>
          <button className={`${this.checkActive(4)} mobile-home-tab`} onClick={() => this.changeTab(4)}>V Game</button>
        </div>
        {this.renderTab()}
        <h2 className="mobile__pulsa__label">Cara Kerja</h2>
        <img alt="how it works" className='mobile__pulsa__image'src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/Cara+Kerja/carKerjaMobile.svg"/>
      </div>
    );
  }
}

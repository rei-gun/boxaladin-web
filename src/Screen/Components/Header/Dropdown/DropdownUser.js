import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {connect} from 'react-redux'
import {logoutAction} from '../../../../actions/'
import MediaQuery from 'react-responsive';

class DropdownUser extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      text: 'Menu'
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  changeText = (text) => {
    this.setState({
      text: text
    })
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isResetText && prevProps.isResetText !== this.props.isResetText) {
      this.changeText('Home');
      this.props.onResetCalback();
    }
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>


        <DropdownToggle className="ButtonHeader">
          <div className="ButtonHeader__devide">
            <div className="ButtonHeader__big">
              <div className="ButtonHeader__textMobile">{this.state.text}</div>
            </div>

            <div className="ButtonHeader__small" style= {{ backgroundColor: "transparent", borderLeftStyle: "solid", borderLeftWidth: "3px", borderColor: "#FFCD06"}}>
              <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Login/expand.svg' alt="LoginIcon" className="ButtonHeader__iconLogin" href="/home"/>
            </div>
          </div>
        </DropdownToggle>

        <DropdownMenu className="DropdownUser__item">

          <LinkContainer className="DropdownUser__inside__link" onClick={(e) => this.changeText('Home')} to="/home">
            <DropdownItem  className="DropdownUser__inside">
              Home
            </DropdownItem>
          </LinkContainer>

          <MediaQuery query="(max-device-width: 721px)">
            <LinkContainer className="DropdownUser__inside__link" onClick={(e) => this.changeText('Profile')} to="/mme">
              <DropdownItem className="DropdownUser__inside">
                Profile
              </DropdownItem>
            </LinkContainer>
          </MediaQuery>

          <MediaQuery query="(min-device-width: 721px)">
            <LinkContainer className="DropdownUser__inside__link" onClick={(e) => this.changeText('Profile')} to="/me">
              <DropdownItem className="DropdownUser__inside">
                Profile
              </DropdownItem>
            </LinkContainer>
          </MediaQuery>

        {/* <MediaQuery query="(max-device-width: 721px)">
          <LinkContainer className="DropdownUser__inside__link" onClick={(e) => this.changeText('Hadiah')} to="/reward">
            <DropdownItem className="DropdownUser__inside">
              Hadiah
            </DropdownItem>
          </LinkContainer>
        </MediaQuery> */}

        <MediaQuery query="(min-device-width: 721px)">
          <LinkContainer className="DropdownUser__inside__link" onClick={(e) => this.changeText('Dompet')} to="/dompetaladin">
            <DropdownItem className="DropdownUser__inside">
              Dompet Aladin
            </DropdownItem>
          </LinkContainer>
        </MediaQuery>

          <LinkContainer className="DropdownUser__inside__link" onClick={(e) => this.changeText('Game')} to="/game">
            <DropdownItem className="DropdownUser__inside">
              Ruang Game
            </DropdownItem>
          </LinkContainer>

          <LinkContainer className="DropdownUser__inside__link" onClick={(e) => this.changeText('Hasil Game')} to="/gameresult">
            <DropdownItem className="DropdownUser__inside">
              Hasil Game
            </DropdownItem>
          </LinkContainer>

          <LinkContainer className="DropdownUser__inside__link" onClick={(e) => this.changeText('Invoice')} to="/tabsinvoice">
            <DropdownItem className="DropdownUser__inside">
              Invoice
            </DropdownItem>
          </LinkContainer>

          <LinkContainer className="DropdownUser__inside__link" onClick={(e) => this.changeText('FAQ')} to="/about">
            <DropdownItem className="DropdownUser__inside">
              FAQ
            </DropdownItem>
          </LinkContainer>

          <DropdownItem divider />

          <DropdownItem className="DropdownUser__inside" onClick={() => this.logout()}>
            Keluar
          </DropdownItem>

        </DropdownMenu>
      </Dropdown>
    );
  }

  componentDidMount() {
    // this.props.getUser()
  }

  logout() {
    localStorage.removeItem('token')
    this.props.logoutAction()
    window.location.reload()
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.userReducer.isLogin,
    // userInfo: state.userReducer.userInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutAction: () => dispatch(logoutAction()),
    // getUser: () => dispatch(getUser())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(DropdownUser)

export default connectComponent

import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

  import {connect} from 'react-redux'

  import {logoutAction} from '../../actions/'

  import logo from '../../asset/Logo/LogoBig.svg'

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar light expand="md" className="Navbarz">
          <a href="/home">
            <div className="Navbarz__Link">
              <img src={logo} alt="logo" className="logo Navbarz__Link__img" href="/home"/>
            </div>
          </a>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            </Nav>
            {this.showRightButton()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
  showRightButton() {
    if (localStorage.getItem('token') !== null) {
      return (
        <Nav navbar >
          <NavItem>
            <NavLink href="/product">PRODUCT</NavLink>
          </NavItem>

          <UncontrolledDropdown nav>
            <DropdownToggle nav caret>
              USER
            </DropdownToggle>
            <DropdownMenu >
            <DropdownItem>
              Hi,
            </DropdownItem>
              <DropdownItem>
                User Profile
              </DropdownItem>
              <DropdownItem>
                <Link to="/topup" className="nav-link">Top-Up</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/topupinvoice" className="nav-link">Top-Up Invoice</Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => this.logout()}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      )
    } else {
      return (
        <Nav navbar>
          <NavItem>
            <NavLink className="Navbarz__List" href="/home">HOME</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="Navbarz__List" href="/howitworks">HOW ITS WORKS</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="Navbarz__ContactUs" href="/contactus">CONTACT US</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="Navbarz__List" href="/signup">DAFTAR</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="Navbarz__List" href="/login">MASUK</NavLink>
          </NavItem>
        </Nav>
      )
    }
  }

  logout() {
    localStorage.removeItem('token')
    this.props.logoutAction()
  }

}

const mapStateToProps = state => {
  return {
    isLogin: state.userReducer.isLogin
    // dataUser: state.userReducer.dataUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutAction: () => dispatch(logoutAction())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(NavBar)

export default connectComponent

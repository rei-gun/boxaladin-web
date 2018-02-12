import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

//convention pake camelcase

//component page
// import NavBar from './Screen/Components/NavBar'
import Header from './Screen/Components/Header'
import Footer from './Screen/Components/Footer'

//page non login
import LandingPage from './Screen/LandingPage'
import AboutUs from './Screen/AboutUs'
import HowItWorks from './Screen/HowItWorks'
import Product from './Screen/product'

//page login
import Login from './Screen/Login'
import Signup from './Screen/Signup'

//page after login
import Home from './Screen/Home'
import EmailVerificationDone from './Screen/EmailVerificationDone'
import User from './Screen/User'

//page pembelian
import Invoice from './screen/Invoice'
import Pembayaran from './screen/Pembayaran'


class RouteList extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />

            <Route exact path="/" component={LandingPage} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/howitworks" component={HowItWorks} />

            <Route exact path="/home" component={Home} />
            <Route
              exact
              path="/Login"
              render={() =>
                localStorage.getItem('token') !== null ? (
                  <Redirect to="/home" />
                ) : (
                  <Login />
                )
              }
            />

            <Route
              exact
              path="/signup"
              render={() =>
                localStorage.getItem('token') !== null ? (
                  <Redirect to="/home" />
                ) : (
                  <Signup />
                )
              }
            />

            <Route
              exact
              path="/me"
              render={() =>
                localStorage.getItem('token') !== null ? (
                  <User />
                ) : (
                  <Redirect to="/landingpage" />
                )
              }
            />

            <Route
              path="/product"
              component={Product}
            />

            <Route
              path="/emailVerification"
              component={EmailVerificationDone}
            />

            <Route
              path="/payment/:id"
              component={Pembayaran}
            />

            <Route
              path="/invoice"
              component={Invoice}
            />

            <Footer/>
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.userReducer.isLogin
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(RouteList)

export default connectComponent

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// Components
import SignUp from './auth/signUp.jsx';
import Login from './auth/login.jsx';
import CreateDoc from './createDoc.jsx';
import Navbar from './navigation/navbar.jsx';
import Footer from './footer.jsx';
import Theme from 'material-ui/styles/MuiThemeProvider';
import LoginModal from './modals/loginModal.jsx';
import EditDocModal from './modals/editDocModal.jsx';
import Toast from './modals/toast.jsx';

// UI
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Store properties
import * as user from '../actions/userActions.jsx';
import * as auth from '../actions/authActions.jsx';

@connect((store) => {
  return {
    isLoggedIn: store.auth.login,
    redirectUrl: store.auth.redirectUrl
  }
})

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.location.pathname !== '/login') {
      this.props.dispatch(auth.setRedirectUrl(this.props.location.pathname));
    }
    this.props.dispatch(auth.autoLogin());
  }

  componentDidUpdate(prevProps) {
    const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn

    if (isLoggingIn) {
      this.props.router.push(this.props.redirectUrl);
    }
  }

  render() {
    return (
      <Theme>
        <div>
          <Navbar props={this.props} />
          <div className="app-body">
            {this.props.children}
          </div>
          <Footer />
          <LoginModal />
          <EditDocModal />
          <Toast />
        </div>
      </Theme>
    );
  }
}





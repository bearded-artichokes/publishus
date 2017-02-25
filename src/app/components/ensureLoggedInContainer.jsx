import React from 'react';
import { connect } from 'react-redux';

// Store properties
import * as user from '../actions/userActions.jsx';

@connect((store) => {
  return {
    isLoggedIn: store.user.login,
    redirectUrl: store.user.redirectUrl
  };
})

export default class EnsureLoggedInContainer extends React.Component {
  componentWillMount() {
    console.log('IN LOGGED IN CONTAINER');
    if (!this.props.isLoggedIn) {
      console.log('!this.props.isLoggedIn', !this.props.isLoggedIn);
      console.log('this.props.location.pathname', this.props.location.pathname);
      this.props.dispatch(user.setRedirectUrl(this.props.location.pathname));
      // this.props.router.push('/login');
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return (
        <div>
          {this.props.children}
        </div>
      )
    } else {
      return null
    }
  }
}
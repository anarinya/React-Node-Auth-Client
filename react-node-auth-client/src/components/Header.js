import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

  renderLinks() {
    if (this.props.isAuthenticated) {
      return (
        // show a link to sign out
        <li className="nav-item">
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      );
    }
    // show a link to sign in or sign up
    return [
      <li className="nav-item" key={1}>
        <Link className="nav-link" to="/signin">Sign In</Link>
      </li>,
      <li className="nav-item" key={2}>
        <Link className="nav-link" to="/signup">
          Sign Up
        </Link>
      </li>
    ];
  }

  render() {
    return (
      <div className="Header">
        <nav className="navbar navbar-light">
          <Link to="/" className="navbar-brand">Redux Auth</Link>
          <ul className="nav navbar-nav">
            { this.renderLinks() }
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Header);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <img src="" alt="" />
        <div>
          <p data-testid="email-field">{`Email: ${email}`}</p>
          <p data-testid="header-currency-field">BRL</p>
          <p data-testid="total-field">0</p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.User.email,
});

export default connect(mapStateToProps)(Header);

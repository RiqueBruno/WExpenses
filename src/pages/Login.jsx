import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    btnIsDisabled: true,
    password: '',
    email: '',
  };

  handlerChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.verify);
  };

  verify = () => {
    const { email, password } = this.state;
    const min = 6;
    const passwordVerify = password.length >= min;
    const emailVerify = /\S+@\S+\.\S+/.test(email);

    this.setState({
      btnIsDisabled: !(passwordVerify && emailVerify),
    });
  };

  handlerClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;

    dispatch(userEmail(email));
    history.push('/carteira');
  };

  render() {
    const { btnIsDisabled } = this.state;
    return (
      <article>
        <input
          type="text"
          name="email"
          data-testid="email-input"
          onChange={ this.handlerChange }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ this.handlerChange }
        />
        <button
          type="button"
          name="btnIsActive"
          disabled={ btnIsDisabled }
          onClick={ this.handlerClick }
        >
          Entrar
        </button>
      </article>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);

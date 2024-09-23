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
      <article className="Login">
        <form className="formLogin">
          <img src="" alt="Icon WExpenses" />
          <label htmlFor="email" className="label">
            <p>Email</p>
            <input
              className="input"
              id="email"
              type="text"
              name="email"
              data-testid="email-input"
              onChange={ this.handlerChange }
            />
          </label>
          <label htmlFor="password" className="label">
            <p>Senha</p>
            <input
              className="input"
              id="password"
              type="password"
              name="password"
              data-testid="password-input"
              onChange={ this.handlerChange }
            />
          </label>
          <button
            type="button"
            name="btnIsActive"
            className="btn-login"
            disabled={ btnIsDisabled }
            onClick={ this.handlerClick }
          >
            Entrar
          </button>
        </form>
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

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions';
import logo from '../assets/images/logo-noBg.svg';
import bg from '../assets/images/bg-login.png';

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
      <main className="bg-black h-full w-full md:flex">
        <article className="h-[60%] w-full">
          <form className="formLogin">
            <img src={ logo } alt="Logo WExpenses" />
            <label htmlFor="email" className="label">
              Email
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
              Senha
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
        <div>
          <div />
          <img src={ bg } alt="Background da pagina de login." />
        </div>
      </main>
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

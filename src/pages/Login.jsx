import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions';
import logo from '../assets/images/logo-noBg.svg';
import bg from '../assets/images/bg-login.png';
import Input from '../components/Input/Input.tsx';

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
        <article className="h-[60%] w-full flex items-center justify-center">
          <form className="w-4/5 flex flex-col text-white items-center justify-center p-2">
            <img src={ logo } alt="Logo WExpenses" />
            <Input
              type="text"
              name="email"
              label="Email"
              data-testid="email-input"
              onChange={ this.handlerChange }
            />
            <Input
              type="password"
              name="password"
              label="Senha"
              data-testid="password-input"
              onChange={ this.handlerChange }
            />
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
        <div className="h-[40%] w-full flex items-center justify-center relative">
          <img src={ bg } alt="Background da pagina de login." className="w-full h-full z-0" />
          <div className="w-full h-full z-40 absolute bg-bg-dark-gradient" />
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

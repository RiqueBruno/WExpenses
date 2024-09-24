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
    this.setState(
      {
        [name]: value,
      },
      this.verify
    );
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
    const { btnIsDisabled, email, password } = this.state;
    return (
      <main className="bg-black h-full w-full md:flex">
        <article className="h-[60%] w-full flex items-center justify-center z-50 md:w-[40%] md:border-none md:m-0">
          <form className="w-4/5 flex flex-col text-white items-center justify-center p-2">
            <img src={logo} alt="Logo WExpenses" className="mb-8" />
            <Input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.handlerChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              value={password}
              onChange={this.handlerChange}
            />
            <button
              type="button"
              name="btnIsActive"
              className="w-full bg-bg-btn-gradient text-white font-bold py-2 px-4 mt-2 rounded hover:bg-bg-btn-gradient-reverse focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-bg-btn-gradient"
              disabled={btnIsDisabled}
              onClick={this.handlerClick}
            >
              Entrar
            </button>
          </form>
        </article>
        <div className="h-[40%] w-full flex items-center justify-center relative md:h-full md:w-[60%] md:border-none md:p-0 md:m-0">
          <img
            src={bg}
            alt="Background da pagina de login."
            className="w-full h-full z-0 md:w-full md:h-full"
          />
          <div className="w-full h-full z-40 absolute bg-bg-dark-gradient md:bg-bg-dark-gradient-Desktop" />
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

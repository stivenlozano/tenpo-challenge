import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/Auth'
import logotipo from '../assets/logotipo.png'

interface ErrorProps {
  name: string;
  messageError: string;
}

function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<ErrorProps[]>([]);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const isValidEmail = (email: string): boolean => {
    const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errores: ErrorProps[] = [];

    if (!username) {
      errores = [...errores, { 'name': 'username', 'messageError': 'Ingresa tu dirección de correo electrónico.' }]
    } else if (!isValidEmail(username)) {
      errores = [...errores, { 'name': 'username', 'messageError': 'Intenta usar el formato example@email.com' }]
    }

    if (!password) {
      errores = [...errores, { 'name': 'password', 'messageError': 'Este campo es obligatorio.' }]
    }

    if (!errores.length) {
      const fakeToken = 'fake-token-' + Date.now();
      login(fakeToken);
      navigate('/movies');
    } else {
      setErrors(errores)
    }
  };

  return (
    <div className='container-form'>
      <img className='logotipo' src={logotipo} alt="logotipo" />

      <section className='login'>
        <h1 className='login__title'>Inicia sesión</h1>
        <p className='login__text'>Ingresa la dirección de correo electrónico y la contraseña de tu cuenta de Tenpo Movies.</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className='form__group'>
            <label className='form__label' htmlFor="username">Correo electrónico</label>
            <input
              id='username'
              className={`form__input ${errors ? 'form__input--error' : ''}`}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.map((item, index) => item.name == 'username' && (
              <span key={index} className='form__error'>{item.messageError}</span>
            ))}
          </div>

          <div className='form__group'>
            <label className="form__label" htmlFor="username">Contraseña</label>
            <input
              id='password'
              className={`form__input ${errors ? 'form__input--error' : ''}`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.map((item, index) => item.name == 'password' && (
              <span key={index} className='form__error'>{item.messageError}</span>
            ))}
          </div>

          <button className='form__button' type="submit">Inicia sesión</button>
        </form>
      </section>
    </div>
  );
}

export default LoginPage;
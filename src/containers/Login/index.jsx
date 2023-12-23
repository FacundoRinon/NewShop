import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { getAllUsers, getUsersCarts } from '../../api/users';
import { ROUTES } from '../../data/constants';
import { setUser } from '../../redux/userSlice';
import { setCarts } from '../../redux/cartsSlice';
import ErrorPage from 'Containers/ErrorPage';

import './index.scss';

const Login = () => {
  const user = useSelector((state) => state.user);

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [users, setUsers] = useState([]);
  const [credentials, setCredentials] = useState(false);

  const [error, setError] = useState(false);
  const [message, setMessage] = useState('wrong');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function getUsers() {
    try {
      const response = await getAllUsers();
      console.log('response.data: ', response.data);
      setUsers(response.data);
    } catch (error) {
      setMessage('wrong');
      setError(true);
    }
  }

  async function getCarts() {
    try {
      const response = await getUsersCarts();
      dispatch(setCarts(response.data));
    } catch (error) {
      setMessage('wrong');
      setError(true);
    }
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const filteredUsers = users.filter(
        (person) =>
          person.email === emailValue ||
          person.username === emailValue,
      );
      if (filteredUsers.length === 0) {
        setCredentials('No user');
        setEmailValue('');
        setPasswordValue('');
      } else {
        const user = filteredUsers[0];
        if (user.password !== passwordValue) {
          setCredentials('Wrong password');
          setPasswordValue('');
        } else {
          dispatch(setUser({ user: user }));
          navigate('/');
        }
      }
    } catch (error) {
      setMessage('wrong');
      setError(true);
    }
  }

  async function handleRandom(event) {
    try {
      const filteredUser = users.filter(
        (person) => person.username === 'donero',
      );
      const user = filteredUser[0];
      console.log(user);
      dispatch(setUser({ user: user }));
      navigate('/');
    } catch (error) {
      setMessage('wrong');
      setError(true);
    }
  }

  useEffect(() => {
    getUsers();
    getCarts();
  }, []);

  if (error) {
    return (
      <>
        <ErrorPage message={message} />
      </>
    );
  }

  if (user) {
    return <Navigate to={ROUTES.home} replace />;
  } else {
    return (
      <>
        <div className="login">
          <form
            className="login__form"
            action=""
            onSubmit={handleSubmit}>
            <h1 className="login__header">Login</h1>
            <input
              className={cn('login__input', {
                'login__input--error': credentials === 'No user',
              })}
              type="text"
              placeholder={
                credentials === 'No user'
                  ? 'Wrong user'
                  : 'Username or example@mail.com'
              }
              value={emailValue}
              onChange={(event) => setEmailValue(event.target.value)}
            />
            <input
              className={cn('login__input', {
                'login__input--error':
                  credentials === 'Wrong password',
              })}
              type="password"
              placeholder={
                credentials === 'Wrong password'
                  ? 'Wrong password'
                  : 'password'
              }
              value={passwordValue}
              onChange={(event) =>
                setPasswordValue(event.target.value)
              }
            />
            <button className="login__button">Login</button>
          </form>
        </div>
        <div className="login__buttonsRow">
          <button
            onClick={() => navigate('/')}
            className="login__invitedButton">
            Enter without user
          </button>
          <button
            onClick={() => handleRandom()}
            className="login__random">
            Enter with random user
          </button>
        </div>
      </>
    );
  }
};

export default Login;

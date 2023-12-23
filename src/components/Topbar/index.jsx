import React, { useState } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartPlus,
  faUser,
  faArrowRightFromBracket,
  faGift,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

import { removeUser } from '../../redux/userSlice';

import './index.scss';

const Topbar = () => {
  const user = useSelector((state) => state.user);

  const [drop, setDrop] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(removeUser());
    navigate('/login');
  };

  const toggleDrop = () => {
    if (drop === false) {
      setDrop(true);
    } else {
      setDrop(false);
    }
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar__header">
          <img
            className="topbar__img"
            src="https://cdn-icons-png.flaticon.com/512/1032/1032851.png"
            alt=""
          />
          <Link
            className="link--white"
            onClick={() => setDrop(false)}
            to="/">
            <h1 className="topbar__title">NewStore</h1>
          </Link>
        </div>
        <div className="topbar__actions">
          {user ? (
            <p onClick={() => toggleDrop()} className="topbar__user">
              {user.username}
              <FontAwesomeIcon
                className="drop__icon"
                icon={faChevronDown}
              />
            </p>
          ) : (
            <p className="topbar__login">
              <Link className="link--primary" to={'/login'}>
                Log In
              </Link>
            </p>
          )}
        </div>
      </div>
      {user && (
        <div className={cn('drop', { 'drop--open': drop })}>
          <div className="drop__actions">
            <p className="drop__action">
              <Link
                className="link--primary"
                onClick={() => toggleDrop()}
                to={`profile/${user.id}`}>
                Profile
                <FontAwesomeIcon
                  className="drop__icon"
                  icon={faUser}
                />
              </Link>
            </p>
            <p className="drop__action">
              <Link
                className="link--primary"
                onClick={() => toggleDrop()}
                to={`cart/${user.id}`}>
                Cart
                <FontAwesomeIcon
                  className="drop__icon"
                  icon={faCartPlus}
                />
              </Link>
            </p>
            <p className="drop__action">
              <Link
                className="link--primary"
                onClick={() => toggleDrop()}
                to={`gift`}>
                Gifts
                <FontAwesomeIcon
                  className="drop__icon"
                  icon={faGift}
                />
              </Link>
            </p>
            <p
              className="drop__action"
              onClick={() => handleLogOut()}>
              Log out
              <FontAwesomeIcon
                className="drop__icon"
                icon={faArrowRightFromBracket}
              />
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.scss';

const UserRow = ({ user }) => {
  return (
    <div className="userRow">
      <Link
        className="link--primary userRow__user"
        to={`/profile/${user.id}`}>
        <img
          className="userRow__img"
          src={`https://robohash.org/${user.username}`}
          alt=""
        />
        <h3>
          {user.name.firstname} {user.name.lastname}
        </h3>
      </Link>
      <Link
        className="link--primary userRow__button"
        to={`/cart/${user.id}`}>
        View Cart
      </Link>
    </div>
  );
};

UserRow.propTypes = {
  user: PropTypes.object,
};

export default UserRow;

import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './index.scss';

const BackRow = ({ page }) => {
  const navigate = useNavigate();

  return (
    <div className="backRow">
      <FontAwesomeIcon
        onClick={() => navigate(-1)}
        className="backRow__icon"
        icon={faArrowLeft}
      />
      <h2>{page}</h2>
    </div>
  );
};

BackRow.propTypes = {
  page: PropTypes.string,
};

export default BackRow;

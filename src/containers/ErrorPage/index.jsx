import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const ErrorPage = ({ message }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (message === 'noProduct') {
      setText('This product doesn´t exist');
    } else if (message === 'noUser') {
      setText('This user doesn´t exist');
    } else if (message === 'noCart') {
      setText(
        'This user does not exist so there are no carts available',
      );
    } else if (message === 'wrong') {
      setText('Something went wrong');
    } else {
      setText('The route doesn´t exist');
    }
  }, []);

  return (
    <div className="errorPage">
      <div className="errorPage__container">
        <div className="errorPage__img">
          <img
            src="https://media.licdn.com/dms/image/D4D0BAQG8fQlyC7YOxA/company-logo_200_200/0/1688400672391/neocoast_logo?e=2147483647&v=beta&t=4I_aV2DApODpx1mHAWrbgpeD81eW799vkCfy9UTtWDM"
            alt=""
          />
        </div>
        <h1>{text}</h1>
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  message: PropTypes.string,
};

export default ErrorPage;

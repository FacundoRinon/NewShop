import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import BackRow from 'Components/BackRow';
import { editUser } from '../../redux/userSlice';

import './index.scss';

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const [firstnameValue, setFirstnameValue] = useState(
    user.name.firstname,
  );
  const [lastnameValue, setLastnameValue] = useState(
    user.name.lastname,
  );
  const [usernameValue, setUsernameValue] = useState(user.username);
  const [cityValue, setCityValue] = useState(user.address.city);
  const [zipValue, setZipValue] = useState(user.address.zipcode);
  const [phoneValue, setPhoneValue] = useState(user.phone);
  const [streetValue, setStreetValue] = useState(user.address.street);
  const [numberValue, setNumberValue] = useState(user.address.number);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newUser = {
    firstname: firstnameValue,
    lastname: lastnameValue,
    username: usernameValue,
    city: cityValue,
    zipcode: zipValue,
    phone: phoneValue,
    street: streetValue,
    number: numberValue,
  };

  async function editProfile(event) {
    event.preventDefault();
    dispatch(editUser({ newUser }));
    navigate(`/profile/${user.id}`);
  }

  return (
    <>
      <BackRow page={`Edit Profile`} />
      <div className="editProfile">
        <div className="editProfile__container">
          <div className="editProfile__img">
            <img
              src={`https://robohash.org/${user.username}`}
              alt=""
            />
          </div>
          <div className="editProfile__header">
            <h2>
              {firstnameValue} {lastnameValue}
            </h2>
          </div>
          <form
            onSubmit={editProfile}
            action=""
            className="editProfile__form">
            <label className="editProfile__label">Firstname:</label>
            <input
              name="firstname"
              value={firstnameValue}
              className="editProfile__input"
              onChange={(event) =>
                setFirstnameValue(event.target.value)
              }
            />
            <label className="editProfile__label">Lastname:</label>
            <input
              name="lastname"
              value={lastnameValue}
              className="editProfile__input"
              onChange={(event) =>
                setLastnameValue(event.target.value)
              }
            />
            <label className="editProfile__label">Username:</label>
            <input
              name="username"
              value={usernameValue}
              className="editProfile__input"
              onChange={(event) =>
                setUsernameValue(event.target.value)
              }
            />
            <label className="editProfile__label">City:</label>
            <input
              name="city"
              value={cityValue}
              className="editProfile__input"
              onChange={(event) => setCityValue(event.target.value)}
            />
            <label className="editProfile__label">Zipcode:</label>
            <input
              name="zip"
              value={zipValue}
              className="editProfile__input"
              onChange={(event) => setZipValue(event.target.value)}
            />
            <label className="editProfile__label">Phone:</label>
            <input
              name="phone"
              value={phoneValue}
              className="editProfile__input"
              onChange={(event) => setPhoneValue(event.target.value)}
            />
            <label className="editProfile__label">Street:</label>
            <input
              name="street"
              value={streetValue}
              className="editProfile__input"
              onChange={(event) => setStreetValue(event.target.value)}
            />
            <label className="editProfile__label">Number:</label>
            <input
              name="number"
              value={numberValue}
              className="editProfile__input"
              onChange={(event) => setNumberValue(event.target.value)}
            />
            <div className="editProfile__button">
              <button>Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;

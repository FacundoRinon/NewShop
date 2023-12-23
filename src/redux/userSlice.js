import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const { user } = action.payload;
      const updatedUser = {
        ...user,
        activeCart: 0,
      };
      return updatedUser;
    },
    removeUser(state, action) {
      return null;
    },
    setActiveCart(state, action) {
      const { cartPage } = action.payload;
      const updatedUser = {
        ...state,
        activeCart: cartPage,
      };
      return updatedUser;
    },
    editUser(state, action) {
      const {
        firstname,
        lastname,
        username,
        city,
        zipcode,
        phone,
        street,
        number,
      } = action.payload.newUser;
      const newName = {
        firstname,
        lastname,
      };
      const newAddress = {
        city: city,
        street: street,
        number: number,
        zipcode: zipcode,
      };
      const newProfile = {
        ...state,
        name: newName,
        address: newAddress,
        username,
        phone,
      };
      return newProfile;
    },
  },
});

const { actions, reducer } = userSlice;
export const { setUser, removeUser, setActiveCart, editUser } =
  actions;
export default reducer;

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registerRequest: ['fullName', 'email', 'password', 'confirmPassword'],
  registerSuccess: ['data'],
  registerFailure: ['data'],

  loginRequest: ['email', 'password'],
  loginSuccess: ['data'],
  loginFailure: ['data']
})

export const RegisterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  fullName: null,
  email: null,
  data: {
    data: null,
    error: {
      code: null,
      message: null
    }
  }
})

/* ------------- Selectors ------------- */

export const registerSelectors = {
  selectRegisteredUser: state => state.register.data.data,
  selectRegistrationError: state => state.register.data.error,
  registrationIsBusy: state => state.register.fetching
}

/* ------------- Reducers ------------- */

export const request = (
  state,
  { fullName, email, password, confirmPassword }
) =>
  state.merge({
    fetching: true,
    fullName,
    email,
    data: {
      data: null,
      error: {
        code: null,
        message: null
      }
    }
  })

export const success = (state, action) => {
  const { data } = action.data
  return state.merge({
    fetching: false,
    error: null,
    data
  })
}

// failed to get the avatar
export const failure = (state, action) => {
  const { data } = action.data
  return state.merge({
    fetching: false,
    error: true,
    data
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_REQUEST]: request,
  [Types.REGISTER_SUCCESS]: success,
  [Types.REGISTER_FAILURE]: failure
})

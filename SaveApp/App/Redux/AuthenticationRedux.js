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

export const AuthenticationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
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

export const authenticationSelectors = {
  selectAuthenticatedUser: state => state.authentication.data.data,
  selectAuthenticationError: state => state.authentication.data.error,
  authenticationIsBusy: state => state.authentication.fetching
}

/* ------------- Reducers ------------- */

export const registrationRequest = (
  state,
  { fullName, email, password, confirmPassword }
) =>
  state.merge({
    fetching: true,
    email,
    data: {
      data: null,
      error: {
        code: null,
        message: null
      }
    }
  })

export const registrationSuccess = (state, action) => {
  const { data } = action.data
  return state.merge({
    fetching: false,
    error: null,
    data
  })
}

export const registrationFailure = (state, action) => {
  const { data } = action.data
  return state.merge({
    fetching: false,
    error: true,
    data
  })
}

export const loginRequest = (state, { email, password }) =>
  state.merge({
    fetching: true,
    email,
    data: {
      data: null,
      error: {
        code: null,
        message: null
      }
    }
  })

export const loginSuccess = (state, action) => {
  const { data } = action.data
  return state.merge({
    fetching: false,
    error: null,
    data
  })
}

export const loginFailure = (state, action) => {
  const { data } = action.data
  return state.merge({
    fetching: false,
    error: true,
    data
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_REQUEST]: registrationRequest,
  [Types.REGISTER_SUCCESS]: registrationSuccess,
  [Types.REGISTER_FAILURE]: registrationFailure,

  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure
})
